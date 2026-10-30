import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { GreetingPage } from '../../src/pages/GreetingPage';

test.describe('Greeting workflow regression', () => {
  test('submitting names displays the expected greeting', async ({ page }) => {
    const home = new HomePage(page);
    const greeting = new GreetingPage(page);
    await home.goto();
    await home.fillNames('Ada', 'Lovelace');
    await home.submit();
    await greeting.expectGreeting('Ada', 'Lovelace');
    await expect(greeting.returnHomeButton).toBeVisible();
  });

  test('returning home clears both fields', async ({ page }) => {
    const home = new HomePage(page);
    const greeting = new GreetingPage(page);
    await home.goto();
    await home.fillNames('Grace', 'Hopper');
    await home.submit();
    await greeting.expectGreeting('Grace', 'Hopper');
    await greeting.returnToHome();
    await home.expectLoaded();
    await home.expectFieldsCleared();
  });

  test('names containing spaces are displayed correctly', async ({ page }) => {
    const home = new HomePage(page);
    const greeting = new GreetingPage(page);
    await home.goto();
    await home.fillNames('Mary Jane', 'Watson Parker');
    await home.submit();
    await greeting.expectGreeting('Mary Jane', 'Watson Parker');
  });

  test('blank names return the user to the home form', async ({ page }) => {
    const home = new HomePage(page);
    await home.goto();
    await home.submit();
    await expect(page).toHaveURL(/\/homepage\/?$/);
    await expect(home.firstNameInput).toBeVisible();
    await expect(home.lastNameInput).toBeVisible();
  });
});
