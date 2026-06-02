const { Given, When, Then, setDefaultTimeout } = require('@cucumber/cucumber');
setDefaultTimeout(60 * 1000);

const { PageObjectManagerPage } = require('../../pageObjects/PageObjectManagerPage');
const { expect, page } = require('@playwright/test');
const playwright = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../../utils/placeOrderTestData1.json')));


Given('a login to Ecommerce application with valid credentials', async function () {
  

  const loginPageObject = this.poManagerObject.getLoginPage();
  await loginPageObject.navigateToURL(testData.url);
  await loginPageObject.validLogin(testData.username, testData.password);
});

When('add  {string} to cart', async function (string) {
  const dashboardPageObject = this.poManagerObject.getdashboardPage();
  await dashboardPageObject.searchProduct(testData.productName);
  await dashboardPageObject.navigateToCart();
});

Then('verify {string} is displayed on Cart Page', async function (string) {
  const cartPageObject = this.poManagerObject.getcartPage();
  await cartPageObject.verifyProductOnCehckoutPage();
  await cartPageObject.clickOnCheckOutButton();
});

When('enter valid details and place the order', async function () {
  const checkoutPageObject = this.poManagerObject.getcheckoutPage();
  this.orderId = await checkoutPageObject.checkoutDetails(testData.countryCode, testData.countryName, testData.username);
  await checkoutPageObject.clickOnMyOrders();
});

Then('verify order is present on Order History Page', async function () {
  const orderDetailsObject = this.poManagerObject.getorderdetailsPage();
  await orderDetailsObject.orderDetails(this.orderId);
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password1) {
  const userName = this.page.locator("input#username");
  const password = this.page.locator("[name='password']");
  const signIn = this.page.locator("[id='signInBtn']");
  this.page.locator("[id='signInBtn']").screenshot({ path: 'locator.jpeg' });
  const cardTitles = this.page.locator(".card-body a");
  await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await this.page.title());
  //page.locator('input#username').type("sardar");
  await userName.fill(username);
  await password.fill(password1);
  await signIn.click();
});

Then('verify error message is displayed', async function () {
  let actualErrorMessage = await this.page.locator("[style*='block']").textContent();
  console.log(actualErrorMessage);
  await expect(this.page.locator("[style*='block']")).toContainText('Incorrect username/password.');
  await expect(actualErrorMessage).toEqual('Incorrect username/password.');
});
