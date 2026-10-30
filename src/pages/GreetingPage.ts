import { expect, type Locator, type Page } from '@playwright/test';

export class GreetingPage {
  readonly page: Page;
  readonly greeting: Locator;
  readonly returnHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.greeting = page.getByText(/^Hello .+!$/);
    this.returnHomeButton = page.getByRole('button', { name: /return to home page/i });
  }

  async expectGreeting(firstName: string, lastName: string): Promise<void> {
    await expect(this.greeting).toHaveText(`Hello ${firstName} ${lastName}!`);
  }

  async returnToHome(): Promise<void> {
    await this.returnHomeButton.click();
  }
}
