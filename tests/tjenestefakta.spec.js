const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

// Spørreskjema 17.11.2026 (docs/to-questionnaire-tjenestefakta.md): Lars' egne svar om format,
// varighet, svartid, pris og foretak. Ingen tall for pris, ingen kundecase, ingen arbeidsgiver.
test.describe('Tjenestefakta fra Lars', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(indexUrl);
  });

  // Lars 17.11: «ikke støyete». Faktaene står i den eksisterende setningen, ikke som egne linjer.
  test('each service states format and duration inside its one sentence', async ({ page }) => {
    const text = page.locator('#arbeidsbenken .services li p');
    await expect(text).toHaveCount(3);
    await expect(text.nth(0)).toContainText('2–3 møter');
    await expect(text.nth(1)).toContainText('1–2 uker');
    await expect(text.nth(1)).toContainText('testversjon');
    await expect(text.nth(2)).toContainText('Løpende');
  });

  test('talks state their length', async ({ page }) => {
    await expect(page.locator('#kurs-og-foredrag .section-intro')).toContainText('30–60 minutter');
  });

  test('contact states response time, a free first conversation and how price is set', async ({ page }) => {
    const terms = page.locator('#kontakt .contact-terms');
    await expect(terms).toBeVisible();
    await expect(terms).toContainText('to arbeidsdager');
    await expect(terms).toContainText('uforpliktende');
    await expect(terms).toContainText('pris avtales');
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
