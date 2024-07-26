class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailField = page.locator('[type="email"]');   
      this.emailBtn = page.locator('[id="email-btn"]');
      this.continueBtn = page.locator('[name="submit"]');
      this.otpEmail = page.locator('[class="ng-binding"]');
      this.otpField = page.locator('[name="vcode"]');
    }
  }
  
  module.exports = { LoginPage };
