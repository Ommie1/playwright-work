const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const shopData = JSON.parse(
  JSON.stringify(require("../test-data/shopData.json"))
);
const { faker } = require("@faker-js/faker");
require("dotenv").config();
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
  const baseUrl = process.env.BASE_URL;
  await page.goto(baseUrl);
});

// Close the page after each test
test.afterEach(async () => {
  await context.close();
  await browser.close();
});

test("@user-registration verify that user is able to get register on eshop", async () => {
  // Goto user registraton page
  await shopHomePage.gotoRegistrationPage();
  // Add user details
  await registrationPage.userRegistration(firstName, lastName, email, password);
  // Confirm user registration
  await adminPage.verifyUserRegistration(shopData.adminPageHeadingTxt)
});
