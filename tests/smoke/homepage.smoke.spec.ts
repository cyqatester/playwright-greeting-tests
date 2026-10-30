import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

test('SMOKE: homepage loads with name fields and submit button', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await homePage.expectLoaded();
});
