class DashboardPage {
    constructor(page1) {
      this.page = page1;
      this.userEmailText = page1.locator('[id="user-info-email"]'); 
      this.homeBtn = page1.getByLabel('Home');
      this.actionIcon = page1.locator('[id="radix-:rn:"]');
    }
  }
  
  module.exports = { DashboardPage };
