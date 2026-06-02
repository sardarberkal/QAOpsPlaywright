const {test, expect,request}=require('@playwright/test');
const {API_Utils} = require('../utils/API_Utils');
const loginPayload ={userEmail:'anshika@gmail.com',userPassword:'Iamking@000'};
const orderPayLoad =  {orders:[{country:"Cuba",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
//{orders:[{country:"Cuba",productOrderedId:"67a8dde5c0d3e6622a297cc8"}]};
let token;
let orderId;

let response;

test.beforeAll( async()=>{
    
  const apiContext = await request.newContext();  
  const apiUtils = new API_Utils(apiContext,loginPayload);
   response=await apiUtils.createOrder(orderPayLoad);

    
});



test("WebUI woth API integration Test",async ({page})=>{
   
   await page.addInitScript(value =>{

        window.localStorage.setItem('token',value);
   },response.token);
   ;
   await page.goto("https://rahulshettyacademy.com/client");
    const productName = 'ZARA COAT 3';
   
 //await page.pause();
   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");

   for( let i=0; i<await rows.count(); ++i){
      const rowOrderId= await rows.nth(i).locator("th").textContent();
      if(response.orderId.includes(rowOrderId)){
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   
   const orderIdDetails = await page.locator(".col-text").textContent();
   //await page.pause();
   expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
   console.log(orderIdDetails);
   });