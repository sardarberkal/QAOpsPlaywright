import { test, expect,Page, Locator } from '@playwright/test';

export class CartPage{

    page:Page;
    productList:Locator;
    checkOutProduct:Locator;
    checkOutBtn:Locator;

    constructor(page:Page,productName:string){

        this.page= page;
        this.productList = page.locator("div li");
        this.checkOutProduct = page.locator("h3:has-text('"+productName+"')");
        this.checkOutBtn = page.locator("text=Checkout");
    }

    async verifyProductOnCehckoutPage(){
        await this.productList.first().waitFor();
        //await this.page.pause();
        const bool:boolean  =await this.checkOutProduct.isVisible();
        //await expect(bool).toBeTruthy();
    }

    async clickOnCheckOutButton(){
        this.checkOutBtn.click();
    }
}

module.exports={CartPage};