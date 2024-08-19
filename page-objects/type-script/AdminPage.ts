import { expect, Page, Locator } from "@playwright/test";

export class AdminPage {
  private page: Page;
  private continuebtn: Locator;
  private adminHeadingTxt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continuebtn = page.getByRole("link", { name: "Continue" });
    this.adminHeadingTxt = page.locator("h1");
  }

  async verifyUserRegistration(adminTxt: string): Promise<void> {
    await expect(this.continuebtn).toBeVisible();
    await expect(this.adminHeadingTxt).toContainText(adminTxt);
  }
}
