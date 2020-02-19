import request from "./request";


/**
 * 原料订单
 */
export default class Print {

    /**
     * 获取打印模板
     * @param orderId
     * @returns {AxiosPromise<any>}
     */
    static getTpl(scene:number){
        return request.get('print_template/getTpl', {
            params:{
                scene
            }
        })
    }

}