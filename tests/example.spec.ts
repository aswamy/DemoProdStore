import {test, expect} from '@playwright/test';

test('page shows shop name', async ({page}) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Hydrogen | Home/);
  await expect(page.getByText('bottles of sand')).toBeVisible();
});
