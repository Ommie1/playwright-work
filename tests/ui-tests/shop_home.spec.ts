import { test, Browser, BrowserContext, Page } from "@playwright/test";
import { chromium } from "playwright";
const shopData = JSON.parse(
  JSON.stringify(require("../../test-data/shopData.json"))
);
import { faker } from "@faker-js/faker";
import { PageObjectManager } from "../../page-objects/PageObjectManager";
import dotenv from "dotenv";

dotenv.config();

let browser: Browser | undefined;
let context: BrowserContext | undefined;
let page: Page | undefined;
let pageObjectManager: PageObjectManager | undefined;

// Generate a first name
const firstName: string = faker.person.firstName();
// Generate a last name
const lastName: string = faker.person.lastName();
// Generate a fake email address
const email: string = faker.internet.email();
// Generate a random password
const password: string = faker.internet.password();

test.beforeEach(async () => {
  try {
    // Launch the browser
    browser = await chromium.launch({ headless: false });
    // Create a new browser context
    context = await browser.newContext();
    // Open the tab (page)
    page = await context.newPage();
    // Create POM manager class instance
    pageObjectManager = new PageObjectManager(page);
    // Open shop application
    await pageObjectManager.getShopHomePage().gotoSite();
  } catch (error) {
    console.error("Failed to open site:", error);
    throw error;
  }
});

// Close the page after each test
test.afterEach(async () => {
  try {
    if (context) {
      await context.close();
    }
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

test("@user-registration verify that user is able to get register on eshop", async () => {
  if (!pageObjectManager) {
    throw new Error("PageObjectManager not initialized");
  }
  
  try {
    // Go to the registration page
    await pageObjectManager.getShopHomePage().gotoRegistrationPage();
    // User performs registration
    await pageObjectManager
      .getRegistrationPage()
      .userRegistration(firstName, lastName, email, password);
    // Verify user registration process
    await pageObjectManager
      .getAdminPage()
      .verifyUserRegistration(shopData.adminPageHeadingTxt);
  } catch (error) {
    console.error("Failed to complete registration process:", error);
    throw error;
  }
});
