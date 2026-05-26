/**
 * Test Case: End-to-End Test on Demo E-commerce Application
 *
 * Purpose:
 * This test simulates a complete user flow on an e-commerce site.
 * 
 * Steps:
 * 1) Register a new account
 * 2) Logout after registration
 * 3) Login with the same account
 * 4) Search for a product and add it to the shopping cart
 * 5) Verify cart contents
 * 6) Attempt checkout (disabled since feature isn't available on demo site)
 */

import { test, expect, Page } from '@playwright/test';
import { TestConfig } from '../test.config';
import { Homepage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { SearchProductResultPage } from '../pages/SearchProductResults';
import { ProductPage } from '../pages/ProductPage';
import { LogoutPage } from '../pages/LogoutPage';
import { ShoopinCartPage } from '../pages/ShooppingCartPage';
import { RandomDataUtils } from '../utils/randomDataGenrator';

// This is the main test block that runs the entire flow

test("Execue End-to-End flow @end-to-end", async ({ page }) => {
    const config = new TestConfig();
    // Navigate to the application's home page

    await page.goto(config.appUrl);

    // Step 1: Register a new account and capture the generated email
    let registeredEmail: string = await performRegistration(page);
    console.log("✅ Registration is completed!");

    // Step 2: Logout after successful registration
    await performLogout(page);
    console.log("✅ Logout is completed!");

    // Step 3: Login with the registered email
    await performLogin(page, registeredEmail);
    console.log("✅ Login is completed!");

    // Step 4: Search for a product and add it to the cart
    await addTocart(page);
    console.log("✅ Product added to cart!");

    // Step 5: Verify the contents of the shopping cart
    await verifyShoopingCart(page);
    console.log("✅ Shopping cart verification completed!");

    // Step 6: Perform checkout (skipped for demo site)
    // await performCheckout(page);

});

// Function to register a new user account
async function performRegistration(page: Page): Promise<string> {
    const homePage = new Homepage(page);
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    const registrationPage = new RegistrationPage(page);
    // Fill in random user details
    await registrationPage.setFirstName(RandomDataUtils.getFirstName());
    await registrationPage.setLastName(RandomDataUtils.getLastName());

    let email: string = RandomDataUtils.getEmail()
    await registrationPage.setEmail(email);
    await registrationPage.setTelephone(RandomDataUtils.getPhoneNumber());

    await registrationPage.setPassword("sachin123");
    await registrationPage.setConfirmPassword("sachin123");

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    // Validate that the registration was successful
    const confirmationMsg = await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

    return email; // Return the email for later use in login   

}

// Function to log out the current user
async function performLogout(page: Page) {

    const myAccountPage = new MyAccountPage(page);
    const logoutPage: LogoutPage = await myAccountPage.clickonLogoutPage();

    // Ensure the "Continue" button is visible
    expect(await logoutPage.isContinueButtonVisible()).toBe(true);

    // Click "Continue" and verify redirection to HomePage
    const homePage = await logoutPage.clickContinue();
    expect(await homePage.isHomePageExists()).toBe(true);

}

// Function to log in using the registered email

async function performLogin(page: Page, email: string) {
    const config = new TestConfig();
    await page.goto(config.appUrl);

    const homePage = new Homepage(page);
    await homePage.clickMyAccount();
    await homePage.clickLogin();

    const loginPage = new LoginPage(page);
    await loginPage.login(email, "sachin123");

    // Verify login by checking My Account page
    const myAccountPage = new MyAccountPage(page);
    expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy();
}

// Function to search for a product and add it to cart
async function addTocart(page: Page) {
    const homePage = new Homepage(page);

    const config = new TestConfig();
    const productName: string = config.productName;
    const productQuantity: string = config.productQuantity;

    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    const searchResultsPage = new SearchProductResultPage(page);
    // Validate search results page
    expect(await searchResultsPage.isSearchResultPageExists()).toBeTruthy();
    // Validate that the desired product exists in the results
    expect(await searchResultsPage.isProuductExists(productName)).toBeTruthy();
    // Select product and set quantity
    const productPage = await searchResultsPage.selectProduct(productName);
    await productPage?.setQuantity(productQuantity);
    await productPage?.AddToCart();

    await page.waitForTimeout(3000);

    // Confirm product was added
    expect(await productPage?.isConfirmationMessageVisible()).toBe(true)

}
// Function to verify the shopping cart details
async function verifyShoopingCart(page: Page) {
    const productPage = new ProductPage(page);
    // Navigate to shopping cart from product page
    await productPage.clickItemsToNavigateToCart();
    const shoppingCartPage: ShoopinCartPage = await productPage.clickonViewCart();
    console.log("🛒 Navigate to shooping Cart Page");

    const config = new TestConfig();

    // Validate that total price is correct (based on config)
    expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);
}
// Function to perform checkout (disabled for demo site)
async function performCheckout(page: Page) {
    // Checkout feature is not implemented since it's a demo site.
    // Place your checkout flow logic here if backend is available.
}