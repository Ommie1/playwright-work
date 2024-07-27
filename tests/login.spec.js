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

test.setTimeout(600000); // Increase timeout to 60 seconds

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
  await context.close();
  await browser.close();
});

test("Verify that user is able to login", async () => {
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
  await page2.waitForTimeout(5000);
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
  await page1.waitForTimeout(5000);
  await dashboardPage.homeBtn.click();
  // Assert user email on dashboard page
  await expect(dashboardPage.userEmailText).toHaveText(userData.email);
});

test("Verifiy that user is able to open file from file list by using Open in New Tab option", async () => {
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
  await page2.waitForTimeout(5000);
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
  // Goto home page
  await dashboardPage.homeBtn.click();
  await page1.goto(userData.homePageUrl)
  await page1.waitForTimeout(5000);
  // Click on action option
  const documentOptions = dashboardPage.actionIcon;
  await documentOptions.waitFor({ state: 'visible' });
  await documentOptions.click();
  // Click on open new tab option
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    dashboardPage.openNewTabBtn.click()
  ]);
  // Wait for the new tab to load
  await newTab.waitForLoadState();
  // Assertion the valid document link 
  const newTabUrl = newTab.url();
  console.log(newTabUrl)
  expect(newTabUrl).toBe(userData.documentTabUrl);
  // Wait for the new tab to load
  await newTab.waitForLoadState();
  // Wait for document to be loaded
  const spinningElement = newTab.locator('.animate-spin');
  await spinningElement.waitFor({ state: 'hidden' });
  await newTab.waitForTimeout(10000);
});

test("Verifiy that user is able to open file from file list by using preview option", async () => {
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
  await page2.waitForTimeout(5000);
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
  // Goto home page
  await dashboardPage.homeBtn.click();
  await page1.goto(userData.homePageUrl)
  await page1.waitForTimeout(10000);
  // Click on action option
  const documentOptions = dashboardPage.actionIcon;
  await documentOptions.waitFor({ state: 'visible' });
  await documentOptions.click();
  // Click on open new tab option
  const [newTab] = await Promise.all([
    context.waitForEvent('page'),
    dashboardPage.previewBtn.click()
  ]);
  // Wait for the new tab to load
  await newTab.waitForLoadState();
  // Assertion the valid document link 
  const newTabUrl = newTab.url();
  console.log(newTabUrl)
  expect(newTabUrl).toBe(userData.documentTabUrl);
  // Wait for the new tab to load
  await newTab.waitForLoadState();
  // Wait for document to be loaded
  const spinningElement = newTab.locator('.animate-spin');
  await spinningElement.waitFor({ state: 'hidden' });
  await newTab.waitForTimeout(5000);
});

test("Verify that user is able to perform file search", async () => {
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
  await page2.waitForTimeout(5000);
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
  // Goto home page
  await dashboardPage.homeBtn.click();
  await page1.goto(userData.homePageUrl)
  await page1.waitForTimeout(5000);
  // Search file
  await dashboardPage.searchBox.fill(userData.searchText)
  // QA document file should be visible after search
  const qaDocFile = dashboardPage.qaFileDocument;
  // Assert that the qaDocFile is visible
  await expect(qaDocFile).toBeVisible();
  // Doc file should not be visible
  const docFile = dashboardPage.docFile
  // Assert that the qaDocFile is visible
  await expect(docFile).toBeHidden();

});