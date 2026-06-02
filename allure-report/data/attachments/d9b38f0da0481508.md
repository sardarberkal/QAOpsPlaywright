# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2eFlowPO_Fixtures.spec.js >> @Web Client App Login for ZARA COAT 3
- Location: tests\e2eFlowPO_Fixtures.spec.js:7:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('div li').first() to be visible

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8] [cursor=pointer]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire" [ref=e11] [cursor=pointer]:
      - /url: https://techsmarthire.com/
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
      - listitem [ref=e22] [cursor=pointer]:
        - button "Sign Out" [ref=e23]:
          - generic [ref=e24]: 
          - text: Sign Out
  - generic [ref=e25]:
    - generic [ref=e26]:
      - heading "My Cart" [level=1] [ref=e27]
      - button "Continue Shopping❯" [ref=e28] [cursor=pointer]
    - heading "No Products in Your Cart !" [level=1] [ref=e30]
```

# Test source

```ts
  1  | const {test, expect}=require('@playwright/test');
  2  | 
  3  | class CartPage{
  4  | 
  5  |     constructor(page,productName){
  6  | 
  7  |         this.page= page;
  8  |         this.productList = page.locator("div li");
  9  |         this.checkOutProduct = page.locator("h3:has-text('"+productName+"')");
  10 |         this.checkOutBtn = page.locator("text=Checkout");
  11 |     }
  12 | 
  13 |     async verifyProductOnCehckoutPage(){
> 14 |         await this.productList.first().waitFor();
     |                                        ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  15 |         //await this.page.pause();
  16 |         const bool  =await this.checkOutProduct.isVisible();
  17 |         //await expect(bool).toBeTruthy();
  18 |     }
  19 | 
  20 |     async clickOnCheckOutButton(){
  21 |         this.checkOutBtn.click();
  22 |     }
  23 | }
  24 | 
  25 | module.exports={CartPage};
```