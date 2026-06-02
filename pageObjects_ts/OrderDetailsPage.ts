import { test, expect,Page, Locator } from '@playwright/test';

export class OrderDetailsPage {

    page:Page;
    tBodylocator:Locator;
    tBodytrlocator:Locator;
    orderIdDetails:Locator;


    constructor(page:Page) {

        this.page = page;
        this.tBodylocator = page.locator("tbody");
        this.tBodytrlocator = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async orderDetails(orderId:any) {

        await this.tBodylocator.waitFor();
        const rows:any = await this.tBodytrlocator;

        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId:any  = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }

        const orderIdDetails:any = await this.orderIdDetails.textContent();
        console.log(orderIdDetails);
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
}

module.exports = { OrderDetailsPage };