class DashboardPage {
    constructor(page1) {
      this.page = page1;
      this.dashboardElement = page1.locator('[class="hidden md:block text-3xl font-medium tracking-tight"]'); 
    }
  }
  
  module.exports = { DashboardPage };
