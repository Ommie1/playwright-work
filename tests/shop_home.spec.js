const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const shopData = JSON.parse(
  JSON.stringify(require("../test-data/shopData.json"))
);
const { faker } = require("@faker-js/faker");
const { ShopHomePage } = require("../page-objects/ShopHomePage");
const { RegistrationPage } = require("../page-objects/RegistrationPage");
const { AdminPage } = require("../page-objects/AdminPage");

let browser;
let context;
let page;
let shopHomePage;
let registrationPage;
let adminPage;

// Generate a first name
const firstName = faker.person.firstName();
// Generate a last name
const lastName = faker.person.lastName();
// Generate a fake email address
const email = faker.internet.email();
// Generate a random password
const password = faker.internet.password();

test.beforeEach(async () => {
  // Launch the browser
  browser = await chromium.launch({ headless: false });
  // Create a new browser context
  context = await browser.newContext();
  // Open the tab (page)
  page = await context.newPage();
  // Shop home page class instance
  shopHomePage = new ShopHomePage(page);
  // Registration page class instance
  registrationPage = new RegistrationPage(page);
  // Admin page class instance
  adminPage = new AdminPage(page);
  // Open shop application
  await page.goto(shopData.URL);
});

// Close the page after each test
test.afterEach(async () => {
  await context.close();
  await browser.close();
});

test("@user-registration verify that user is able to get register on eshop", async () => {
  await shopHomePage.myAccountLink.click();
  await shopHomePage.registerLink.click();
  await registrationPage.firstName.fill(firstName);
  await registrationPage.lastName.fill(lastName);
  await registrationPage.email.fill(email);
  await registrationPage.password.fill(password);
  await registrationPage.agreeBtn.click();
  await registrationPage.continueBtn.click();
  await expect(adminPage.continuebtn).toBeVisible();
  await expect(adminPage.adminHeadingTxt).toContainText(shopData.adminPageHeadingTxt);
});
