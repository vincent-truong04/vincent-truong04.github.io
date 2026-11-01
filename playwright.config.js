// Accessibility checks against the production build.
// Run `npm run build` first, then `npm run test:a11y`.
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  workers: 1,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    // Use the installed Chrome instead of downloading Playwright's browsers.
    channel: 'chrome',
  },
  webServer: {
    command: 'node tests/static-server.mjs build 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
});
