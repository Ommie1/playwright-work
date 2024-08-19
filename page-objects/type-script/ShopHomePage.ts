import { Page, Locator } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class ShopHomePage {
  private page: Page;
  private myAccountLink: Locator;
  private registerLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.myAccountLink = page.getByRole("link", { name: " My Account " });
    this.registerLink = page.getByRole("link", { name: "Register" });
  }

  // Go to the site
  async gotoSite(): Promise<void> {
    const baseUrl = process.env.BASE_URL as string;
    await this.page.goto(baseUrl);
  }

  // Go to the registration form
  async gotoRegistrationPage(): Promise<void> {
    await this.myAccountLink.click();
    await this.registerLink.click();
  }
}
