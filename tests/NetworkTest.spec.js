const { test, expect, request } = require('@playwright/test');
const { API_Utils } = require('../utils/API_Utils');
const loginPayload = { userEmail: 'anshika@gmail.com', userPassword: 'Iamking@000' };
const orderPayLoad = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadOrders = { data: [], message: "No Orders" };
//{orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
let token;
let orderId;

let response;

test.beforeAll(async () => {

   const apiContext = await request.newContext();
   const apiUtils = new API_Utils(apiContext, loginPayload);
   response = await apiUtils.createOrder(orderPayLoad);


});



test("Network response intercept using route() method", async ({ page }) => {

   await page.addInitScript(value => {

      window.localStorage.setItem('token', value);
   }, response.token);
   ;
   await page.goto("https://rahulshettyacademy.com/client");
   let body = JSON.stringify(fakePayloadOrders);
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
      async route => {
         const response = await page.request.fetch(route.request());
         await route.fulfill({
            response, body
         });
      }
   )
   // const productName = 'ZARA COAT 3';

   //await page.pause();
   await page.locator("button[routerlink*='myorders']").click();
   await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/620c7bf148767f1f1215d2ca");
   console.log(await page.locator(".mt-4").textContent());



});