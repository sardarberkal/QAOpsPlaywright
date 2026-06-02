import {test,expect} from '@playwright/test'

test('Playwright special locators', async ({page})=>{

    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill("sardar");
    //await page.locator("[value='Submit']").click();
    await page.getByRole("button",{name:'Submit'}).click();
    console.log(await page.getByText('Success! The Form has been submitted successfully!.').isVisible());
    await page.getByRole("link",{name:'Shop'}).click();
    await page.locator("img.card-img-top").first().waitFor();
    //await page.getByRole("link",{name:'Nokia Edge'}).click();

    await page.locator("app-card").filter({hasText:'Nokia Edge '}).getByRole("button",{name:'Add'}).click();
    
    //await page.pause();
});