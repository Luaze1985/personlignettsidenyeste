const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

// Tre nummererte tjenestelinjer og svart-hvitt sortering (grønt/gult/rødt); stegbånd og passer-når er kuttet.
test.describe('Arbeidsbenken', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(indexUrl);
  });

  test('shows three numbered service lines and removes steps and fit guidance', async ({ page }) => {
    const section = page.locator('#arbeidsbenken');
    await expect(section.locator('.eyebrow').first()).toHaveText(/01 \/ Dette hjelper jeg med/i);
    await expect(section.locator('h2')).toHaveText('Fra første spørsmål til noe vi kan prøve.');
    await expect(section.locator('.services h3')).toHaveText(['Sparring', 'En liten prototype', 'Agenter i arbeidsflyten']);
    await expect(section.locator('.services .service-number')).toHaveText(['01', '02', '03']);
    await expect(section.locator('.steps, .fit-grid, .service-box, .services-overview')).toHaveCount(0);
  });

  test('keeps the scope honest without price or percentage claims', async ({ page }) => {
    const section = page.locator('#arbeidsbenken');
    await expect(section).not.toContainText('Passer når');
    await expect(section).not.toContainText('Passer ikke når');
    await expect(section).not.toContainText('Prinsippet er enkelt');
    const text = await section.textContent();
    expect(text).not.toMatch(/\bkr\b|kroner|prosent|%|garanti/i);
  });

  test('shows subtle gradient zone sorting (green, yellow, red) and rotates active state except under reduced motion', async ({ page }) => {
    const bento = page.locator('#arbeidsbenken .bento-block');
    await expect(bento.locator('h3')).toHaveText('Sparringspartner, ikke en fasit.');
    await expect(bento.locator('.traffic-zone')).toHaveText(['Grønt', 'Gult', 'Rødt']);
    await expect(bento.locator('.bento-tile')).toHaveCSS('background-color', 'rgb(17, 17, 17)');
    await expect(bento.locator('.bento-tile')).toHaveCSS('background-image', /linear-gradient/);
    await expect(bento.locator('.zone-dot--green')).toHaveCSS('background-color', 'rgb(126, 224, 129)');
    await expect(bento.locator('.zone-dot--yellow')).toHaveCSS('background-color', 'rgb(255, 209, 102)');
    await expect(bento.locator('.zone-dot--red')).toHaveCSS('background-color', 'rgb(255, 107, 107)');

    const rows = bento.locator('.traffic-row');
    await expect(rows.nth(0)).toHaveCSS('background-image', /linear-gradient/);
    await expect(rows.nth(1)).toHaveCSS('background-image', /linear-gradient/);
    await expect(rows.nth(2)).toHaveCSS('background-image', /linear-gradient/);
    await expect(rows.nth(0)).toHaveClass(/is-active/);
    await expect(rows.nth(1)).toHaveClass(/is-active/, { timeout: 5000 });
    await expect(rows.nth(0)).not.toHaveClass(/is-active/);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(indexUrl);
    await page.waitForTimeout(3500);
    await expect(rows.nth(0)).toHaveClass(/is-active/);
    await expect(rows.nth(1)).not.toHaveClass(/is-active/);
  });
});
