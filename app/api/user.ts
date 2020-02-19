import request, { ApiResponse } from "./request";

export type UserAccess={
    id:number;
    user_id:number;
    access:string;
}

export type UserInfo={
    username:string;
    token:string;
    status:number;
    note:string;
    type:1|2|3; //1 通用  2进料  3 销售
    role:1|2; // 1超级管理员 2普通
    mobile:string;
    department:string;
    last_login_time:string;
    user_access:UserAccess[];
    create_time:string;
    update_time:string;
}
/**
 * 用户api类
 */
export default class User {
    /**
     * 查询列表
     * @param searchForm
     * @param paginate
     * @param sort
     * @returns {AxiosPromise<any>}
     */
    static list = (searchForm:any, paginate:any, sort = {}) => {
        return request.get<any, ApiResponse<UserInfo[]>>('user/index', {
            params: Object.assign({}, searchForm, paginate, sort)
        })
    };

    /**
     * 登录
     * @param formData
     * @returns {AxiosPromise<any>}
     */
    static login = (formData:any) => {
        return request.post<any, ApiResponse<UserInfo>>('user/login', formData)
    };

    /**
     * 修改密码
     * @param formData
     */
    static editpass = (formData:any) => {
        return request.post<any, ApiResponse>('auth/editpass', formData)
    }
}