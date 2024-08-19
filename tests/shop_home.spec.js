const { test } = require("@playwright/test");
const { chromium } = require("playwright");
const shopData = JSON.parse(
  JSON.stringify(require("../test-data/shopData.json"))
);
const { faker } = require("@faker-js/faker");
require("dotenv").config();
const { PageObjectManager } = require("../page-objects/PageObjectManager");

let browser;
let context;
let page;
let pageObjectManager;

// Generate a first name
const firstName = faker.person.firstName();
// Generate a last name
const lastName = faker.person.lastName();
// Generate a fake email address
const email = faker.internet.email();
// Generate a random password
const password = faker.internet.password();

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
  try {
    // Goto registration page
    await pageObjectManager.getShopHomePage().gotoRegistrationPage();
    // User perform registration
    await pageObjectManager
      .getRegistrationPage()
      .userRegistration(firstName, lastName, email, password);
    // user complete registration process
    await pageObjectManager
      .getAdminPage()
      .verifyUserRegistration(shopData.adminPageHeadingTxt);
  } catch (error) {
    console.error("Failed to open site:", error);
    throw error;
  }
});
