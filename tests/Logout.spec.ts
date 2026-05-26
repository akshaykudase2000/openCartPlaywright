
/**
 * Test Case: User Logout
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify 'My Account' page
 * 5) Click on Logout link
 * 6) Click on Continue button
 * 7) Verify user is redirected to Home Page
 */

import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { Homepage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { LogoutPage } from '../pages/LogoutPage';

// Declare shared variables
let config: TestConfig;
let homePage: Homepage;
let myaccount: MyAccountPage;
let login: LoginPage;
let logout: LogoutPage;

// Setup before each test
test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl); // Step 1: Navigate to app URL

    // Initialize page objects
    homePage = new Homepage(page);
    myaccount = new MyAccountPage(page);
    login = new LoginPage(page);
    logout = new LogoutPage(page);
});

test.afterEach(async ({ page }) => {
    await page.close();
});

test("User Logout Test @master @regresion", async () => {

    // Step 2: Navigate to Login page
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    // Step 3: Perform login using valid credentials
    await login.login(config.email, config.password);

    // Step 4: Verify successful login
    expect(await myaccount.isMyAccountPageExists()).toBeTruthy();

    //Step 5: Click Logout, which returns LogoutPage instance
    logout = await myaccount.clickonLogoutPage();

    //Step 6: Verify "Continue" button is visible before clicking
    expect(await logout.isContinueButtonVisible()).toBe(true);

    // Step 7: Click Continue and verify redirection to HomePage
    homePage = await logout.clickContinue();
    expect(await homePage.isHomePageExists()).toBe(true);
})

