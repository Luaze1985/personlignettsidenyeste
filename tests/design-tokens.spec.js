const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Svart-hvitt-retningen (Figma 3:149) skal ikke ha oksidrødt eller varme papirtoner igjen.
const RETIRED_COLORS = ['#8a3f2b', '#713322', '#dfa692', '#f3efe6', '#fbfaf6', '#e9e3d8', '#cfc7ba', '#5a6b7c'];

test.describe('Svart-hvitt designtokens', () => {
  for (const file of ['css/style.css', 'DESIGN.md', 'favicon.svg', 'site.webmanifest', 'index.html', '404.html']) {
    test(`${file} bruker ingen pensjonerte farger`, () => {
      const content = fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8').toLowerCase();
      const found = RETIRED_COLORS.filter((color) => content.includes(color));
      expect(found).toEqual([]);
    });
  }

  test('alle hex-farger i :root er gråtoner', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../css/style.css'), 'utf8');
    const root = css.match(/:root\s*\{([^}]*)\}/)[1];
    const colors = [...root.matchAll(/#([0-9a-f]{6})\b/gi)].map((m) => m[1].toLowerCase());
    expect(colors.length).toBeGreaterThan(0);
    for (const hex of colors) {
      const [r, g, b] = [0, 2, 4].map((i) => hex.slice(i, i + 2));
      expect(r === g && g === b, `#${hex} er ikke en gråtone`).toBe(true);
    }
  });
});
