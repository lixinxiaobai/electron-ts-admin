import request from "./request";


/**
 * 保存至服务器配置
 */
export default class Config {

    static set(formData:any){
        let newFormData = Object.assign({}, formData);
        return request.post('config/setConfig', {
            config:newFormData
        })
    }


    static get(){
        return request.get('config/getConfig')
    }
}