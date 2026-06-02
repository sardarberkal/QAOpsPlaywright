const { test, expect } = require('@playwright/test');

class OrderDetailsPage {

    constructor(page) {

        this.page = page;
        this.tBodylocator = page.locator("tbody");
        this.tBodytrlocator = page.locator("tbody tr");
        this.orderIdDetails = page.locator(".col-text");
    }

    async orderDetails(orderId) {

        await this.tBodylocator.waitFor();
        const rows = await this.tBodytrlocator;

        for (let i = 0; i < await rows.count(); ++i) {
            const rowOrderId = await rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId)) {
                await rows.nth(i).locator("button").first().click();
                break;
            }
        }

        const orderIdDetails = await this.orderIdDetails.textContent();
        console.log(orderIdDetails);
        expect(orderId.includes(orderIdDetails)).toBeTruthy();
    }
}

module.exports = { OrderDetailsPage };