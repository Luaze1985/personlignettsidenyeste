const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

// Designkritikk 31.10.2026: arbeidsflyt, prinsipp og oppfordringer skal stå én gang.
test.describe('Ingen gjentakelse og tydelig kontakt', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(indexUrl);
  });

  test('the principle and the flow are stated once', async ({ page }) => {
    const main = (await page.locator('main').innerText()).replace(/\s+/g, ' ');
    expect(main.match(/KI lager struktur og utkast/g)).toHaveLength(1);
    expect(main).not.toMatch(/Fagpersonen har kontroll|Fagpersonen sjekker kvalitet|KI erstatter ikke faglig dømmekraft/);
    await expect(page.locator('.steps li p:not(.step-number)')).toHaveCount(0);
    await expect(page.locator('.steps h3')).toHaveText(['Avklare', 'Prøve', 'Kontrollere', 'Velge']);
    await expect(page.locator('#arbeidsbenken a[href="#kontakt"]')).toHaveCount(0);
    await expect(page.locator('#om .about-layout p')).toHaveCount(1);
  });

  test('contact explains what to write and the button says what it does', async ({ page }) => {
    const contact = page.locator('#kontakt');
    await expect(contact.locator('.contact-hints li')).toHaveCount(3);
    await expect(page.locator('#reveal-email')).toHaveText('Vis e-postadresse');
    await expect(contact.locator('.eyebrow')).not.toContainText(/oppgave/i);
  });

  test('desktop menu targets are 44 px high and labels are at least 12.8 px', async ({ page }) => {
    for (const box of await page.locator('nav a').evaluateAll((links) => links.map((a) => a.getBoundingClientRect().height))) {
      expect(box).toBeGreaterThanOrEqual(44);
    }
    const sizes = await page.locator('.eyebrow, .step-number, .service-number, .press-outlet').evaluateAll((els) =>
      els.map((el) => parseFloat(getComputedStyle(el).fontSize)));
    for (const size of sizes) expect(size).toBeGreaterThanOrEqual(12.8);
  });
});
