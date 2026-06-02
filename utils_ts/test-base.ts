import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
    url: string;
    countryCode: string;
    countryName: string;
};

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>({
    
    testDataForOrder:
    {
        username: "sardarberkal@gmail.com",
        password: "Maharaj@1",
        productName: "ZARA COAT 3",
        url: "https://rahulshettyacademy.com/client",
        countryCode: "ind",
        countryName: "India"
    }

}

)