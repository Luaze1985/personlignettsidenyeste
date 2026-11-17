const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

// Figma 4:108 (foredrag), 4:121 (om), 4:130 (kontakt). Erfaring er lys etter Lars' valg 31.10.2026.
test.describe('Foredrag, Om, Erfaring og Kontakt', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(indexUrl);
  });

  test('sections follow the trimmed reading order', async ({ page }) => {
    const ids = await page.locator('main > section').evaluateAll((sections) => sections.map((s) => s.id));
    expect(ids).toEqual(['arbeidsbenken', 'kurs-og-foredrag', 'om', 'kontakt']);
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

  test('about and experience are merged into one light section without monospace labels', async ({ page }) => {
    const about = page.locator('#om');
    const experience = page.locator('#erfaring');
    await expect(about).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(about.locator('.eyebrow').first()).toHaveText(/03 \/ Om og erfaring/i);
    await expect(about.locator('h2')).toHaveText('Jeg liker å gjøre kompliserte ting brukbare.');
    await expect(about.locator('img')).toHaveCount(0);
    await expect(experience.locator('blockquote')).toHaveCount(1);
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
    await expect(contact.locator('#reveal-email')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(contact.locator('a[href*="linkedin.com/in"]')).toHaveCount(1);
    await expect(contact.locator('a[href*="linkedin.com/groups"]')).toHaveCount(1);
  });

  test('navigation marks Om as current when the about section is read', async ({ page }) => {
    await page.locator('#om').scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollTo(0, document.getElementById('om').getBoundingClientRect().top + window.scrollY - 100));
    await expect(page.locator('nav a[href="#om"]')).toHaveAttribute('aria-current', 'location');
  });

  test('podcast block inside experience shows main episodes and platform links without snippet', async ({ page }) => {
    const podcast = page.locator('#erfaring #podkast');
    await expect(podcast.locator('h3')).toHaveText('Nok en podkast om KI');

    const channels = podcast.locator('.podcast-channels a');
    await expect(channels).toHaveCount(2);
    await expect(channels.nth(0)).toHaveAttribute('href', 'https://open.spotify.com/show/5tKBEkJOXRfeKQxHmABMQ1');
    await expect(channels.nth(1)).toHaveAttribute('href', 'https://www.youtube.com/playlist?list=PLUUcWukQxAg4');

    const items = podcast.locator('.podcast-list li');
    await expect(items).toHaveCount(3);
    await expect(podcast.locator('.podcast-tag')).toHaveText([
      /Episode 03/,
      /Episode 02/,
      /Episode 01/,
    ]);
    await expect(podcast.locator('.podcast-list')).not.toContainText('Smakebit');
    // Brukerråd 17.11.2026: én linje per episode, uten beskrivelse.
    await expect(podcast.locator('.podcast-desc')).toHaveCount(0);

    for (let i = 0; i < 3; i++) {
      const links = items.nth(i).locator('.podcast-item-links a');
      await expect(links).toHaveCount(2);
      await expect(links.nth(0)).toHaveAttribute('href', /open\.spotify\.com\/episode\//);
      await expect(links.nth(1)).toHaveAttribute('href', /youtube\.com\/watch\?v=/);
      await expect(links.nth(0)).toHaveAccessibleName(/åpner i ny fane/);
      await expect(links.nth(1)).toHaveAccessibleName(/åpner i ny fane/);
    }
  });
});
