const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

// Figma 4:108 (foredrag), 4:121 (om), 4:130 (kontakt). Erfaring er lys etter Lars' valg 31.10.2026.
test.describe('Foredrag, Om, Erfaring og Kontakt', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(indexUrl);
  });

  test('sections follow the Figma reading order', async ({ page }) => {
    const ids = await page.locator('main > section').evaluateAll((sections) => sections.map((s) => s.id));
    expect(ids).toEqual(['arbeidsbenken', 'kurs-og-foredrag', 'om', 'erfaring', 'kontakt']);
  });

  test('talks sit on a grey band with photo, three themes and a contact link', async ({ page }) => {
    const talks = page.locator('#kurs-og-foredrag');
    await expect(talks).toHaveCSS('background-color', 'rgb(242, 242, 242)');
    await expect(talks.locator('.eyebrow').first()).toHaveText(/02 \/ Kurs & foredrag/i);
    await expect(talks.locator('h2')).toHaveText('For folk som skal bruke KI i praksis.');
    await expect(talks.locator('.speaking-image img')).toBeVisible();
    await expect(talks.locator('.talk-list h3')).toHaveText(['Effektivisering i praksis', 'Folk, organisasjon og KI', 'Kvalitet, kontroll og agenter']);
    await expect(talks.locator('a[href="#kontakt"]')).toContainText('Ta kontakt om foredrag');
  });

  test('about is plain text that links to experience', async ({ page }) => {
    const about = page.locator('#om');
    await expect(about.locator('.eyebrow').first()).toHaveText(/03 \/ Fag, folk og teknologi/i);
    await expect(about.locator('h2')).toHaveText('Jeg liker å gjøre kompliserte ting brukbare.');
    await expect(about.locator('img')).toHaveCount(0);
    await expect(about.locator('a[href="#erfaring"]')).toContainText('Se erfaring og omtaler');
  });

  test('experience is a light section without monospace labels', async ({ page }) => {
    const experience = page.locator('#erfaring');
    await expect(experience).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(experience.locator('.eyebrow').first()).toHaveText(/04 \/ Erfaring og omtaler/i);
    for (const selector of ['.press-outlet', '.reference-details summary']) {
      const family = await experience.locator(selector).first().evaluate((el) => getComputedStyle(el).fontFamily);
      expect(family).not.toMatch(/mono/i);
    }
  });

  test('contact is a full-width black band with a white e-mail button', async ({ page }) => {
    const contact = page.locator('#kontakt');
    await expect(contact).toHaveCSS('background-color', 'rgb(17, 17, 17)');
    const width = await contact.evaluate((el) => el.getBoundingClientRect().width);
    expect(width).toBe(1440);
    await expect(contact.locator('h2')).toHaveText('Har du en oppgave i tankene?');
    await expect(page.locator('#reveal-email')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(contact.locator('a[href*="linkedin.com/in"]')).toHaveCount(1);
    await expect(contact.locator('a[href*="linkedin.com/groups"]')).toHaveCount(1);
  });

  test('navigation marks Om as current when the about section is read', async ({ page }) => {
    await page.locator('#om').scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, document.getElementById('om').getBoundingClientRect().top + window.scrollY - 100));
    await expect(page.locator('nav a[href="#om"]')).toHaveAttribute('aria-current', 'location');
  });
});
