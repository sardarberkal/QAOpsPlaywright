import { test, expect,Page, Locator } from '@playwright/test';
import { customTest } from '../utils_ts/test-base';
import { PageObjectManagerPage } from '../pageObjects_ts/PageObjectManagerPage';

const testData = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

for (const data of testData) {
  test(`@Web Client App Login for ${data.productName}`, async ({ page }) => {
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
    const orderId :any = await checkoutPageObject.checkoutDetails(data.countryCode, data.countryName, data.username);
    await checkoutPageObject.clickOnMyOrders();

    const orderDetailsObject = poManagerObject.getorderdetailsPage();
    await orderDetailsObject.orderDetails(orderId);




  });

}

customTest(`Client App Login`, async ({page,testDataForOrder}) => {
    const poManagerObject = new PageObjectManagerPage(page, testDataForOrder.productName);

    const loginPageObject = poManagerObject.getLoginPage();
    await loginPageObject.navigateToURL(testDataForOrder.url);
    await loginPageObject.validLogin(testDataForOrder.username, testDataForOrder.password);

    const dashboardPageObject = poManagerObject.getdashboardPage();
    await dashboardPageObject.searchProduct(testDataForOrder.productName);
    await dashboardPageObject.navigateToCart();

    //await page.pause();
    const cartPageObject = poManagerObject.getcartPage();
    await cartPageObject.verifyProductOnCehckoutPage();
    await cartPageObject.clickOnCheckOutButton();

    const checkoutPageObject = poManagerObject.getcheckoutPage();
    const orderId = await checkoutPageObject.checkoutDetails(testDataForOrder.countryCode, testDataForOrder.countryName, testDataForOrder.username);
    await checkoutPageObject.clickOnMyOrders();

    const orderDetailsObject = poManagerObject.getorderdetailsPage();
    await orderDetailsObject.orderDetails(orderId);




  });