/**
 * Test Case: Account Registration
 * 
 * Tags: @master @sanity @regression
 * 
 * Steps:
 * 1) Navigate to application URL 
 * 2) Go to 'My Account' and click 'Register'
 * 3) Fill in registration details with random data
 * 4) Agree to Privacy Policy and submit the form
 * 5) Validate the confirmation message
 */

import{test,expect} from '@playwright/test';
import { Homepage } from '../pages/HomePage';
import {RegistrationPage} from '../pages/RegistrationPage';
import { RandomDataUtils } from '../utils/randomDataGenrator';
import { TestConfig } from '../test.config';

let homePage:Homepage;
let registrationPage:RegistrationPage;
let config:TestConfig;


test.beforeEach(async({page})=>{
    config=new TestConfig();
    await page.goto(config.appUrl); // //Navigate to application URL
    homePage=new Homepage(page);
    registrationPage=new RegistrationPage(page);
});

test.afterEach(async({page})=>{
    await page.waitForTimeout(3000);
    await page.close();
})


test("User Registration Test @master @sanity @regression",async()=>{

    //Go to My Account And click the 'Register' Link
    await homePage.clickMyAccount();
    await homePage.clickRegister();

    //Fill in registration details with random data
    
    await registrationPage.setFirstName(RandomDataUtils.getFirstName());
    await registrationPage.setLastName(RandomDataUtils.getLastName());
    await registrationPage.setEmail(RandomDataUtils.getEmail());
    await registrationPage.setTelephone(RandomDataUtils.getPhoneNumber());

    const password=RandomDataUtils.getPassword();
    await registrationPage.setPassword(password);
    await registrationPage.setConfirmPassword(password);

    await registrationPage.setPrivacyPolicy();
    await registrationPage.clickContinue();

    //Validate the confirmation Message
    const confirmationMsg=await registrationPage.getConfirmationMsg();
    expect(confirmationMsg).toContain('Your Account Has Been Created!');

   

})