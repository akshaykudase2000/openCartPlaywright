# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Login.spec.ts >> User Login Test
- Location: tests\Login.spec.ts:40:5

# Error details

```
Error: expect(received).toBeTruthy()

Received: false
```

# Test source

```ts
  1  | /**
  2  |  * Test Case: Login with Valid Credentials
  3  |  * 
  4  |  * Tags: @master @sanity @regression
  5  |  * 
  6  |  * Steps:
  7  |  * 1) Navigate to the application URL
  8  |  * 2) Navigate to Login page via Home page
  9  |  * 3) Enter valid credentials and log in
  10 |  * 4) Verify successful login by checking 'My Account' page presence
  11 |  */
  12 | 
  13 | import{test,expect}from '@playwright/test'
  14 | import { Homepage } from '../pages/HomePage';
  15 | import { MyAccountPage } from '../pages/MyAccountPage';
  16 | import { LoginPage } from '../pages/LoginPage';
  17 | import { TestConfig } from '../test.config';
  18 | 
  19 | let config:TestConfig;
  20 | let homePage:Homepage;
  21 | let myAccountPage:MyAccountPage;
  22 | let loginpage:LoginPage;
  23 | 
  24 | // This hook runs before each test
  25 | test.beforeEach(async({page})=>{
  26 |     config=new TestConfig();
  27 |     await page.goto(config.appUrl);
  28 | 
  29 |      // Initialize page objects
  30 |     homePage=new Homepage(page);
  31 |     loginpage=new LoginPage(page);
  32 |     myAccountPage=new MyAccountPage(page);
  33 | 
  34 | });
  35 | 
  36 | test.afterEach(async({page})=>{
  37 |     await page.close();
  38 | });
  39 | 
  40 | test("User Login Test",async()=>{
  41 |      //Navigate to Login page via Home page
  42 |      await homePage.clickMyAccount();
  43 |      await homePage.clickLogin();
  44 | 
  45 |      //Enter valid credentials and log in
  46 |      await loginpage.setEmail(config.email);
  47 |      await loginpage.setPassword(config.password);
  48 |      await loginpage.clickLogin();
  49 | 
  50 |      //aleternately
  51 |     // await loginpage.login(config.email,config.password);
  52 | 
  53 |     //Verify successful login by checking 'My Account' page presence
  54 |     const isLoggedIn=await myAccountPage.isMyAccountPageExists();
> 55 |     expect(isLoggedIn).toBeTruthy();
     |                        ^ Error: expect(received).toBeTruthy()
  56 | 
  57 | })
```