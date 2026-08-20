const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Image formatting', () => {
  test('uses a deliberate 4:3 crop that keeps the speaker high in frame', async ({ page }) => {
    const indexPath = path.resolve(__dirname, '../dist/index.html');
    await page.goto(`file://${indexPath}`);

    const speaking = await page.evaluate(() => {
      const image = document.querySelector('.speaking-image img');
      const rect = image.getBoundingClientRect();
      const styles = getComputedStyle(image);
      return {
        naturalRatio: image.naturalWidth / image.naturalHeight,
        renderedRatio: rect.width / rect.height,
        objectFit: styles.objectFit,
        objectPosition: styles.objectPosition,
        width: rect.width,
        height: rect.height,
      };
    });

    const stylesheet = await page.locator('link[rel="stylesheet"]').getAttribute('href');
    expect(stylesheet).toContain('?v=');
    expect(speaking.renderedRatio).toBeCloseTo(4 / 3, 1);
    expect(speaking.objectFit).toBe('cover');
    expect(speaking.objectPosition).toBe('50% 20%');
  });

  test('keeps the speaker-focused crop stable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const indexPath = path.resolve(__dirname, '../dist/index.html');
    await page.goto(`file://${indexPath}`);

    const speaking = await page.evaluate(() => {
      const image = document.querySelector('.speaking-image img');
      const rect = image.getBoundingClientRect();
      return rect.width / rect.height;
    });

    expect(speaking).toBeCloseTo(4 / 3, 1);
  });
});
