import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
let config: PlaywrightTestConfig = defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});

if (process.env.URL) {
  const use = {
    ...config.use,
    baseURL: process.env.URL,
  };

  if (process.env.AUTH_BYPASS_TOKEN) {
    use.extraHTTPHeaders = {
      'oxygen-auth-bypass-token': process.env.AUTH_BYPASS_TOKEN,
    };
  }

  config = {
    ...config,
    use,
  };
} else {
  config = {
    ...config,
    use: {
      ...config.use,
      baseURL: 'http://localhost:3000',
    },
    /* Run your local dev server before starting the tests */
    webServer: {
      command: 'npm run preview',
      port: 3000,
    },
  };
}

export default config;
