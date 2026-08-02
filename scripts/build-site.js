const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const outputRoot = path.join(projectRoot, 'dist');

const publicFiles = [
  'index.html',
  '404.html',
  'apple-touch-icon.png',
  'favicon.svg',
  'robots.txt',
  'site.webmanifest',
  'sitemap.xml',
  'css/style.css',
  'js/navigation.js',
  'fonts/OFL.txt',
  'fonts/newsreader-latin-400-normal.woff2',
  'fonts/newsreader-latin-600-normal.woff2',
  'fonts/newsreader-latin-ext-400-normal.woff2',
  'fonts/newsreader-latin-ext-600-normal.woff2',
  'images/profil-480.jpg',
  'images/foredrag-vartagder-1240.jpg',
];

fs.rmSync(outputRoot, { recursive: true, force: true });

for (const relativePath of publicFiles) {
  const sourcePath = path.join(projectRoot, relativePath);
  const destinationPath = path.join(outputRoot, relativePath);

  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
    throw new Error(`Mangler offentlig kildefil: ${relativePath}`);
  }

  fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
  fs.copyFileSync(sourcePath, destinationPath);
}

console.log(`Bygget dist med ${publicFiles.length} eksplisitt tillatte filer.`);
