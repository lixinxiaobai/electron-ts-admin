import storage from "@/utils/storage";
import * as _ from "lodash";
import {USER_INFO_KEY,USER_TOKEN_KEY} from "@/config/constans";
import { UserInfo } from "@/api/user";

const user = {
    /**
     * 判断是否登陆
     * @return Promise bool
     */
    isLogin: ():boolean => {
        try{
            let result = storage.get(USER_TOKEN_KEY);
            return !_.isEmpty(result);
        }catch(err){
            return false;
        }

    },

    /** 获取用户信息 */
    getUserInfor: ():UserInfo => {
        return storage.get(USER_INFO_KEY);
    },



    /** 获取用户角色 */
    getUserRole: ():UserInfo['role']|boolean => {
        try{
            let result = storage.get(USER_INFO_KEY);
            if(result){
                return result.role;
            }else{
                return false;
            }
        }catch(err){
            return false;
        }
    },

    /**
     * 获取用户权限列表
     * @returns {*}
     */
    getUserAccess: () => {
        try{
            let result = user.getUserInfor();
            if(result){
                return result.user_access;
            }else{
                return [];
            }
        }catch(err){
            return [];
        }
    },

    /**
     * 登陆用户
     * @param userinfo json 用户信息
     */
    login: (userinfo:any) => {
        storage.set(USER_TOKEN_KEY,userinfo.token);
        return storage.set(USER_INFO_KEY,userinfo);
    },

    /** 退出登录 */
    logout: () => {
        storage.remove(USER_TOKEN_KEY);
        return storage.remove(USER_INFO_KEY);
    }
};

export default user;