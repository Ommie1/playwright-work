const { test, expect } = require("@playwright/test");
const { chromium } = require('playwright');
const shopData = JSON.parse(
  JSON.stringify(require("../test-data/shopData.json"))
);
const { faker } = require('@faker-js/faker');

let browser;
let context;
let page;

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
  // Open shop application
  await page.goto(shopData.URL);
});

// Close the page after each test
test.afterEach(async () => {
  await context.close();
  await browser.close();
});

test("@user-registration verify that user is able to get register on eshop", async () => {
    await page.getByRole('link', { name: ' My Account ' }).click();
    await page.getByRole('link', { name: 'Register' }).click();
    await page.getByPlaceholder('First Name').fill(firstName);
    await page.getByPlaceholder('Last Name').fill(lastName);
    await page.getByPlaceholder('E-Mail').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('link', { name: 'Continue' })).toBeVisible();
    // await expect(page.locator('h1')).toContainText('Your Account Has Been Created!');
    // await page.getByRole('link', { name: 'Continue' }).click();
    // await page.getByRole('link', { name: 'Your Store' }).click();
});
