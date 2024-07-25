const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");
const { DashboardPage } = require("../page-objects/DashboardPage");
const { chromium } = require('playwright');
const userData = JSON.parse(
  JSON.stringify(require("../test-data/userTestData.json"))
);

let loginPage;
let dashboardPage;
let context;
let browser;
let page1
let page2

// Open Browser before each test
test.beforeEach(async () => {
  // Launch the browser
  browser = await chromium.launch({ headless: false });
  // Create a new browser context
  context = await browser.newContext();
  // Open the first tab (page)
  page1 = await context.newPage();
  await page1.goto(userData.URL);
  // Create login page objects instance
  loginPage = new LoginPage(page1);
  // Create dashbord page instance
  dashboardPage = new DashboardPage(page1)
});

// Close the page after each test
test.afterEach(async () => {
  await page1.close();
});

test("@Smoke User login", async () => {
  // Enter email address 
  await loginPage.emailField.fill(userData.email)
  // Click on continue with email button
  await loginPage.emailBtn.click()
  // Click on continue button
  await loginPage.continueBtn.click()
  // Open new tab for retrieve OTP
  page2 = await context.newPage();
  await page2.goto(userData.mailServer);
  // Wait for recent email
  await page2.waitForTimeout(10000);
  // Get email subject text
  const emailSubject = await page2.locator('[class="ng-binding"]').nth(2).textContent()
  // Retrieve OTP text
  const otp = emailSubject.slice(-23);
  console.log(otp)
  // Navigate to previous page
  const pages = context.pages();
  const previousPage = pages[pages.indexOf(page2) - 1];
  await previousPage.bringToFront();
  // Enter OTP
  await loginPage.otpField.fill(otp)
  // Click on continue button
  await loginPage.continueBtn.click()
  // Dashboard page assertion
  const elementText = await dashboardPage.dashboardElement;
  // Perform the assertion on dashboard text
  await expect(elementText).toHaveText(userData.dashboardText);
});
