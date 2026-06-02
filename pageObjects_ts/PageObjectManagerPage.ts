import { Page } from "@playwright/test";
import {LoginPage} from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrderDetailsPage } from "./OrderDetailsPage";

export class PageObjectManagerPage{

    
    page:Page;
    productName:string;
    loginPageObject:LoginPage;
    dashboardPageObject:DashboardPage;
    cartPageObject:CartPage;
    checkoutPageObject:CheckoutPage;
    orderDetailsObject:OrderDetailsPage;

    constructor(page:Page,productName:string){
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