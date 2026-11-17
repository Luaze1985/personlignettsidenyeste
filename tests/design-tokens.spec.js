const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Svart-hvitt-retningen (Figma 3:149) skal ikke ha oksidrødt eller varme papirtoner igjen.
const RETIRED_COLORS = ['#8a3f2b', '#713322', '#dfa692', '#f3efe6', '#fbfaf6', '#e9e3d8', '#cfc7ba', '#5a6b7c'];

const ALLOWED_HEX = new Set([
  '#111111',
  '#ffffff',
  '#f2f2f2',
  '#555555',
  '#d9d9d9',
  '#1f1f1f',
  '#232527',
  '#6b6b6b',
  '#d4d4d4',
  '#000000',
  '#7ee081',
  '#ffd166',
  '#ff6b6b',
]);

const ZONE_HEX = new Set(['#232527', '#7ee081', '#ffd166', '#ff6b6b']);

test.describe('Svart-hvitt og sonefarge designtokens', () => {
  for (const file of ['css/style.css', 'DESIGN.md', 'favicon.svg', 'site.webmanifest', 'index.html', '404.html']) {
    test(`${file} bruker ingen pensjonerte farger`, () => {
      const content = fs.readFileSync(path.resolve(__dirname, '..', file), 'utf8').toLowerCase();
      const found = RETIRED_COLORS.filter((color) => content.includes(color));
      expect(found).toEqual([]);
    });
  }

  test('alle hex-farger i hele css/style.css er godkjente fra DESIGN.md', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../css/style.css'), 'utf8');
    const matches = [...css.matchAll(/#([0-9a-f]{6}|[0-9a-f]{3})\b/gi)];
    expect(matches.length).toBeGreaterThan(0);

    const violations = [];
    for (const match of matches) {
      let hex = match[1].toLowerCase();
      if (hex.length === 3) {
        hex = hex.split('').map((c) => c + c).join('');
      }
      const fullHex = `#${hex}`;
      if (!ALLOWED_HEX.has(fullHex)) {
        violations.push(`${match[0]} (${fullHex}) står ikke i DESIGN.md`);
        continue;
      }
      const [r, g, b] = [0, 2, 4].map((i) => hex.slice(i, i + 2));
      if ((r !== g || g !== b) && !ZONE_HEX.has(fullHex)) {
        violations.push(`${match[0]} er ikke en godkjent gråtone eller sonefarge`);
      }
    }
    expect(violations).toEqual([]);
  });

  test('css/style.css bruker ingen skygger, og gradienter kun i sortering-kortet', () => {
    const css = fs.readFileSync(path.resolve(__dirname, '../css/style.css'), 'utf8');
    expect(css).not.toMatch(/box-shadow/i);
    expect(css).not.toMatch(/drop-shadow\s*\(/i);

    const gradientLines = css
      .split(/\r?\n/)
      .filter((line) => /gradient\s*\(/i.test(line));
    expect(gradientLines.length).toBeGreaterThan(0);
    for (const line of gradientLines) {
      expect(line).toMatch(/^\.(bento-tile|traffic-row)\b/);
    }
  });

  test('index.html bruker sonefargeklasser i #arbeidsbenken uten grain-overlay', () => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    expect(html).toMatch(/zone-dot--green/);
    expect(html).toMatch(/zone-dot--yellow/);
    expect(html).toMatch(/zone-dot--red/);
    expect(html).not.toMatch(/bento-tile--grain/i);
  });
});
