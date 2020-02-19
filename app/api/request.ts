import * as qs from 'qs';
import * as _ from "lodash";
import axios, { AxiosResponse} from "axios";
import {STORE_KEY_APIURL, USER_TOKEN_KEY} from "@/config/constans";
import storage from "@/utils/storage";
import {message} from "antd";

export interface ApiResponse<T = any> {
    status:number,
    info:string,
    data:T,
    code?:number
};

// axios.interceptors.response = AxiosInterceptorManager<AxiosResponse>;

axios.defaults.baseURL = "http://" + storage.get(STORE_KEY_APIURL) + "/sale";

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    if (config.method === "post"){
        config.data = qs.stringify(config.data);
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    config.headers['token'] = storage.get(USER_TOKEN_KEY) || '';
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// let responseUse = 
// 添加响应拦截器
axios.interceptors.response.use((response:AxiosResponse) => {
    return response.data;
   // return response.data;
}, function (error) {
    // 处理错误
    if(_.has(error, 'response.status')) {
        switch (error.response.status) {
            case 401:
                error.message = '未授权，请登录';
                break;
            case 403:
                error.message = '拒绝访问';
                break;
            case 405:
                error.message = '请求方式不允许';
                break;
            case 500:
                error.message = '服务器内部错误';
                break;
            case 404:
                error.message = `请求地址不存在：${error.response.config.url}`;
                break;
            default:
                error.message = error.response.data.errorMessage;
        }
    }
    message.error(error.message);
    return Promise.reject(error);
});

export default axios;