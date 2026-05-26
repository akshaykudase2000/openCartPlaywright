/**
 * Test Case: Login with Valid Credentials
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Navigate to Login page via Home page
 * 3) Enter valid credentials and log in
 * 4) Verify successful login by checking 'My Account' page presence
 */

import{test,expect}from '@playwright/test'
import { Homepage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LoginPage } from '../pages/LoginPage';
import { TestConfig } from '../test.config';

let config:TestConfig;
let homePage:Homepage;
let myAccountPage:MyAccountPage;
let loginpage:LoginPage;

// This hook runs before each test
test.beforeEach(async({page})=>{
    config=new TestConfig();
    await page.goto(config.appUrl);

     // Initialize page objects
    homePage=new Homepage(page);
    loginpage=new LoginPage(page);
    myAccountPage=new MyAccountPage(page);

});

test.afterEach(async({page})=>{
    await page.close();
});

test("User Login Test @master @sanity @regression",async()=>{
     //Navigate to Login page via Home page
     await homePage.clickMyAccount();
     await homePage.clickLogin();

     //Enter valid credentials and log in
     await loginpage.setEmail(config.email);
     await loginpage.setPassword(config.password);
     await loginpage.clickLogin();

     //aleternately
    // await loginpage.login(config.email,config.password);

    //Verify successful login by checking 'My Account' page presence
    const isLoggedIn=await myAccountPage.isMyAccountPageExists();
    expect(isLoggedIn).toBeTruthy();

})