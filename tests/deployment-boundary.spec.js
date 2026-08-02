const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const outputRoot = path.join(projectRoot, 'dist');

const expectedFiles = [
  '404.html',
  'apple-touch-icon.png',
  'css/style.css',
  'favicon.svg',
  'fonts/OFL.txt',
  'fonts/newsreader-latin-400-normal.woff2',
  'fonts/newsreader-latin-600-normal.woff2',
  'fonts/newsreader-latin-ext-400-normal.woff2',
  'fonts/newsreader-latin-ext-600-normal.woff2',
  'images/foredrag-vartagder-1240.jpg',
  'images/profil-480.jpg',
  'index.html',
  'js/navigation.js',
  'robots.txt',
  'site.webmanifest',
  'sitemap.xml',
];

function listFiles(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.posix.join(prefix, entry.name);
    const absolutePath = path.join(directory, entry.name);
    return entry.isDirectory() ? listFiles(absolutePath, relativePath) : [relativePath];
  });
}

function localReferences(content) {
  const references = [...content.matchAll(/(?:src|href)=["']([^"']+)["']/gi)]
    .map((match) => match[1]);

  return references.filter((reference) => (
    reference !== '/'
    && !reference.startsWith('#')
    && !reference.startsWith('http://')
    && !reference.startsWith('https://')
    && !reference.startsWith('mailto:')
    && !reference.startsWith('data:')
  ));
}

function resolvePublicReference(reference) {
  const withoutQuery = reference.split(/[?#]/)[0];
  return path.join(outputRoot, withoutQuery.replace(/^\//, ''));
}

test.describe('Production deployment boundary', () => {
  test('contains exactly the explicitly allowed public files', () => {
    expect(listFiles(outputRoot).sort()).toEqual([...expectedFiles].sort());
  });

  test('excludes internal, stale and source-only files', () => {
    const forbiddenFiles = [
      'AGENTS.md',
      'README.md',
      'SPEC.md',
      'profil.html',
      'js/theme.js',
      'package.json',
      'tests/header-validator.spec.js',
      'images/Profil.jpg',
      'images/foredrag-vartagder-snitt-bw.jpg',
    ];

    for (const relativePath of forbiddenFiles) {
      expect(fs.existsSync(path.join(outputRoot, relativePath)), relativePath).toBe(false);
    }
  });

  test('all local HTML and manifest references exist in the artifact', () => {
    for (const htmlFile of ['index.html', '404.html']) {
      const html = fs.readFileSync(path.join(outputRoot, htmlFile), 'utf8');
      for (const reference of localReferences(html)) {
        expect(fs.existsSync(resolvePublicReference(reference)), `${htmlFile}: ${reference}`).toBe(true);
      }
    }

    const manifest = JSON.parse(fs.readFileSync(path.join(outputRoot, 'site.webmanifest'), 'utf8'));
    for (const icon of manifest.icons) {
      expect(fs.existsSync(resolvePublicReference(icon.src)), `site.webmanifest: ${icon.src}`).toBe(true);
    }
  });
});
