import {test,expect} from '@playwright/test'

test("Calendar action", async({page})=>{

    const month="6";
    const date="15";
    const year="2027";

     const expectedList = [month,date,year];

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").dblclick();
    await page.getByText(year).click();

    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

    //await page.pause();

    const inputs =  page.locator('.react-date-picker__inputGroup__input')
 
    for(let i =0; i<await expectedList.length;i++)
    {
        const value = await inputs.nth(i).inputValue();
        expect(value).toEqual(expectedList[i]);
        console.log(value);
 
    }
 

    //abbr[text()=]
});