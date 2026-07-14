const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Image formatting', () => {
  test('preserves the profile format and uses a deliberate stage crop', async ({ page }) => {
    const indexPath = path.resolve(__dirname, '../index.html');
    await page.goto(`file://${indexPath}`);

    const images = await page.evaluate(() => {
      const readImage = (selector) => {
        const image = document.querySelector(selector);
        const rect = image.getBoundingClientRect();
        const styles = getComputedStyle(image);
        return {
          naturalRatio: image.naturalWidth / image.naturalHeight,
          renderedRatio: rect.width / rect.height,
          objectFit: styles.objectFit,
          width: rect.width,
          height: rect.height,
        };
      };

      return {
        profile: readImage('.about-image'),
        speaking: readImage('.speaking-image img'),
      };
    });

    const stylesheet = await page.locator('link[rel="stylesheet"]').getAttribute('href');
    expect(stylesheet).toContain('?v=');
    expect(images.profile.renderedRatio).toBeCloseTo(images.profile.naturalRatio, 1);
    expect(images.profile.objectFit).toBe('contain');
    expect(images.speaking.renderedRatio).toBeCloseTo(16 / 9, 1);
    expect(images.speaking.objectFit).toBe('cover');
  });

  test('keeps both image treatments stable on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const indexPath = path.resolve(__dirname, '../index.html');
    await page.goto(`file://${indexPath}`);

    const ratios = await page.evaluate(() => {
      const profile = document.querySelector('.about-image');
      const speaking = document.querySelector('.speaking-image img');
      const profileRect = profile.getBoundingClientRect();
      const speakingRect = speaking.getBoundingClientRect();
      return {
        profile: profileRect.width / profileRect.height,
        profileNatural: profile.naturalWidth / profile.naturalHeight,
        speaking: speakingRect.width / speakingRect.height,
      };
    });

    expect(ratios.profile).toBeCloseTo(ratios.profileNatural, 1);
    expect(ratios.speaking).toBeCloseTo(16 / 9, 1);
  });
});
