import { Page, Locator } from "@playwright/test";

export class RegistrationPage {
  private page: Page;
  private firstName: Locator;
  private lastName: Locator;
  private email: Locator;
  private password: Locator;
  private agreeBtn: Locator;
  private continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[id="input-firstname"]');
    this.lastName = page.locator('[id="input-lastname"]');
    this.email = page.locator('[id="input-email"]');
    this.password = page.locator('[id="input-password"]');
    this.agreeBtn = page.locator('[name="agree"]');
    this.continueBtn = page.getByRole("button", { name: "Continue" });
  }

  // Fill in the registration form
  async fillRegistrationForm(firstName: string, lastName: string, email: string, password: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.email.fill(email);
    await this.password.fill(password);
  }

  // Agree to terms and conditions
  async agreeToTerms(): Promise<void> {
    await this.agreeBtn.check();
  }

  // Submit the registration form
  async submitRegistration(): Promise<void> {
    await this.continueBtn.click();
  }

  // Registration flow
  async userRegistration(firstName: string, lastName: string, email: string, password: string): Promise<void> {
    await this.fillRegistrationForm(firstName, lastName, email, password);
    await this.agreeToTerms();
    await this.submitRegistration();
  }
}
