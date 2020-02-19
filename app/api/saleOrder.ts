import request from "./request";

export type getOrderInfoType='card_no'|'plate_number'|'id'|'order_number';

/**
 * 销售订单
 */
export default class SaleOrder {

    static register(formData:any){
        let newFormData = Object.assign({}, formData);
        return request.post('pound/register', newFormData)
    }

    // 结算
    static settlement(formData:any){
        let newFormData = Object.assign({}, formData);
        return request.post('pound/settlement', newFormData)
    }

    static change(formData:any){
        let newFormData = Object.assign({}, formData);
        return request.post('sale_order/change', newFormData)
    }

    // 排队内容
    static lineup(){
        return request.get('sale_order/groupLineUp');
    }

    // 订单列表
    static list(searchForm:any, paginate:any, sort = {}){
        return request.get('sale_order/list',{
            params: Object.assign({}, searchForm, paginate, sort)
        });
    }

    /**
     * 获取订单信息
     * @param type card_no|plate_number|id|order_number
     * @param value
     * @param has_settle
     * @returns {AxiosPromise<any>}
     */
    static getOrderInfo(type:getOrderInfoType, value:string, has_settle:1|0 = 0){
        return request.get('sale_order/getOrderInfo',{
            params:{
                type,
                value,
                has_settle
            }
        })
    }

    /**
     * 递增打印次数
     * @param {int} orderId 
     */
    static printTime(orderId:number, type = 'out'){
        return request.post('sale_order/printTime',{
            id:orderId,
            type
        })
    }


    /**
     * 报表
     * @param {int} orderId 
     */
    static report(searchForm:any){
        return request.get('sale_order/report',{
            params:searchForm
        })
    }

    /**
     * 新增授权记录
     * @param {*} order_number 
     * @param {*} note 
     */
    static addAuthRecord(order_number:string, note:string){
        return request.post('sale_order/addAuthRecord',{
            order_number,
            note
        })
    }
}