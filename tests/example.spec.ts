import {test, expect} from '@playwright/test';

test('has title', async ({page}) => {
  if (!process.env.DEPLOYMENT_URL) {
    throw Error('DEPLOYMENT_URL is not set');
  }

  if (process.env.AUTH_BYPASS_TOKEN) {
    page.setExtraHTTPHeaders({
      'oxygen-auth-bypass-token': process.env.AUTH_BYPASS_TOKEN,
    });
  }

  await page.goto(process.env.DEPLOYMENT_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Home page/);
});
