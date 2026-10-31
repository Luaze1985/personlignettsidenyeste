const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

// Figma 4:85: tre nummererte tjenestelinjer og et svart bånd med fire steg.
test.describe('Arbeidsbenken', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(indexUrl);
  });

  test('shows three numbered service lines and four steps on a dark band', async ({ page }) => {
    const section = page.locator('#arbeidsbenken');
    await expect(section.locator('.eyebrow').first()).toHaveText(/01 \/ Dette hjelper jeg med/i);
    await expect(section.locator('h2')).toHaveText('Fra første spørsmål til noe vi kan prøve.');
    await expect(section.locator('.services h3')).toHaveText(['Sparring', 'En liten prototype', 'Agenter i arbeidsflyten']);
    await expect(section.locator('.services .service-number')).toHaveText(['01', '02', '03']);
    await expect(section.locator('.steps h3')).toHaveText(['Avklare', 'Prøve', 'Kontrollere', 'Velge']);
    await expect(section.locator('.steps')).toHaveCSS('background-color', 'rgb(17, 17, 17)');
    await expect(section.locator('.steps h3').first()).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(section.locator('.service-box, .services-overview')).toHaveCount(0);
  });

  test('keeps the fit/no-fit guidance and one contact link without new claims', async ({ page }) => {
    const section = page.locator('#arbeidsbenken');
    await expect(section).toContainText('Passer når');
    await expect(section).toContainText('Passer ikke når');
    await expect(section.locator('a[href="#kontakt"]')).toHaveCount(1);
    await expect(section).not.toContainText('Prinsippet er enkelt');
    const text = await section.textContent();
    expect(text).not.toMatch(/\bkr\b|kroner|prosent|%|garanti/i);
  });
});
