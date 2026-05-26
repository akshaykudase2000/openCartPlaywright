
/**
 * Test Case: Add Product to Cart
 * 
 * Tags: @master @regression
 * 
 * Steps:
 * 1. Navigate to application URL
 * 2. Enter an existing product name in the search box
 * 3. Click the search button
 * 4. Verify the product appears in the search results
 * 5. Select the product
 * 6. Set quantity
 * 7. Add the product to the cart
 * 8. Verify the success message
 */
import {test,expect}from '@playwright/test';
import { TestConfig } from '../test.config';
import { Homepage } from '../pages/HomePage';
import { SearchProductResultPage } from '../pages/SearchProductResults';
import { ProductPage } from '../pages/ProductPage';

//shared instance

let config:TestConfig;
let HomePage:Homepage;
let searchProduct:SearchProductResultPage;
let product:ProductPage;

test.beforeEach(async({page})=>{
    config=new TestConfig();
    await page.goto(config.appUrl);

    HomePage=new Homepage(page);
    searchProduct=new SearchProductResultPage(page);
    product=new ProductPage(page);
});

test.afterEach(async({page})=>{
  await page.waitForTimeout(3000)
    await page.close();
})

test("Add Product to Cart @master @regression",async()=>{
   // Step 2: Enter product name in search box
   await HomePage.enterProductName(config.productName);

 // Step 3: Click the search button
   await HomePage.clickSearch();

   // Step 4: Verify search results page is displayed
 expect(await searchProduct.isSearchResultPageExists()).toBeTruthy();

 // Step 5: Verify that the product exists in the results
 const productName=config.productName;
 expect(await searchProduct.isProuductExists(productName)).toBeTruthy();

   // Step 6-7-8: Select product → Set quantity → Add to cart → Verify confirmation
   if(await searchProduct.isProuductExists(productName)){
    await searchProduct.selectProduct(productName);
    await product.setQuantity(config.productQuantity);
    await product.AddToCart();
    
   }
   // Step 8: Assert success message is visible
    expect(await product.isConfirmationMessageVisible()).toBeTruthy();

})