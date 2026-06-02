const {LoginPage}=require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {CheckoutPage} = require('./CheckoutPage');
const {OrderDetailsPage} = require('./OrderDetailsPage');

class PageObjectManagerPage{

    constructor(page,productName){
        this.page=page;
        this.productName=productName;
        this.loginPageObject = new LoginPage(this.page);
        this.dashboardPageObject = new DashboardPage(this.page);
        this.cartPageObject = new CartPage(this.page, this.productName);
        this.checkoutPageObject = new CheckoutPage(this.page);
        this.orderDetailsObject = new OrderDetailsPage(this.page);
    }
    getLoginPage(){
        return this.loginPageObject;
    }
    getdashboardPage(){
        return this.dashboardPageObject;
    }
    getcartPage(){
        return this.cartPageObject;
    }
    getcheckoutPage(){
        return this.checkoutPageObject;
    }
    getorderdetailsPage(){
        return this.orderDetailsObject;
    }

}

module.exports = {PageObjectManagerPage};