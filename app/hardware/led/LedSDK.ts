import defaultConfig from "./default";
import SDK from './loadDll';
const iconv = window.require("electron").remote.require("iconv-lite") as typeof import("iconv-lite");

export default class LEDSDK {
    ip:string = "";
    defaults:any = {};
    constructor(ip:string, instanceConfig = {}){
        this.ip = ip;
        this.defaults = Object.assign({}, defaultConfig, instanceConfig);
    }

    SendCollectionData_Net(uid:number, content:string, instanceConfig = {}){
        let string = content ? iconv.encode(content, 'gb2312') : '';
        let configs = Object.assign({}, this.defaults, instanceConfig);
        SDK.SendCollectionData_Net(
            string,
            this.ip,
            configs.NetProtocol,
            uid,
            configs.FontColor,
            configs.FontBody,
            configs.FontSize);
        return this;
    }

}


// // led对象
// function LEDSDK(instanceConfig) {
//     this.defaults = instanceConfig;
//     return this;
// }
//
// /**
//  * 创建实例
//  */
// function createInstance(defaultConfig) {
//     return new LEDSDK(defaultConfig);
// }
//
// // 创建默认配置的实例
// let ledsdk = createInstance(defaultConfig);
//
// /**
//  * 创建实例
//  * @param ip LED的IP地址
//  * @param instanceConfig ledsdk的配置项
//  * @returns {ledsdk}
//  */
// ledsdk.create = function (ip, instanceConfig = {}) {
//     createInstance(Object.assign(this.defaults, {CardIP: ip}, defaultConfig, instanceConfig));
//     return this;
// };
//
// /**
//  * 发送实时采集
//  * @param uid   素材ID
//  * @param content  发送内容
//  * @param instanceConfig  发送其他参数
//  * @returns {ledsdk.SendCollectionData_Net}
//  * @constructor
//  */
// ledsdk.SendCollectionData_Net = function (uid, content, instanceConfig = {}) {
//     let string = content ? iconv.encode(content, 'gb2312') : '';
//     let that = createInstance(Object.assign({}, this.defaults, instanceConfig));
//     let configs = that.defaults;
//     SDK.SendCollectionData_Net(
//         string,
//         configs.CardIP,
//         configs.NetProtocol,
//         uid,
//         configs.FontColor,
//         configs.FontBody,
//         configs.FontSize);
//     return this;
// };
//
// /**
//  * 发送内码文字， 网口
//  * @param uid   素材ID
//  * @param content   内容
//  * @param width     区域宽度
//  * @param height    区域高度
//  * @param instanceConfig    其他配置,参考手册
//  * @returns {ledsdk.SendInternalText_Net}
//  * @constructor
//  */
// ledsdk.SendInternalText_Net = function (uid, content, width, height, instanceConfig = {}) {
//     let string = iconv.encode(content, 'gb2312');
//     let that = createInstance(Object.assign({}, this.defaults, instanceConfig));
//     let configs = that.defaults;
//     SDK.SendInternalText_Net(
//         string,
//         configs.CardIP,
//         configs.NetProtocol,
//         width,
//         height,
//         uid,
//         configs.ScreenColor,
//         configs.ShowStyle,
//         configs.ShowSpeed,
//         configs.StopTime,
//         configs.FontColor,
//         configs.FontBody,
//         configs.FontSize,
//         configs.UpdateStyle,
//         configs.PowerOffSave
//     );
//     return this;
// };

// ledsdk.PlayVoice_Net = function(content, RS485Address = '00', RSPort = 3, instanceConfig = {}){
//     let string = iconv.encode(content,'gb2312');
//     let that = createInstance(Object.assign({}, this.defaults, instanceConfig));
//     let configs = that.defaults;
//     SDK.PlayVoice_Net(
//         "a",
//         configs.CardIP,
//         RS485Address,
//         configs.NetProtocol,
//         RSPort
//     );
//     return this;
// }

// module.exports = ledsdk;
// Allow use of default import syntax in TypeScript
// export default ledsdk;



