const base = require('@playwright/test');

exports.customTest = base.test.extend({
    
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