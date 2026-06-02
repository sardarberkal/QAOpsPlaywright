import { test, expect,Page, Locator } from '@playwright/test';

export class CheckoutPage {

    page:Page;
    country:Locator;
    countryDropdown:Locator;
    userEmail:Locator;
    placeOrder:Locator;
    confrimationMessage:Locator;
    confrimationMessagePlace:Locator;
    myOrders:Locator;

    constructor(page:Page) {
        this.page = page;
        this.country = page.getByPlaceholder('Select Country');
        this.countryDropdown = page.locator(".ta-results");
        this.userEmail = page.locator(".user__name [type='text']");
        this.placeOrder = page.locator(".action__submit");
        this.confrimationMessage = page.locator(".hero-primary");
        this.confrimationMessagePlace = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders= page.locator("button[routerlink*='myorders']");
    }

    async checkoutDetails(countryCode:string,countryName:string,email:string) {

        //await this.page.pause();
        await this.country.pressSequentially(countryCode, { delay: 150 })
        const dropdown :any = this.countryDropdown;
        await dropdown.waitFor();
        const optionsCount:any = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text:string = await dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        await expect(this.userEmail.first()).toHaveText(email);
        await this.placeOrder.click();
        //await page.pause();
        await expect(this.confrimationMessage).toHaveText(" Thankyou for the order. ");
        const orderId:any = await this.confrimationMessagePlace.textContent();
        console.log(orderId);   
        return orderId; 
    }

    async clickOnMyOrders(){
        await this.myOrders.click();
    }
}

module.exports = {CheckoutPage};