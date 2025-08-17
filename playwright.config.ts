import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e',
  retries: 2,
  use: {
    baseURL: 'http://localhost:5173/starwars',
    headless: true,
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'pnpm run build && pnpm run serve --port 5173 --host',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 60000
  }
});
