class LoginPage {
    constructor(page1) {
      this.page = page1;
      this.emailField = page1.locator('[type="email"]');   
      this.emailBtn = page1.locator('[id="email-btn"]');
      this.continueBtn = page1.locator('[name="submit"]');
      this.otpEmail = page1.locator('[class="ng-binding"]');
      this.otpField = page1.locator('[name="vcode"]');
    }
  }
  
  module.exports = { LoginPage };
