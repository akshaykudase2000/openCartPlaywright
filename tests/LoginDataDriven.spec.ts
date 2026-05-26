import{test,expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DataProvider } from '../utils/dataProvider';
import { TestConfig } from '../test.config';
import { MyAccountPage } from '../pages/MyAccountPage';
import { Homepage } from '../pages/HomePage';

//Load JSON test data logindata.json
const jsonPath="testdata/logindata.json";
const jsonTestData=DataProvider.getDataFromJson(jsonPath);

for(const data of jsonTestData){
    test(`Login Test with JSON Data: ${data.testName} @datadriven`,async({page})=>{
        const config=new TestConfig();
        await page.goto(config.appUrl);

        const homePage=new Homepage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginpage=new LoginPage(page);
       await loginpage.login(data.email,data.password);

       if(data.expected.toLowerCase()==='success')
       {
        const myAccountPage=new MyAccountPage(page);
        const isLoggedIn=await myAccountPage.isMyAccountPageExists();
        expect(isLoggedIn).toBeTruthy();
       }
       else
       {
        const errorMessage=await loginpage.getloginErrorMessage();
        expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
       }
    })

}

//Load JSON test data logindata.json
const csvPath="testdata/logindata.csv";
const CsvTestData=DataProvider.getTestDataFromCsv(csvPath);

for(const data of CsvTestData){
    test(`Login Test with CSV Data: ${data.testName} @datadriven`,async({page})=>{
        const config=new TestConfig();
        await page.goto(config.appUrl);

        const homePage=new Homepage(page);
        await homePage.clickMyAccount();
        await homePage.clickLogin();

        const loginpage=new LoginPage(page);
       await loginpage.login(data.email,data.password);

       if(data.expected.toLowerCase()==='success')
       {
        const myAccountPage=new MyAccountPage(page);
        const isLoggedIn=await myAccountPage.isMyAccountPageExists();
        expect(isLoggedIn).toBeTruthy();
       }
       else
       {
        const errorMessage=await loginpage.getloginErrorMessage();
        expect(errorMessage).toBe('Warning: No match for E-Mail Address and/or Password.');
       }
    })

}