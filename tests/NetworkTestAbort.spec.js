const {test, expect}=require('@playwright/test');




test("complete Tests",async ({browser})=>{
    
    const context= await browser.newContext();
    const page = await context.newPage();

    //ABort code
    //page.route("**/*.css", route=>route.abort());
    page.route("**/*.{jpg,png,jpeg}", route=>route.abort());
    //abort code completed
    const userName=page.locator("input#username");
    const password=page.locator("[name='password']");
    const signIn=page.locator("[id='signInBtn']");
    const cardTitles=page.locator(".card-body a");
    //logging each request
    page.on('request',request=>console.log(request.url()));
    page.on('response', response=>console.log(response.url(),response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //page.locator('input#username').type("sardar");
    await userName.fill("Sardar");
    await password.fill("password123");
    await signIn.click();
    //await expect(page.locator("[style*='block']").textContent().toHaveText("xyz"));
    let actualErrorMessage=await page.locator("[style*='block']").textContent();
    console.log(actualErrorMessage);
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username/password.');
    await expect(actualErrorMessage).toEqual('Incorrect username/password.');

    await userName.clear();
    await userName.fill("rahulshettyacademy");
    await password.clear();
    await password.fill("Learning@830$3mK2");
    await signIn.click();

    //console.log(await cardTitles.nth(0).textContent());
    //console.log(await cardTitles.first().textContent());
    ////await page.waitForLoadState("networkidle");
    console.log("*************************************");
    await page.locator(".card-body a").last().waitFor();
    let allTitles=await cardTitles.allTextContents();
    console.log(allTitles);


   

    console.log("*************************************");
    for(let i=0; i<allTitles.length; i++){
        console.log(allTitles[i]);
    }




});

test("Page Test",async ({page})=>{

   await page.goto("https://www.google.com");
   await expect(page).toHaveTitle("Google");
   console.log(await page.title());
});

test("CHild Window Handle", async ({browser})=>{

    const context = await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage]=await Promise.all([context.waitForEvent('page'),documentLink.click()]);

    const text= await newPage.locator(".red").textContent();

     //const text= await newPage.locator('p:has-text("Please email us")').textContent();
    console.log(text);
    const domain =text.split("@")[1].split(" ")[0];
    console.log("Domain name is "+domain);
    await page.locator("input#username").type(domain);
    //await page.pause();
    console.log(await page.locator("input#username").inputValue() );
    //await page.pause();
    
});

test("UI controls Test",async ({page})=>{

   
   //const page = await context.newPage();
   await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName=page.locator("input#username");
    const password=page.locator("[name='password']");
    const signIn=page.locator("[id='signInBtn']");

    await userName.fill("rahulshettyacademy");
    
    await password.fill("Learning@830$3mK2");
    console.log( await (page.locator(".radiotextsty").last()).isChecked());
    await page.locator(".radiotextsty").last().click();
    console.log( await (page.locator(".radiotextsty").last()).isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#okayBtn").click();

    await page.locator("#terms").click();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    
    

    const dropdown = page.locator("select.form-control");
    await  expect (page.locator("[href*='documents-request']")).toHaveAttribute('class','blinkingText');
    console.log("Hello");
    //await dropdown.selectOption("consult");
    //await page.pause();   
/*var counter=0;
    for(var j=0; j<dropdown.length; j++){
        counter++;
        console.log(await dropdown.textContent());
    }
    await console.log(counter);
    await signIn.click();
*/
});


