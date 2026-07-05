const { test, expect } = require('@playwright/test');
const http = require('http');
const fs = require('fs');
const path = require('path');

let server;
const PORT = 3010;
const BASE_URL = `http://localhost:${PORT}`;

test.describe('SEO & Metadata Verification', () => {

  test.beforeAll(async () => {
    // Start local server to serve static files
    server = http.createServer((req, res) => {
      const decodedUrl = decodeURIComponent(req.url);
      const cleanUrl = decodedUrl.split(/[?#]/)[0];
      const relativePath = cleanUrl === '/' ? 'index.html' : cleanUrl.substring(1);
      const filePath = path.resolve(__dirname, '../', relativePath);

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        let contentType = 'text/plain';
        if (filePath.endsWith('.html')) contentType = 'text/html; charset=utf-8';
        else if (filePath.endsWith('.xml')) contentType = 'application/xml; charset=utf-8';
        
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    });

    await new Promise((resolve) => server.listen(PORT, resolve));
  });

  test.afterAll(async () => {
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('TC-5.1: Meta Description Presence', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    const metaDesc = await page.locator('meta[name="description"]');
    await expect(metaDesc).toBeAttached();
    const content = await metaDesc.getAttribute('content');
    expect(content.length).toBeGreaterThan(50);
  });

  test('TC-5.2: Open Graph Metadata', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toContain('Lars Erik');

    const ogDesc = await page.locator('meta[property="og:description"]').getAttribute('content');
    expect(ogDesc.length).toBeGreaterThan(10);

    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
    expect(ogType).toBe('website');

    const ogUrl = await page.locator('meta[property="og:url"]').getAttribute('content');
    expect(ogUrl).toBe('https://larserikbjohnsen.no/');

    const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
    expect(ogImage).toContain('Profil.jpg');

    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    expect(ogLocale).toBe('nb_NO');
  });

  test('TC-5.3: Canonical URL Tag', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    const canonicalLink = await page.locator('link[rel="canonical"]');
    await expect(canonicalLink).toBeAttached();
    const href = await canonicalLink.getAttribute('href');
    expect(href).toBe('https://larserikbjohnsen.no/');
  });

  test('TC-5.4: JSON-LD Structured Data (Person Schema)', async ({ page }) => {
    await page.goto(BASE_URL + '/');
    const jsonLdScript = await page.locator('script[type="application/ld+json"]');
    await expect(jsonLdScript).toBeAttached();
    
    const rawJson = await jsonLdScript.textContent();
    const data = JSON.parse(rawJson);
    
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('Person');
    expect(data['name']).toBe('Lars Erik Brekne Johnsen');
    expect(data['url']).toBe('https://larserikbjohnsen.no/');
  });

  test('TC-5.5: robots.txt Accessibility', async ({ request }) => {
    const res = await request.get(BASE_URL + '/robots.txt');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('User-agent: *');
    expect(text).toContain('Sitemap:');
  });

  test('TC-5.6: sitemap.xml Accessibility', async ({ request }) => {
    const res = await request.get(BASE_URL + '/sitemap.xml');
    expect(res.status()).toBe(200);
    const text = await res.text();
    expect(text).toContain('<urlset');
    expect(text).toContain('https://larserikbjohnsen.no/');
  });
});
