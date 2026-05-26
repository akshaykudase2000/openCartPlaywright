/**
 * Test Case: Product Search
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Enter the product name in the search field
 * 3) Click the search button
 * 4) Verify if the product is displayed in the search results
 */
import { test, expect } from '@playwright/test';

import { Homepage } from '../pages/HomePage';
import { SearchProductResultPage } from '../pages/SearchProductResults';
import { TestConfig } from '../test.config';

// Declare reusable variables
let config: TestConfig;
let homePage: Homepage;
let searchProduct: SearchProductResultPage;

// Playwright hook - runs before each test

test.beforeEach(async ({ page }) => {
    config = new TestConfig();
    await page.goto(config.appUrl);// Step 1: Navigate to the application

    // Initialize page objects
    homePage= new Homepage(page);
    searchProduct=new SearchProductResultPage(page);

});

// Playwright hook - runs after each test (optional cleanup)
test.afterEach(async ({ page }) => {
    await page.close(); // Closes the browser tab after test
});

test("Serach Pruducts test @@master @regression", async () => {
    const productName = config.productName;

    // Step 2 & 3: Enter product name and click Search
    await homePage.enterProductName(productName);
    await homePage.clickSearch();

    // Step 4: Verify that the search results page is displayed
    expect(await searchProduct.isSearchResultPageExists()).toBe(true);

    // Step 5: Validate if the searched product appears in results
    const isProductFound = await searchProduct.isProuductExists(productName);
    expect(isProductFound).toBeTruthy();

});


