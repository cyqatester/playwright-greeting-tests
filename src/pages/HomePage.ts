import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByLabel(/first name/i);
    this.lastNameInput = page.getByLabel(/last name/i);
    this.submitButton = page.getByRole('button', { name: /submit/i });
  }

  async goto(): Promise<void> {
    await this.page.goto('/greeting-app');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/greeting-app\/?$/);
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async fillNames(firstName: string, lastName: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
  }

  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  async expectFieldsCleared(): Promise<void> {
    await expect(this.firstNameInput).toHaveValue('');
    await expect(this.lastNameInput).toHaveValue('');
  }
}
