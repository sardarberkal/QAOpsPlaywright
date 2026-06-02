class LoginPage{


    constructor(page){

        this.page=page;
        this.signInbutton= page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async navigateToURL(url){
        await this.page.goto(url);
    }

      async validLogin(userName, password){

        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.signInbutton.click();
        await this.page.waitForLoadState('networkidle');
    }
}

module.exports ={LoginPage};