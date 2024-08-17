class AdminPage {
  constructor(page) {
    this.page = page;
    this.continuebtn = page.getByRole("link", { name: "Continue" });
    this.adminHeadingTxt = page.locator("h1");
  }
}

module.exports = { AdminPage };
