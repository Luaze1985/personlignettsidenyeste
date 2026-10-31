const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    headless: true,
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
  },
});
