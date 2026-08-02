const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../index.html')}`;

function contrastRatio(foreground, background) {
  const luminance = (rgb) => {
    const channels = rgb.match(/\d+/g).slice(0, 3).map((value) => {
      const normalized = Number(value) / 255;
      return normalized <= 0.03928
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
    });
    return (0.2126 * channels[0]) + (0.7152 * channels[1]) + (0.0722 * channels[2]);
  };

  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

test.describe('UX, UI and readability', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(indexUrl);
  });

  test('navigation follows the page flow and approach is consolidated into insight', async ({ page }) => {
    const navigationTargets = await page.locator('nav a').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')),
    );

    expect(navigationTargets).toEqual([
      '#media',
      '#tjenester',
      '#innsikt',
      '#om',
      '#foredrag',
      '#kontakt',
    ]);

    await expect(page.locator('#tilnaerming')).toHaveCount(0);
    await expect(page.locator('#innsikt .box')).toHaveCount(3);
    await expect(page.locator('#innsikt')).toContainText('arbeid faktisk tar tid');
    await expect(page.locator('#innsikt')).toContainText('KI skal støtte faget');
    await expect(page.locator('#innsikt')).toContainText('små steg');
  });

  test('loads the optimized profile and speaking images', async ({ page }) => {
    const imageSources = await page.locator('img').evaluateAll((images) =>
      images.map((image) => ({
        className: image.className,
        src: image.getAttribute('src'),
        naturalWidth: image.naturalWidth,
      })),
    );

    expect(imageSources).toEqual(expect.arrayContaining([
      expect.objectContaining({ className: 'profile-pic', src: 'images/profil-480.jpg', naturalWidth: 480 }),
      expect.objectContaining({ className: 'about-image', src: 'images/profil-480.jpg', naturalWidth: 480 }),
      expect.objectContaining({ src: 'images/foredrag-vartagder-1240.jpg', naturalWidth: 1240 }),
    ]));
  });

  test('uses the agreed readable type hierarchy and navigation targets', async ({ page }) => {
    const styles = await page.evaluate(() => {
      const read = (selector) => getComputedStyle(document.querySelector(selector));
      const body = read('body');
      const intro = read('.section-intro');
      const about = read('.about-layout p');
      const card = read('.service-grid .box p');
      const navLink = read('nav a');
      const heading = read('h2');

      return {
        bodyColor: body.color,
        backgroundColor: body.backgroundColor,
        introColor: intro.color,
        aboutFontSize: Number.parseFloat(about.fontSize),
        cardFontSize: Number.parseFloat(card.fontSize),
        navPaddingTop: Number.parseFloat(navLink.paddingTop),
        headingLetterSpacing: Number.parseFloat(heading.letterSpacing),
      };
    });

    expect(styles.introColor).toBe(styles.bodyColor);
    expect(contrastRatio(styles.introColor, styles.backgroundColor)).toBeGreaterThanOrEqual(4.5);
    expect(styles.aboutFontSize).toBeGreaterThanOrEqual(15.6);
    expect(styles.cardFontSize).toBeGreaterThanOrEqual(15.2);
    expect(styles.navPaddingTop).toBeGreaterThanOrEqual(5.6);
    expect(styles.headingLetterSpacing).toBeGreaterThanOrEqual(1.1);
  });

  test('avoids horizontal overflow and keeps media cards full width on mobile', async ({ page }) => {
    for (const width of [360, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(indexUrl);

      const layout = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: document.documentElement.scrollWidth,
        navLinksContained: (() => {
          const nav = document.querySelector('nav').getBoundingClientRect();
          return [...document.querySelectorAll('nav a')].every((link) => {
            const rect = link.getBoundingClientRect();
            return rect.left >= nav.left - 1 && rect.right <= nav.right + 1
              && rect.top >= nav.top - 1 && rect.bottom <= nav.bottom + 1;
          });
        })(),
        textFitsContainers: [...document.querySelectorAll('main p')]
          .every((paragraph) => paragraph.scrollWidth <= paragraph.clientWidth + 1),
        cardLineHeightRatio: (() => {
          const styles = getComputedStyle(document.querySelector('.service-grid .box p'));
          return Number.parseFloat(styles.lineHeight) / Number.parseFloat(styles.fontSize);
        })(),
      }));

      expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
      expect(layout.navLinksContained).toBe(true);
      expect(layout.textFitsContainers).toBe(true);
      expect(layout.cardLineHeightRatio).toBeGreaterThanOrEqual(1.6);
    }

    await page.setViewportSize({ width: 360, height: 1000 });
    await page.goto(indexUrl);

    const widths = await page.evaluate(() => {
      const grid = document.querySelector('.grid-video').getBoundingClientRect();
      const cards = [...document.querySelectorAll('.grid-video > div')]
        .map((card) => card.getBoundingClientRect().width);
      return { grid: grid.width, cards };
    });

    expect(widths.cards).toHaveLength(2);
    for (const cardWidth of widths.cards) {
      expect(cardWidth).toBeCloseTo(widths.grid, 0);
    }
  });
});
