import request, { ApiResponse } from "./request";

export interface CustomerSelect{
    name:string,
    pinyin:string,
    id:number
}

export interface CustomerInfo extends CustomerSelect{
    linkman:string;
    contact:string;
    address:string;
    customer_cate_id:number;
    is_forbid:1|0;
    credit:number;
    alarm_value:number;
    balance:number;
    note:string;
    card_no:string;
    is_must_card:1|0;
    create_time:string;
}
/**
 * 客户列表
 */
export default class Customer {

    /**
     * 获取所有客户
     * @returns {AxiosPromise<any>}
     */
    static all = () => {
        return request.get<any, ApiResponse<CustomerSelect[]>>('customer/all')
    };

    static listByCar = (plate_number:string) => {
        return request.get<any, ApiResponse<CustomerInfo>>('customer/carByCustomer',{
            params:{
                plate_number
            }
        })
    }

    /**
     * 绑定IC卡
     */
    static bindCard = (customer_id:number,card_no:string) => {
        return request.post<any, ApiResponse>('customer/bindCard',{
            id:customer_id,
            card_no
        })
    }

    /**
     * 挂失
     */
    static loss = (customer_id:number) => {
        return request.post<any, ApiResponse>('customer/loss',{
            id:customer_id
        })
    }


     /**
     * 调整额度
     */
    static credit = (customer_id:number,credit:string) => {
        return request.post<any, ApiResponse>('customer/credit',{
            id:customer_id,
            credit
        })
    }

    // 根据卡号获取客户
    static readByCard = (card_no:string) => {
        return request.get<any, ApiResponse<CustomerInfo>>('customer/readByCard',{
            params:{
                card_no
            }
        })
    }

}