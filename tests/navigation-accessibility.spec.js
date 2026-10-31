const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

test('mobile menu supports keyboard, nested icons, and breakpoint changes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(indexUrl);
  const toggle = page.getByRole('button', { name: /^(Åpne|Lukk) meny$/ });
  await expect(toggle).toHaveAccessibleName('Åpne meny');
  const size = await toggle.boundingBox();
  expect(size.width).toBeGreaterThanOrEqual(44);
  expect(size.height).toBeGreaterThanOrEqual(44);
  await toggle.click();
  await expect(toggle).toHaveAccessibleName('Lukk meny');
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('navigation').getByRole('link', { name: 'Kontakt' }).focus();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(toggle).toBeFocused();
  await toggle.click();
  await page.locator('nav a[href="#kontakt"] svg').click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#kontakt$/);
  await toggle.click();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('navigation')).toBeHidden();
});

test('mobile visitors see the main action before the portrait', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(indexUrl);
  const action = await page.locator('.hero-primary-action').boundingBox();
  const portrait = await page.locator('.hero-portrait').boundingBox();
  expect(action.y + action.height).toBeLessThanOrEqual(844);
  expect(portrait.y).toBeGreaterThan(action.y + action.height);
  await expect(page.locator('.hero-badges')).toHaveCount(0);
  await page.locator('.hero-secondary-action').click();
  await expect(page).toHaveURL(/#kurs-og-foredrag$/);
});

test('skip link moves keyboard focus and section navigation has a current location', async ({ page }) => {
  await page.goto(indexUrl);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Hopp til innhold' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  await page.getByRole('navigation').getByRole('link', { name: 'Kontakt' }).click();
  await expect(page.locator('nav a[href="#kontakt"]')).toHaveAttribute('aria-current', 'location');
});

test('navigation and contact remain usable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto(indexUrl);
  await expect(page.getByRole('navigation')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Åpne meny' })).toBeHidden();
  await page.getByRole('navigation').getByRole('link', { name: 'Kontakt' }).click();
  await expect(page.locator('noscript a[href="mailto:larserik.bn@gmail.com"]')).toBeVisible();
  await context.close();
});
