const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");
const { chromium } = require('playwright');
const userData = JSON.parse(
  JSON.stringify(require("../test-data/userTestData.json"))
);

let page;
let loginPage;

// Open Browser before each test
test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto(userData.URL);
  loginPage = new LoginPage(page);
});

// Close the page after each test
test.afterEach(async () => {
  await page.close();
});

test("@Smoke Verify that user sign-in functionality.", async ({}) => {
  await loginPage.emailField.fill("umair.hassan@mailinator.com")
  await loginPage.emailBtn.click()
  await loginPage.continueBtn.click()
  await page.waitForTimeout(5000);
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page2 = await context.newPage();
  await page2.goto(userData.mailServer);
  await page.waitForTimeout(5000);

 
  // await loginPage.validLogin(userData.number, userData.password);
  // await expect(dashboardPage.dashboardText).toContainText("UAN: 111-832-682");
});


