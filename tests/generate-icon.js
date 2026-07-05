const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 180, height: 180 } });

  const svgContent = fs.readFileSync(path.join(__dirname, '..', 'favicon.svg'), 'utf8');
  // Replace viewBox to render at 180x180
  const scaledSvg = svgContent.replace('viewBox="0 0 64 64"', 'viewBox="0 0 64 64" width="180" height="180"');

  await page.setContent(`
    <html>
      <body style="margin:0;padding:0;background:transparent;">
        ${scaledSvg}
      </body>
    </html>
  `);

  const svg = await page.$('svg');
  const buffer = await svg.screenshot({ type: 'png', omitBackground: true });
  fs.writeFileSync(path.join(__dirname, '..', 'apple-touch-icon.png'), buffer);
  console.log('apple-touch-icon.png created (' + buffer.length + ' bytes)');

  await browser.close();
})();
