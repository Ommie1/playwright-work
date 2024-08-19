import { ShopHomePage } from "../ShopHomePage";
import { RegistrationPage } from "../RegistrationPage";
import { AdminPage } from "../AdminPage";

export class PageObjectManager {
  private page: any;
  private shopHomePage?: ShopHomePage;
  private registrationPage?: RegistrationPage;
  private adminPage?: AdminPage;

  constructor(page: any) {
    this.page = page;
  }

  getShopHomePage(): ShopHomePage {
    if (!this.shopHomePage) {
      this.shopHomePage = new ShopHomePage(this.page);
    }
    return this.shopHomePage;
  }

  getRegistrationPage(): RegistrationPage {
    if (!this.registrationPage) {
      this.registrationPage = new RegistrationPage(this.page);
    }
    return this.registrationPage;
  }

  getAdminPage(): AdminPage {
    if (!this.adminPage) {
      this.adminPage = new AdminPage(this.page);
    }
    return this.adminPage;
  }
}
