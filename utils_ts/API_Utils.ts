export class API_Utils{

    apiContext:any;
    loginPayload:string;

    constructor(apiContext:any,loginPayload:any){
        this.apiContext=apiContext;
        this.loginPayload = loginPayload;
    }

    async getToken(){
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        { 
            data:this.loginPayload
        });
    //expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    let token = loginResponseJson.token;
    console.log(token);
    return token;
    }

    async createOrder(orderPayLoad:string){

        let response ={token:String,orderId:String};
        response.token= await this.getToken();

        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
              {
                 data:orderPayLoad,
                 headers:
                 {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'
                 }
              }
            )
            const orderResponseJson = await orderResponse.json();
            console.log(orderResponseJson);
            let orderId = orderResponseJson.orders[0];
            console.log(orderId);

            response.orderId= orderId;
            return response;
    }
}

module.exports={API_Utils};