const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

for (const width of [390, 1440]) {
  test(`accessible page, expanded references and contact at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(indexUrl);
    await page.locator('summary').click();
    await page.getByRole('button', { name: 'Vis e-postadresse' }).click();
    if (width === 390) await page.getByRole('button', { name: 'Åpne meny' }).click();
    const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
    expect(result.violations, JSON.stringify(result.violations, null, 2)).toEqual([]);
  });
}

test('visible proof points, link notices and metadata respect the approved profile', async ({ page }) => {
  await page.goto(indexUrl);
  await expect(page.locator('.press-list li')).toHaveCount(8);
  await expect(page.locator('.press-quote blockquote[cite]')).toHaveCount(1);
  await page.locator('summary').click();
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAccessibleName(/åpner i ny fane/);
    await expect(link.locator('svg')).toHaveAttribute('aria-hidden', 'true');
  }
  await expect(page.locator('html')).toHaveAttribute('lang', 'nb');
  const person = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(person.worksFor).toBeUndefined();
  await expect(page.locator('#om')).not.toContainText('Jeg er HR- og HMS-rådgiver i Kristiansand kommune');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', await page.title());
});

test('printed proof and expanded references stay readable with background graphics', async ({ page }) => {
  await page.goto(indexUrl);
  await page.locator('summary').click();
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.contact-section')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  for (const selector of ['.press-list a', '.reference-details a', '.reference-details summary', '.press-outlet', '.contact-panel .eyebrow', '.contact-hints li']) {
    for (const element of await page.locator(selector).all()) {
      await expect(element).toHaveCSS('color', 'rgb(0, 0, 0)');
    }
  }
});
