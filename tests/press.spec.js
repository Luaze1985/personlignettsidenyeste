const { test, expect } = require('@playwright/test');
const path = require('path');

const indexUrl = `file://${path.resolve(__dirname, '../dist/index.html')}`;

// Kilder kontrollert mot rå HTML 31.10.2026, se docs/kilder-fagpresse.md.
const PRESS = [
  { outlet: 'Fagbladet', href: 'https://www.fagbladet.no/nyheter/lars-erik-er-ki-guru-i-kommunen-dette-vil-han-aldri-bruke-teknologien-til/752959' },
  { outlet: 'kode24', href: 'https://www.kode24.no/artikkel/slik-loser-de-40-arskrisen/259601' },
  { outlet: 'AIavisen', href: 'https://aiavisen.no/min-ki-reise/' },
  { outlet: 'Fædrelandsvennen', href: 'https://www.fvn.no/mening/debattinnlegg/i/25aKA4/vi-har-faatt-ki-verktoeykassen-vi-maa-laere-aa-bruke-den-sammen' },
  { outlet: 'HR Norge', href: 'https://www.hrnorge.no/tema/digitalisering/digitale-l%C3%B8sninger-innen-hr/veien-til-digital-effektivisering' },
];

test.describe('Omtalt hos og fagpressen', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(indexUrl);
  });

  test('the mention strip follows the hero and only names documented references', async ({ page }) => {
    const strip = page.locator('.mentions');
    await expect(strip).toContainText(/Omtalt hos/i);
    const names = await strip.locator('li').allTextContents();
    expect(names).toEqual(['NRK', 'HR Norge', 'Tech Talks Agder', 'DigiViken']);
    const erfaring = await page.locator('#erfaring').textContent();
    for (const name of names) expect(erfaring).toContain(name);
    const order = await page.evaluate(() => {
      const strip = document.querySelector('.mentions');
      return Boolean(document.querySelector('.hero').compareDocumentPosition(strip) & Node.DOCUMENT_POSITION_FOLLOWING)
        && Boolean(strip.compareDocumentPosition(document.querySelector('#arbeidsbenken')) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);
  });

  test('every press item has outlet, title and a link that is also in the reference list', async ({ page }) => {
    const items = page.locator('#erfaring .press-list li');
    await expect(items).toHaveCount(PRESS.length);
    const detailHrefs = await page.locator('.reference-details a').evaluateAll((links) => links.map((a) => a.getAttribute('href')));
    for (const [index, entry] of PRESS.entries()) {
      const item = items.nth(index);
      await expect(item.locator('.press-outlet')).toHaveText(entry.outlet);
      const link = item.locator('a');
      await expect(link).toHaveAttribute('href', entry.href);
      await expect(link).toHaveAttribute('rel', /noopener/);
      expect((await link.innerText()).trim().length).toBeGreaterThan(5);
      expect(detailHrefs).toContain(entry.href);
    }
    await expect(page.locator('.press-list')).not.toContainText('Lawai');
    await expect(items.nth(4)).toContainText('krever medlemskap');
  });

  test('the highlighted quote is cited with a visible source', async ({ page }) => {
    const quote = page.locator('.press-quote blockquote');
    await expect(quote).toHaveCount(1);
    await expect(quote).toHaveAttribute('cite', PRESS[1].href);
    await expect(quote).toHaveText('«KI er en folkebevegelse, og den er åpen for alle»');
    await expect(page.locator('.press-quote figcaption')).toContainText('kode24');
    await expect(page.locator('.press-quote figcaption')).toBeVisible();
  });
});
