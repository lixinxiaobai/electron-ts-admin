import request from "./request";


/**
 * 原料订单
 */
export default class Media {

    static add(formData:any){
        let newFormData = Object.assign({}, formData);
        return request.post('media/add', newFormData)
    }

    /**
     * 获取订单图片
     * @param orderId
     * @returns {AxiosPromise<any>}
     */
    static list(orderId:number){
        return request.get('media/getPhotos', {
            params:{
                orderId
            }
        })
    }
}