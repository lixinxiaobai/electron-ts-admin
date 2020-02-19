import request from "./request";

/**
 * 客户车辆列表
 */
export default class CustomerCar {

    /**
     * 获取所有客户车辆
     * @returns {AxiosPromise<any>}
     */
    static list = (plate_number:string) => {
        return request.get('customer_truck/list',{
            params: {
                plate_number
            }
        })
    };

}