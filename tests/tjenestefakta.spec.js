const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

// Spørreskjema 17.11.2026 (docs/to-questionnaire-tjenestefakta.md): Lars' egne svar om format,
// varighet, svartid, pris og foretak. Ingen tall for pris, ingen kundecase, ingen arbeidsgiver.
test.describe('Tjenestefakta fra Lars', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(indexUrl);
  });

  test('each service states format and duration', async ({ page }) => {
    const meta = page.locator('#arbeidsbenken .services .service-meta');
    await expect(meta).toHaveCount(3);
    await expect(meta.nth(0)).toContainText('2–3 møter');
    await expect(meta.nth(1)).toContainText('1–2 uker');
    await expect(meta.nth(1)).toContainText('testversjon');
    await expect(meta.nth(2)).toContainText('Løpende');
  });

  test('talks state their length', async ({ page }) => {
    await expect(page.locator('#kurs-og-foredrag .talk-format')).toContainText('30–60 minutter');
  });

  test('contact states response time, a free first conversation and how price is set', async ({ page }) => {
    const terms = page.locator('#kontakt .contact-terms');
    await expect(terms).toBeVisible();
    await expect(terms).toContainText('to arbeidsdager');
    await expect(terms).toContainText('uforpliktende');
    await expect(terms).toContainText('Pris avtales');
    const text = await page.locator('main').textContent();
    expect(text).not.toMatch(/\d\s?kr\b|kroner/i);
  });

  test('footer names the sole proprietorship and its organisation number', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toContainText('Enkeltpersonforetak');
    await expect(footer).toContainText('936 978 010');
  });

  // Kunder nevnes ikke uten godkjenning. Håndverk holdes ute (DESIGN.md: ikke ren håndverkskonsulent).
  test('names no clients', async ({ page }) => {
    await expect(page.locator('body')).not.toContainText('Lister Nyskaping');
  });

  test('prints the new contact terms in black', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.contact-terms')).toHaveCSS('color', 'rgb(0, 0, 0)');
  });
});
