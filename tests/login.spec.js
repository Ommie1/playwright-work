const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");
const { chromium } = require('playwright');
const userData = JSON.parse(
  JSON.stringify(require("../test-data/userTestData.json"))
);


let loginPage;
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
});

// Close the page after each test
test.afterEach(async () => {
  await page1.close();
});

test("@Smoke Verify that user sign-in functionality.", async () => {
  // Enter email address 
  await loginPage.emailField.fill("umair.hassan@mailinator.com")
  // Click on continue with email button
  await loginPage.emailBtn.click()
  // Click on continue button
  await loginPage.continueBtn.click()
  // Open new tab for retrieve OTP
  page2 = await context.newPage();
  await page2.goto(userData.mailServer);
  // Get email subject text
  const emailText = await page2.locator('[class="ng-binding"]').nth(2).textContent()
  // Retrieve OTP text
  const otp = emailText.slice(-23);
  console.log(otp)

});






















// // Open Browser before each test
// test.beforeEach(async ({ browser }) => {
//   page1 = await browser.newPage();
//   await page1.goto(userData.URL);
//   loginPage = new LoginPage(page1);
// });

// // Close the page after each test
// test.afterEach(async () => {
//   await page1.close();
// });

// test("@Smoke Verify that user sign-in functionality.", async ({browser}) => {
//   await loginPage.emailField.fill("umair.hassan@mailinator.com")
//   await loginPage.emailBtn.click()
//   await loginPage.continueBtn.click()
//   await page1.waitForTimeout(5000);
//   page2 = await browser.newPage();
//   await page2.goto(userData.mailServer)
//   await page1.waitForTimeout(5000);




//   // page2 = await browser.newPage();
//   // await page.goto(userData.mailServer);

//   // const browser = await chromium.launch({ headless: false });
//   // const context = await browser.newContext();
//   // const page2 = await context.newPage();
//   // await page2.goto(userData.mailServer);
//   // await page.waitForTimeout(5000);

 
//   // await loginPage.validLogin(userData.number, userData.password);
//   // await expect(dashboardPage.dashboardText).toContainText("UAN: 111-832-682");
// });


