class ShopHomePage {
  constructor(page) {
    this.page = page;
    this.myAccountLink = page.getByRole("link", { name: " My Account " });
    this.registerLink = page.getByRole("link", { name: "Register" });
  }
}

module.exports = { ShopHomePage };
