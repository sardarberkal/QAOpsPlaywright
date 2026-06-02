const { test, expect } = require('@playwright/test');
const { PageObjectManagerPage } = require('../pageObjects/PageObjectManagerPage');
const testData = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

for (const data of testData) {
  test(`Client App Login for ${data.productName}`, async ({ page }) => {
    const poManagerObject = new PageObjectManagerPage(page, data.productName);

    const loginPageObject = poManagerObject.getLoginPage();
    await loginPageObject.navigateToURL(data.url);
    await loginPageObject.validLogin(data.username, data.password);

    const dashboardPageObject = poManagerObject.getdashboardPage();
    await dashboardPageObject.searchProduct(data.productName);
    await dashboardPageObject.navigateToCart();

    //await page.pause();
    const cartPageObject = poManagerObject.getcartPage();
    await cartPageObject.verifyProductOnCehckoutPage();
    await cartPageObject.clickOnCheckOutButton();

    const checkoutPageObject = poManagerObject.getcheckoutPage();
    const orderId = await checkoutPageObject.checkoutDetails(data.countryCode, data.countryName, data.username);
    await checkoutPageObject.clickOnMyOrders();

    const orderDetailsObject = poManagerObject.getorderdetailsPage();
    await orderDetailsObject.orderDetails(orderId);




  });

}