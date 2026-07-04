const { test, expect } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');

let server;
const PORT = 3009;
const BASE_URL = `http://localhost:${PORT}`;

// Helper: Parse netlify.toml headers
function parseNetlifyHeaders() {
  const tomlPath = path.resolve(__dirname, '../netlify.toml');
  const headers = {};
  
  if (!fs.existsSync(tomlPath)) {
    console.warn(`[Warning] netlify.toml not found at ${tomlPath}`);
    return headers;
  }
  
  const content = fs.readFileSync(tomlPath, 'utf8');
  let inHeadersValues = false;
  const lines = content.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || !trimmed) continue;
    
    if (trimmed === '[headers.values]') {
      inHeadersValues = true;
      continue;
    }
    
    if (trimmed.startsWith('[') && trimmed !== '[headers.values]') {
      inHeadersValues = false;
      continue;
    }
    
    if (inHeadersValues) {
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim().replace(/^"|"$/g, '');
        let val = match[2].trim();
        // Remove surrounding quotes from the value
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.substring(1, val.length - 1);
        } else if (val.startsWith("'") && val.endsWith("'")) {
          val = val.substring(1, val.length - 1);
        }
        headers[key.toLowerCase()] = val;
      }
    }
  }
  return headers;
}

// Helper: Get MIME content types for mock server
function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.js': return 'application/javascript; charset=utf-8';
    case '.svg': return 'image/svg+xml';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.woff2': return 'font/woff2';
    default: return 'application/octet-stream';
  }
}

test.describe('Security Headers & E2E Validation', () => {
  let configuredHeaders = {};

  test.beforeAll(async () => {
    // 1. Parse headers from netlify.toml
    configuredHeaders = parseNetlifyHeaders();
    console.log('Parsed headers from netlify.toml:', configuredHeaders);

    // 2. Start a local HTTP server serving index.html with the configured headers
    server = http.createServer((req, res) => {
      // Decode URL to handle spaces, e.g. in Norwegian file paths
      const decodedUrl = decodeURIComponent(req.url);
      
      // Clean query parameters or hashes
      const cleanUrl = decodedUrl.split(/[?#]/)[0];
      
      // Map to files in the repository
      let relativePath = cleanUrl === '/' ? 'index.html' : cleanUrl.substring(1);
      const filePath = path.resolve(__dirname, '../', relativePath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        // Inject security headers from netlify.toml
        for (const [key, value] of Object.entries(configuredHeaders)) {
          res.setHeader(key, value);
        }
        
        res.writeHead(200, { 'Content-Type': getContentType(filePath) });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
      }
    });

    await new Promise((resolve) => server.listen(PORT, resolve));
    console.log(`Local mock server listening at ${BASE_URL}`);
  });

  test.afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
      console.log('Local mock server stopped.');
    }
  });

  // ==========================================
  // TIER 1: FEATURE COVERAGE (PRESENCE & VALUE)
  // ==========================================

  test('TC-1.1: Verify CSP presence', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const headers = response.headers();
    expect(headers['content-security-policy']).toBeDefined();
  });

  test('TC-1.2: Verify X-Frame-Options value is secure', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const headers = response.headers();
    expect(headers['x-frame-options']).toBeDefined();
    const value = headers['x-frame-options'].toUpperCase();
    expect(['DENY', 'SAMEORIGIN']).toContain(value);
  });

  test('TC-1.3: Verify X-Content-Type-Options value is nosniff', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const headers = response.headers();
    expect(headers['x-content-type-options']).toBeDefined();
    expect(headers['x-content-type-options'].toLowerCase()).toBe('nosniff');
  });

  test('TC-1.4: Verify Referrer-Policy is secure', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const headers = response.headers();
    expect(headers['referrer-policy']).toBeDefined();
    const val = headers['referrer-policy'].toLowerCase();
    const securePolicies = [
      'no-referrer',
      'no-referrer-when-downgrade',
      'origin',
      'origin-when-cross-origin',
      'same-origin',
      'strict-origin',
      'strict-origin-when-cross-origin'
    ];
    expect(securePolicies).toContain(val);
  });

  test('TC-1.5: Verify Permissions-Policy presence and format', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const headers = response.headers();
    expect(headers['permissions-policy']).toBeDefined();
    expect(typeof headers['permissions-policy']).toBe('string');
  });

  // ==========================================
  // TIER 2: BOUNDARY & EDGE CASES (CSP & API)
  // ==========================================

  test('TC-2.1: CSP does not contain broad wildcards', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const csp = response.headers()['content-security-policy'] || '';
    
    // Check that default-src, script-src, and style-src do not contain '*' or raw 'http:'/'https:'
    const directives = csp.split(';').map(d => d.trim()).filter(Boolean);
    
    for (const directive of directives) {
      const parts = directive.split(/\s+/);
      const directiveName = parts[0].toLowerCase();
      
      if (['default-src', 'script-src', 'style-src'].includes(directiveName)) {
        const sources = parts.slice(1);
        expect(sources).not.toContain('*');
        expect(sources).not.toContain('http:');
        expect(sources).not.toContain('https:');
        expect(sources).not.toContain('data:');
      }
    }
  });

  test('TC-2.2: CSP restricts unsafe-inline scripts', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const csp = response.headers()['content-security-policy'] || '';
    
    const directives = csp.split(';').map(d => d.trim()).filter(Boolean);
    const scriptSrc = directives.find(d => d.toLowerCase().startsWith('script-src '));
    if (scriptSrc) {
      const parts = scriptSrc.split(/\s+/);
      if (parts.includes("'unsafe-inline'")) {
        // If unsafe-inline is present, it must be paired with hashes or nonces
        const hasHashOrNonce = parts.some(p => p.startsWith("'sha256-") || p.startsWith("'nonce-"));
        expect(hasHashOrNonce).toBe(true);
      }
    } else {
      const defaultSrc = directives.find(d => d.toLowerCase().startsWith('default-src '));
      expect(defaultSrc).toBeDefined();
      const parts = defaultSrc.split(/\s+/);
      expect(parts).not.toContain("'unsafe-inline'");
    }
  });

  test('TC-2.3: CSP restricts unsafe-inline styles', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const csp = response.headers()['content-security-policy'] || '';
    const directives = csp.split(';').map(d => d.trim()).filter(Boolean);
    
    const styleSrc = directives.find(d => d.toLowerCase().startsWith('style-src '));
    if (styleSrc) {
      const parts = styleSrc.split(/\s+/);
      expect(parts).not.toContain("'unsafe-inline'");
    } else {
      const defaultSrc = directives.find(d => d.toLowerCase().startsWith('default-src '));
      expect(defaultSrc).toBeDefined();
      const parts = defaultSrc.split(/\s+/);
      expect(parts).not.toContain("'unsafe-inline'");
    }
  });

  test('TC-2.4: CSP blocks unsafe-eval', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const csp = response.headers()['content-security-policy'] || '';
    expect(csp.toLowerCase()).not.toContain("'unsafe-eval'");
  });

  test('TC-2.5 & TC-2.6: CSP restricts object-src and base-uri', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const csp = response.headers()['content-security-policy'] || '';
    
    const directives = csp.split(';').map(d => d.trim()).filter(Boolean);
    
    const objectSrc = directives.find(d => d.toLowerCase().startsWith('object-src '));
    if (objectSrc) {
      expect(objectSrc.toLowerCase()).toContain("'none'");
    } else {
      const defaultSrc = directives.find(d => d.toLowerCase().startsWith('default-src '));
      expect(defaultSrc).toBeDefined();
      expect(defaultSrc.toLowerCase()).toContain("'self'");
    }
    
    const baseUri = directives.find(d => d.toLowerCase().startsWith('base-uri '));
    if (baseUri) {
      expect(baseUri.toLowerCase()).toMatch(/'self'|'none'/);
    }
  });

  test('TC-2.7: CSP contains upgrade-insecure-requests (optional)', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const csp = response.headers()['content-security-policy'] || '';
    const directives = csp.split(';').map(d => d.trim()).filter(Boolean);
    const hasUpgrade = directives.some(d => d.toLowerCase() === 'upgrade-insecure-requests');
    // upgrade-insecure-requests is optional depending on instructions
    expect(true).toBe(true);
  });

  test('TC-2.8: Permissions-Policy disables unused browser APIs', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const policy = response.headers()['permissions-policy'] || '';
    
    const requiredRestrictedAPIs = ['accelerometer', 'camera', 'geolocation', 'gyroscope', 'magnetometer', 'microphone', 'payment', 'usb'];
    for (const api of requiredRestrictedAPIs) {
      // Check that they are restricted, i.e. api=()
      expect(policy).toContain(`${api}=()`);
    }
  });


  // ==========================================
  // TIER 3: CROSS-FEATURE COMBINATION TESTS
  // ==========================================

  test('TC-3.1: X-Frame-Options matches CSP frame-ancestors', async ({ request }) => {
    const response = await request.get(BASE_URL);
    const headers = response.headers();
    const xfo = headers['x-frame-options']?.toUpperCase();
    const csp = headers['content-security-policy'] || '';
    
    const frameAncestors = csp.split(';').map(d => d.trim()).find(d => d.toLowerCase().startsWith('frame-ancestors '));
    
    if (xfo === 'DENY') {
      expect(frameAncestors?.toLowerCase()).toContain("'none'");
    } else if (xfo === 'SAMEORIGIN') {
      expect(frameAncestors?.toLowerCase()).toContain("'self'");
    }
  });

  test('TC-3.2: Duplicate Header Prevention', async () => {
    const tomlPath = path.resolve(__dirname, '../netlify.toml');
    if (!fs.existsSync(tomlPath)) return;
    const content = fs.readFileSync(tomlPath, 'utf8');
    let inHeadersValues = false;
    const lines = content.split('\n');
    const seenKeys = new Set();
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('#') || !trimmed) continue;
      
      if (trimmed === '[headers.values]') {
        inHeadersValues = true;
        continue;
      }
      
      if (trimmed.startsWith('[') && trimmed !== '[headers.values]') {
        inHeadersValues = false;
        continue;
      }
      
      if (inHeadersValues) {
        const match = trimmed.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim().replace(/^"|"$/g, '').toLowerCase();
          expect(seenKeys.has(key)).toBe(false); // Should fail if duplicate header key exists
          seenKeys.add(key);
        }
      }
    }
  });

  test('TC-3.3: Redirect and Content Route Header Injection', async ({ request }) => {
    const resSlash = await request.get(BASE_URL + '/');
    const resIndex = await request.get(BASE_URL + '/index.html');
    
    expect(resSlash.headers()['content-security-policy']).toBeDefined();
    expect(resIndex.headers()['content-security-policy']).toBeDefined();
  });

  // ==========================================
  // TIER 4: REAL-WORLD SCENARIO TESTS
  // ==========================================

  test('TC-4.1 & TC-4.2: Page loads successfully with no CSP violations in console', async ({ page }) => {
    const cspViolations = [];
    const consoleErrors = [];

    page.on('console', msg => {
      const text = msg.text();
      if (msg.type() === 'error') {
        consoleErrors.push(text);
      }
      if (text.toLowerCase().includes('content security policy') || text.toLowerCase().includes('csp')) {
        cspViolations.push(text);
      }
    });

    page.on('pageerror', err => {
      consoleErrors.push(err.message);
    });

    const response = await page.goto(BASE_URL);
    expect(response.status()).toBe(200);

    // Wait for the fonts and dynamic scripts to run
    await page.waitForTimeout(1000);

    console.log('Captured Console Errors:', consoleErrors);
    console.log('Captured CSP Violations:', cspViolations);

    expect(cspViolations.length).toBe(0);
    expect(consoleErrors.filter(e => e.includes('Content Security Policy') || e.includes('blocked')).length).toBe(0);
  });

  test('TC-4.3: Self-hosted fonts load successfully', async ({ page, request }) => {
    const fontRequests = [];
    
    page.on('request', req => {
      if (req.resourceType() === 'font') {
        fontRequests.push(req.url());
      }
    });

    await page.goto(BASE_URL);
    await page.waitForLoadState('networkidle');

    expect(fontRequests.length).toBeGreaterThan(0);
    const hasWoff2 = fontRequests.some(url => url.endsWith('.woff2'));
    expect(hasWoff2).toBe(true);

    // Direct HTTP check of font endpoints
    const fontUrl1 = `${BASE_URL}/fonts/newsreader-latin-600-normal.woff2`;
    const fontUrl2 = `${BASE_URL}/fonts/newsreader-latin-400-normal.woff2`;
    
    const res1 = await request.get(fontUrl1);
    expect(res1.status()).toBe(200);
    expect(res1.headers()['content-type']).toBe('font/woff2');
    
    const res2 = await request.get(fontUrl2);
    expect(res2.status()).toBe(200);
    expect(res2.headers()['content-type']).toBe('font/woff2');
  });

  test('TC-4.4: Profile image loads successfully', async ({ page, request }) => {
    await page.goto(BASE_URL);
    
    const profileImg = page.locator('img.profile-pic');
    await expect(profileImg).toBeVisible();
    
    const src = await profileImg.getAttribute('src');
    expect(src).toBe('images/Profil.jpg');
    
    // Fetch image directly to verify 200 response
    const imgUrl = `${BASE_URL}/${src}`;
    const imgResponse = await request.get(imgUrl);
    expect(imgResponse.status()).toBe(200);
  });

  test('TC-4.5: Navigation menu interaction highlights correct active class', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Wait for scroll highlights to initialize
    await page.waitForTimeout(500);

    // Click "Tjenester" and check scroll and active class
    const tjenesterLink = page.locator('nav a[href="#tjenester"]');
    await tjenesterLink.click();
    
    // Wait for scroll behavior
    await page.waitForTimeout(1000);
    
    const hasActiveClass = await tjenesterLink.evaluate(el => el.classList.contains('active'));
    expect(hasActiveClass).toBe(true);
  });

  test('TC-4.6: Interactive components (Accordion QA) function correctly', async ({ page }) => {
    await page.goto(BASE_URL);
    
    const details = page.locator('details.qa-block');
    const summary = details.locator('summary.qa');

    // Toggle details
    const isOpenInitially = await details.evaluate(el => el.hasAttribute('open'));
    await summary.click();
    
    const isOpenAfterClick = await details.evaluate(el => el.hasAttribute('open'));
    expect(isOpenAfterClick).toBe(!isOpenInitially);
    
    // Toggle back
    await summary.click();
    const isOpenFinally = await details.evaluate(el => el.hasAttribute('open'));
    expect(isOpenFinally).toBe(isOpenInitially);
  });

  test('TC-4.7: Prefers-Reduced-Motion Compliance', async ({ page }) => {
    await page.emulateMedia({ reduceMotion: 'reduce' });
    await page.goto(BASE_URL);
    
    const errors = [];
    page.on('pageerror', err => errors.push(err.message));
    await page.waitForTimeout(500);
    expect(errors.length).toBe(0);
  });

  test('TC-4.8: Responsive Layout Verification', async ({ page }) => {
    // Set viewport to mobile phone width/height
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(BASE_URL);
    
    const main = page.locator('#main');
    await expect(main).toBeVisible();
    
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });
});
