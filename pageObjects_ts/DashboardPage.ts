import { test, expect,Page, Locator } from '@playwright/test';

export class DashboardPage{

    page:Page;
    products:Locator;
    productTexts:Locator;
    cart:Locator;

    constructor(page:Page){

        this.page= page;
        this.products = page.locator(".card-body");
        this.productTexts = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
    }

   async searchProduct(productName:string){
            
           await this.productTexts.first().waitFor();
           const titles:any = await this.productTexts.allTextContents();
           console.log(titles); 
           const count:number = await this.products.count();
           for (let i = 0; i < count; ++i) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                 //add to cart
                 await this.products.nth(i).locator("text= Add To Cart").click();
                 break;
              }
           }
    }

    async navigateToCart(){
        await this.cart.click();
    }
}

module.exports={DashboardPage};