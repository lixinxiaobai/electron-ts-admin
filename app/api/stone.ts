import request from "./request";
/**
 * 料类
 */
export default class Stone {

    static getPriceList(customer_id:number){
        return request.get('stone/priceList', {
            params:{
                customer_id
            }
        })
    }


    static all(){
        return request.get('stone/all')
    }


}