const { PageObjectManagerPage } = require('../../pageObjects/PageObjectManagerPage');
const { expect, page } = require('@playwright/test');
const playwright = require('@playwright/test');
const testData = JSON.parse(JSON.stringify(require('../../utils/placeOrderTestData1.json')));
const { Before, After, BeforeStep, AfterStep,setDefaultTimeout } = require('@cucumber/cucumber');

Before(/*{tags:"@foo"},*/async function(){
    console.log("Hello");
    this.browser = await playwright.chromium.launch({headless:false});
  const context = await this.browser.newContext();
  this.page = await context.newPage();
  this.poManagerObject = new PageObjectManagerPage(this.page, testData.productName);
});

After(function(){
    console.log("end of program");
});

BeforeStep(function(){
    console.log("Before each step");
});

AfterStep(function(){
    console.log("After each step");
});