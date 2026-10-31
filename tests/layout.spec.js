const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

// Tekstplassering (31.10.2026): ett felles rutenett og én rytme.
test.describe('Tekstplassering', () => {
  test('two-column sections share one right-column start on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(indexUrl);
    const starts = await page.evaluate(() => [
      '.hero-portrait',
      '#arbeidsbenken .services',
      '#kurs-og-foredrag .talks-copy',
      '#om .about-body',
      '#erfaring .press-quote',
    ].map((selector) => Math.round(document.querySelector(selector).getBoundingClientRect().left)));
    expect(new Set(starts).size, `høyrekolonner starter ved ${starts.join(', ')}`).toBe(1);
  });

  test('eyebrow to heading spacing is the same in every section', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(indexUrl);
    const gaps = await page.evaluate(() => [...document.querySelectorAll('.hero, main > section')].map((section) => {
      const eyebrow = section.querySelector('.eyebrow');
      const heading = section.querySelector('h1, h2');
      return Math.round(heading.getBoundingClientRect().top - eyebrow.getBoundingClientRect().bottom);
    }));
    for (const gap of gaps) expect(Math.abs(gap - 28), `avstander ${gaps.join(', ')}`).toBeLessThanOrEqual(1);
  });

  test('the workbench intro reads at about 45 characters per line', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(indexUrl);
    const width = await page.locator('.work-intro .section-intro').evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBeGreaterThanOrEqual(400);
  });

  test('press list keeps outlet and date together, left of the title', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(indexUrl);
    const item = await page.locator('.press-list li').first().evaluate((li) => {
      const outlet = li.querySelector('.press-outlet').getBoundingClientRect();
      const meta = li.querySelector('.press-meta').getBoundingClientRect();
      const title = li.querySelector('a').getBoundingClientRect();
      return { metaLeft: Math.round(meta.left), outletLeft: Math.round(outlet.left), metaBelow: meta.top >= outlet.bottom - 1, metaRight: meta.right, titleLeft: title.left };
    });
    expect(item.metaLeft).toBe(item.outletLeft);
    expect(item.metaBelow).toBe(true);
    expect(item.metaRight).toBeLessThanOrEqual(item.titleLeft);
  });

  test('the contact heading gets more than 9 characters per line on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(indexUrl);
    const size = await page.locator('#kontakt h2').evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
    expect(size).toBeLessThanOrEqual(43);
  });
});
