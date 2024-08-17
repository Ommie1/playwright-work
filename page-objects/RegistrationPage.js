class RegistrationPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[id="input-firstname"]');
    this.lastName = page.locator('[id="input-lastname"]');
    this.email = page.locator('[id="input-email"]');
    this.password = page.locator('[id="input-password"]');
    this.agreeBtn = page.locator('[name="agree"]');
    this.continueBtn = page.getByRole("button", { name: "Continue" });
  }
}

module.exports = { RegistrationPage };
