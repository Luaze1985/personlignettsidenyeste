const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

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

  test('navigation follows the simplified Arbeidsbenken page flow', async ({ page }) => {
    const navigationTargets = await page.locator('nav a').evaluateAll((links) =>
      links.map((link) => link.getAttribute('href')),
    );

    expect(navigationTargets).toEqual([
      '#arbeidsbenken',
      '#om',
      '#erfaring',
      '#kontakt',
    ]);

    await expect(page.locator('#media, #tjenester, #innsikt, #foredrag')).toHaveCount(0);
    await expect(page.locator('.hero-action')).toHaveCount(0);
    await expect(page.locator('.audience-gate')).toContainText('Dette hjelper jeg med');
    await expect(page.locator('.audience-gate')).toContainText('Dette bygger det på');
    await expect(page.locator('.audience-gate')).not.toContainText('håndverksbedrifter');
    await expect(page.locator('.audience-gate')).not.toContainText('større virksomheter');
    await expect(page.locator('.steps li')).toHaveCount(4);
    await expect(page.locator('#arbeidsbenken')).toContainText('KI lager struktur og utkast');
    await expect(page.locator('#arbeidsbenken')).toContainText('Passer ikke når');
  });

  test('makes the work request primary and gives the home link its visible name', async ({ page }) => {
    const home = page.locator('header .profile-group');
    await expect(home).toHaveAccessibleName(/Lars Erik Brekne Johnsen/);

    const primary = page.locator('.hero-primary-action');
    const secondary = page.locator('.hero-secondary-action');
    await expect(primary).toHaveAttribute('href', '#kontakt');
    await expect(secondary).toHaveAttribute('href', '#kurs-og-foredrag');
    await expect(primary).toContainText(/oppgave/i);
    await expect(secondary).toContainText(/kurs|foredrag/i);
    await secondary.click();
    await expect(page).toHaveURL(/#kurs-og-foredrag$/);
    await expect(page.locator('#kurs-og-foredrag')).toBeInViewport();
  });

  test('reveals a working mailto link with the readable contact style on click', async ({ page }) => {
    const button = page.locator('#reveal-email');
    await expect(button).toBeVisible();
    await button.click();

    const link = page.locator('.contact-links a[href^="mailto:"]');
    await expect(link).toHaveCount(1);
    await expect(link).toHaveAttribute('href', 'mailto:larserik.bn@gmail.com');
    await expect(link).toHaveText('larserik.bn@gmail.com');
    await expect(link).toBeFocused();

    // "Samme lesbare kontaktstil": understreket, 0.95rem, samme farge som de
    // andre kontaktlenkene (hvit på mørkt panel — aksentfargen rendres aldri
    // fordi --accent-color ikke er definert; se code-review-notat).
    const style = await link.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        color: cs.color,
        textDecorationLine: cs.textDecorationLine,
        fontSize: cs.fontSize,
        offset: cs.textUnderlineOffset,
      };
    });
    const siblingColor = await page
      .locator('.contact-links a[href*="linkedin.com/in"]')
      .evaluate((el) => getComputedStyle(el).color);

    expect(style.textDecorationLine).toContain('underline');
    expect(style.fontSize).toBe('15.2px');
    expect(style.offset).toBe('4px');
    expect(style.color).toBe(siblingColor);
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
      expect.objectContaining({ src: 'images/foredrag-vartagder-snitt-bw.jpg' }),
    ]));
  });

  test('uses the agreed readable type hierarchy and navigation targets', async ({ page }) => {
    const styles = await page.evaluate(() => {
      const read = (selector) => getComputedStyle(document.querySelector(selector));
      const body = read('body');
      const intro = read('.section-intro');
      const about = read('.about-layout p');
      const step = read('.steps li > p:last-child');
      const navLink = read('nav a');
      const heading = read('h2');

      return {
        bodyColor: body.color,
        backgroundColor: body.backgroundColor,
        introColor: intro.color,
        aboutFontSize: Number.parseFloat(about.fontSize),
        stepFontSize: Number.parseFloat(step.fontSize),
        navPaddingTop: Number.parseFloat(navLink.paddingTop),
        headingFontFamily: heading.fontFamily,
      };
    });

    expect(styles.introColor).toBe(styles.bodyColor);
    expect(contrastRatio(styles.introColor, styles.backgroundColor)).toBeGreaterThanOrEqual(4.5);
    expect(styles.aboutFontSize).toBeGreaterThanOrEqual(15.6);
    expect(styles.stepFontSize).toBeGreaterThanOrEqual(15.2);
    expect(styles.navPaddingTop).toBeGreaterThanOrEqual(5.6);
    expect(styles.headingFontFamily).toContain('Newsreader');
  });

  test('avoids horizontal overflow and keeps the work steps readable on narrow screens', async ({ page }) => {
    for (const width of [180, 360, 768, 1440]) {
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
        stepLineHeightRatio: (() => {
          const styles = getComputedStyle(document.querySelector('.steps li > p:last-child'));
          return Number.parseFloat(styles.lineHeight) / Number.parseFloat(styles.fontSize);
        })(),
      }));

      expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
      expect(layout.navLinksContained).toBe(true);
      expect(layout.textFitsContainers).toBe(true);
      expect(layout.stepLineHeightRatio).toBeGreaterThanOrEqual(1.6);
    }

    await page.setViewportSize({ width: 360, height: 1000 });
    await page.goto(indexUrl);

    const widths = await page.evaluate(() => {
      const grid = document.querySelector('.steps').getBoundingClientRect();
      const steps = [...document.querySelectorAll('.steps li')]
        .map((step) => step.getBoundingClientRect().width);
      return { grid: grid.width, steps };
    });

    expect(widths.steps).toHaveLength(4);
    for (const stepWidth of widths.steps) {
      expect(stepWidth).toBeCloseTo(widths.grid - 2, 0);
    }
  });
});
