const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('Check all links in index.html', async ({ page, context }) => {
  // Set a realistic User-Agent to help bypass some bot detection mechanisms
  await context.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept-Language': 'nb-NO,nb;q=0.9,no;q=0.8,nn;q=0.7,en-US;q=0.6,en;q=0.5'
  });

  const indexPath = path.resolve(__dirname, '../index.html');
  const indexUrl = `file://${indexPath}`;
  
  console.log(`Opening page: ${indexUrl}`);
  await page.goto(indexUrl);

  // Extract all elements with a href attribute
  const links = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('[href]'));
    return elements.map(el => ({
      href: el.getAttribute('href'),
      text: el.innerText || el.textContent || '',
      tagName: el.tagName,
      outerHTML: el.outerHTML
    }));
  });

  console.log(`Found ${links.length} total links to check.\n`);

  const report = {
    total: links.length,
    valid: [],
    broken: [],
    warnings: []
  };

  const checkedLinks = new Map();

  for (const link of links) {
    const href = link.href ? link.href.trim() : '';
    if (!href) {
      report.broken.push({ href, text: link.text, tagName: link.tagName, reason: 'Empty href attribute' });
      continue;
    }

    // 1. Internal anchor links
    if (href.startsWith('#')) {
      if (href === '#' || href === '#top') {
        report.valid.push({ href, type: 'anchor', reason: 'Placeholder or page top anchor' });
        continue;
      }
      const id = href.slice(1);
      // Verify element with ID exists
      const exists = await page.evaluate((elementId) => {
        return !!document.getElementById(elementId);
      }, id);

      if (exists) {
        report.valid.push({ href, type: 'anchor', targetId: id });
      } else {
        report.broken.push({ href, type: 'anchor', targetId: id, reason: `Anchor target element id="${id}" does not exist on page` });
      }
    } 
    // 2. Mailto links
    else if (href.startsWith('mailto:')) {
      const emailPart = href.split('?')[0].replace('mailto:', '');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailPart)) {
        report.valid.push({ href, type: 'mailto', email: emailPart });
      } else {
        report.broken.push({ href, type: 'mailto', email: emailPart, reason: 'Invalid email address format' });
      }
    } 
    // 3. Tel links
    else if (href.startsWith('tel:')) {
      const telPart = href.replace('tel:', '');
      // Allow +, numbers, spaces, hyphens and parentheses
      const telRegex = /^\+?[0-9\s\-()]+$/;
      if (telRegex.test(telPart)) {
        report.valid.push({ href, type: 'tel', number: telPart });
      } else {
        report.broken.push({ href, type: 'tel', number: telPart, reason: 'Invalid telephone number format' });
      }
    } 
    // 4. HTTP/HTTPS links
    else if (href.startsWith('http://') || href.startsWith('https://')) {
      if (checkedLinks.has(href)) {
        const cached = checkedLinks.get(href);
        if (cached.status === 'valid') {
          report.valid.push({ href, type: 'http', cached: true });
        } else if (cached.status === 'warning') {
          report.warnings.push({ href, type: 'http', cached: true, reason: cached.reason });
        } else {
          report.broken.push({ href, type: 'http', cached: true, reason: cached.reason });
        }
        continue;
      }

      console.log(`Checking external URL: ${href}`);
      const isCrawlerBlockedDomain = href.includes('linkedin.com') || href.includes('nrk.no') || href.includes('tv.nrk.no') || href.includes('radio.nrk.no');

      try {
        let response = null;
        let lastError = null;

        // Try HEAD request first
        try {
          response = await context.request.head(href, {
            timeout: 8000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
            }
          });
        } catch (e) {
          lastError = e;
        }

        // If HEAD failed or returned a method not allowed/forbidden/LinkedIn 999, try GET
        if (!response || response.status() === 405 || response.status() === 403 || response.status() === 999 || response.status() === 400) {
          try {
            response = await context.request.get(href, {
              timeout: 10000,
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
              }
            });
          } catch (e) {
            lastError = e;
          }
        }

        if (response) {
          const status = response.status();
          if (status >= 200 && status < 400) {
            report.valid.push({ href, type: 'http', status });
            checkedLinks.set(href, { status: 'valid' });
          } else if (isCrawlerBlockedDomain) {
            const warnReason = `Returned status ${status}. Common crawler block/verification issue on this domain.`;
            report.warnings.push({ href, type: 'http', status, reason: warnReason });
            checkedLinks.set(href, { status: 'warning', reason: warnReason });
          } else {
            const errorReason = `Status code: ${status}`;
            report.broken.push({ href, type: 'http', status, reason: errorReason });
            checkedLinks.set(href, { status: 'broken', reason: errorReason });
          }
        } else {
          // Request threw an error and couldn't fetch response
          const msg = lastError ? lastError.message : 'Unknown network error';
          if (isCrawlerBlockedDomain) {
            const warnReason = `Request failed: ${msg} (Domain is known for blocking headless bots)`;
            report.warnings.push({ href, type: 'http', reason: warnReason });
            checkedLinks.set(href, { status: 'warning', reason: warnReason });
          } else {
            const errorReason = `Request failed: ${msg}`;
            report.broken.push({ href, type: 'http', reason: errorReason });
            checkedLinks.set(href, { status: 'broken', reason: errorReason });
          }
        }
      } catch (err) {
        const errorReason = `Unexpected error: ${err.message}`;
        if (isCrawlerBlockedDomain) {
          report.warnings.push({ href, type: 'http', reason: errorReason });
          checkedLinks.set(href, { status: 'warning', reason: errorReason });
        } else {
          report.broken.push({ href, type: 'http', reason: errorReason });
          checkedLinks.set(href, { status: 'broken', reason: errorReason });
        }
      }
    } 
    // 5. Local file paths
    else {
      // Clean up query or hash from local paths (e.g. "style.css?v=2")
      const cleanHref = href.split(/[?#]/)[0];
      const localFilePath = path.resolve(path.dirname(indexPath), cleanHref);
      if (fs.existsSync(localFilePath)) {
        report.valid.push({ href, type: 'local', path: localFilePath });
      } else {
        report.broken.push({ href, type: 'local', path: localFilePath, reason: `Local file not found at ${localFilePath}` });
      }
    }
  }

  // Save the report in JSON format for programmatic usage or manual review
  const reportPath = path.resolve(__dirname, '../link-checker-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`Saved detailed JSON report to: ${reportPath}`);

  // Print results summary to console
  console.log('\n========================================');
  console.log('       LINK CHECKER REPORT SUMMARY      ');
  console.log('========================================');
  console.log(`Total Links Verified: ${report.total}`);
  console.log(`  - Valid:            ${report.valid.length}`);
  console.log(`  - Warnings:         ${report.warnings.length}`);
  console.log(`  - Broken (Dead):    ${report.broken.length}`);
  console.log('========================================\n');

  if (report.broken.length > 0) {
    console.log('❌ BROKEN LINKS FOUND:');
    report.broken.forEach((item, index) => {
      console.log(`  ${index + 1}. [${item.type}] Href: ${item.href}`);
      console.log(`     Reason: ${item.reason}`);
      if (item.text) console.log(`     Link Text: "${item.text.trim()}"`);
    });
    console.log('');
  }

  if (report.warnings.length > 0) {
    console.log('⚠️ WARNINGS / POTENTIAL CRAWLER BLOCKS:');
    report.warnings.forEach((item, index) => {
      console.log(`  ${index + 1}. [${item.type}] Href: ${item.href}`);
      console.log(`     Status/Reason: ${item.reason}`);
    });
    console.log('');
  }

  // Soft-assert that there are zero broken links.
  expect.soft(report.broken.length).toBe(0);
});
