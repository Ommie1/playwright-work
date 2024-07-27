class DashboardPage {
  constructor(page) {
    this.page = page;
    this.userEmailText = page.locator('[id="user-info-email"]');
    this.homeBtn = page.getByLabel('Home');
    this.actionIcon = page.locator('tr:has-text("QA - Automation Task.docx") [data-testid="ellipsis-icon"]')
    this.openNewTabBtn = page.locator('#fp-home-recentfiles-recenttable-0-0_actions-open')
    this.previewBtn = page.locator('#fp-home-recentfiles-recenttable-0-0_actions-preview')
  }
}

module.exports = { DashboardPage };
