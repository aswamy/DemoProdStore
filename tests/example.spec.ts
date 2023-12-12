import {test, expect} from '@playwright/test';

test('page shows shop name', async ({page}) => {
  if (!process.env.DEPLOYMENT_URL) {
    throw Error('DEPLOYMENT_URL is not set');
  }

  if (process.env.AUTH_BYPASS_TOKEN) {
    page.setExtraHTTPHeaders({
      'oxygen-auth-bypass-token': process.env.AUTH_BYPASS_TOKEN,
    });
  }

  await page.goto(process.env.DEPLOYMENT_URL);

  await expect(page).toHaveTitle(/Hydrogen | Home/);
  await expect(page.getByText('Alok Shop Exp')).toBeVisible();
});
