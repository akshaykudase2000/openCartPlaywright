import { Page, Locator } from '@playwright/test';
import { count } from 'node:console';
import { ProductPage } from './ProductPage';

export class SearchProductResultPage {
    private readonly page: Page;

    //Locators using css selectors
    private readonly searchPageHeader: Locator;
    private readonly searchProuducts: Locator;

    constructor(page: Page) {
        this.page = page;
        // Initialize locators with CSS selectors
        this.searchPageHeader = page.locator("#content h1");
        this.searchProuducts = page.locator("h4 a");
    }

         /**
         * Verify if the search results page exists by checking the header text
         * @returns Promise<boolean> - true if the search results page exists
         */

         async isSearchResultPageExists():Promise<boolean>
         {
            try{
            const headertext=await this.searchPageHeader.textContent();
            return headertext.includes("Search - ") ?? false;
            }catch(error)
            {
                return false;
            }
         }

     /**
     * Check if a product exists in the search results by its name
     * @param productName - The name of the product to search for
     * @returns Promise<boolean> - true if the product exists
     */

     async isProuductExists(ProductName:string):Promise<boolean>
     {
        try{
            const count=await this.searchProuducts.count();
            for(let i=0;i< count;i++)
            {
                const product= this.searchProuducts.nth(i);
                const title=await product.textContent();
                 if(title===ProductName)
                 {
                    return true;
                 }
            }
        }catch(error){
             console.log(`Error checking product existence: ${error}`);
        }
        return false;
     }
     /**
     * Select a product from the search results by its name
     * @param productName - The name of the product to select
     * @returns Promise<ProductPage> - ProductPage instance after selecting the product
     */
    async selectProduct(productName: string): Promise<ProductPage | null> {
        try {
            const count = await this.searchProuducts.count();
            for (let i = 0; i < count; i++) {
                const product = this.searchProuducts.nth(i);
                const title = await product.textContent();
                if (title === productName) {
                    await product.click();
                    return new ProductPage(this.page);
                }
            }
            console.log(`Product not found: ${productName}`);
        } catch (error) {
            console.log(`Error selecting product: ${error}`);
        }
        return null;
    }


}