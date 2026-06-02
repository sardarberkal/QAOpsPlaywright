const {test, expect}=require('@playwright/test');

class CheckoutPage {

    constructor(page) {
        this.page = page;
        this.country = page.getByPlaceholder('Select Country');
        this.countryDropdown = page.locator(".ta-results");
        this.userEmail = page.locator(".user__name [type='text']");
        this.placeOrder = page.locator(".action__submit");
        this.confrimationMessage = page.locator(".hero-primary");
        this.confrimationMessagePlace = page.locator(".em-spacer-1 .ng-star-inserted");
        this.myOrders= page.locator("button[routerlink*='myorders']");
    }

    async checkoutDetails(countryCode,countryName,email) {

        //await this.page.pause();
        await this.country.pressSequentially(countryCode, { delay: 150 })
        const dropdown = this.countryDropdown;
        await dropdown.waitFor();
        const optionsCount = await dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await dropdown.locator("button").nth(i).textContent();
            if (text.trim() === countryName) {
                await dropdown.locator("button").nth(i).click();
                break;
            }
        }

        await expect(this.userEmail.first()).toHaveText(email);
        await this.placeOrder.click();
        //await page.pause();
        await expect(this.confrimationMessage).toHaveText(" Thankyou for the order. ");
        const orderId = await this.confrimationMessagePlace.textContent();
        console.log(orderId);   
        return orderId; 
    }

    async clickOnMyOrders(){
        await this.myOrders.click();
    }
}

module.exports = {CheckoutPage};