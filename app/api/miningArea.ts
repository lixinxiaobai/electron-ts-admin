import request from "./request";
/**
 * 矿区
 */
export default class MiningArea {


    static all(){
        return request.get('mining_area/all')
    }


}