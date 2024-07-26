const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");
const { DashboardPage } = require("../page-objects/DashboardPage");
const { chromium } = require('playwright');
const { MailinatorPage } = require("../page-objects/MailinatorPage");
const userData = JSON.parse(
  JSON.stringify(require("../test-data/userTestData.json"))
);

let loginPage;
let dashboardPage;
let mailinatorPage;
let context;
let browser;
let page1
let page2

test.setTimeout(60000); // Increase timeout to 60 seconds

// Open Browser before each test
test.beforeEach(async () => {
  // Launch the browser
  browser = await chromium.launch({ headless: false });
  // Create a new browser context
  context = await browser.newContext();
  // Open the first tab (page)
  page1 = await context.newPage();
  // await page1.goto(userData.URL);
  // Second tab instance
  page2 = await context.newPage();
  // Create login page objects instance
  loginPage = new LoginPage(page1);
  // Create dashbord page instance
  dashboardPage = new DashboardPage(page1)
  // Create mailinator page instance
  mailinatorPage = new MailinatorPage(page2);

});

// Close the page after each test
test.afterEach(async () => {
  await page1.close();
  await page2.close();
});

test("User login", async () => {
  // Focus on first tab
  await page1.bringToFront();
  // Open application URL
  await page1.goto(userData.URL);
  // Enter email address 
  await loginPage.emailField.fill(userData.email)
  // Click on continue with email button
  await loginPage.emailBtn.click()
  // Click on continue button
  await loginPage.continueBtn.click()
  // Focus on second tab
  await page2.bringToFront();
  // Open mailinator URL
  await page2.goto(userData.mailServer);
  // Wait for recent email to be loaded
  await page2.waitForTimeout(10000);
  // Reload page
  await page2.reload()
  // Get email subject text
  const emailSubjectText = await mailinatorPage.getEmailSubjectText();
  // Retrieve OTP text
  const otp = emailSubjectText.slice(-23);
  // Close the mailinator instance
  await page2.close()
  // Enter OTP
  await loginPage.otpField.fill(otp);
  // Click on continue button
  await loginPage.continueBtn.click();
  // Click on home button
  await page1.waitForTimeout(10000);
  await dashboardPage.homeBtn.click();
  // Assert user email on dashboard page
  await expect(dashboardPage.userEmailText).toHaveText(userData.email);
});

test.only("Navigate to the file list use Open in New Tab option", async () => {
     // Focus on first tab
  await page1.bringToFront();
  // Open application URL
  await page1.goto(userData.URL);
  // Enter email address 
  await loginPage.emailField.fill(userData.email)
  // Click on continue with email button
  await loginPage.emailBtn.click()
  // Click on continue button
  await loginPage.continueBtn.click()
  // Focus on second tab
  await page2.bringToFront();
  // Open mailinator URL
  await page2.goto(userData.mailServer);
  // Wait for recent email to be loaded
  await page2.waitForTimeout(10000);
  // Reload page
  await page2.reload()
  // Get email subject text
  const emailSubjectText = await mailinatorPage.getEmailSubjectText();
  // Retrieve OTP text
  const otp = emailSubjectText.slice(-23);
  // Close the mailinator instance
  await page2.close()
  // Enter OTP
  await loginPage.otpField.fill(otp);
  // Click on continue button
  await loginPage.continueBtn.click();
  // Click on home button
  await page1.waitForTimeout(10000);
  await dashboardPage.homeBtn.click();
   // Click on action option
   const documentOptions = page1.locator('tr:has-text("QA - Automation Task.docx") [data-testid="ellipsis-icon"]');
   await documentOptions.waitFor({ state: 'visible' });
   await documentOptions.click();
   // Click on open new tab option
   const [newTab] = await Promise.all([
   context.waitForEvent('page'),
   page1.locator('#fp-home-recentfiles-recenttable-0-0_actions-open').click()
   ]);
   // Wait for the new tab to load
   await newTab.waitForLoadState();
   // Assertion the valid document link 
   const newTabUrl = newTab.url();
   console.log(newTabUrl)
   expect(newTabUrl).toBe('https://fenixshare.anchormydata.com/fenixpyre/v/QA%20-%20Automation%20Task.docx');
   // Wait for the new tab to load
   await newTab.waitForLoadState();
   // Screenshot
   await newTab.screenshot({ path: 'screenshots/openinnewtab.png' });
});
