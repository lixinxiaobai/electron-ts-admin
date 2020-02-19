/* 引入net模块,火眼臻睛车牌识别TCP底层协议库 */
import * as moment from "moment";
import * as _ from "lodash";
import { Socket } from "net";
import { ivresult } from "./lprresult";
const electron = window.require("electron");
const net = electron.remote.require("net") as typeof import("net");
const iconvLite = electron.remote.require("iconv-lite") as typeof import("iconv-lite");
const fs = electron.remote.require("fs") as typeof import("fs");
const EventEmitter = electron.remote.require("events") as typeof import("events");


const TRIGGER_TYPE_AUTO_BIT		= 1;    //自动
const TRIGGER_TYPE_EXTERNAL_BIT	= 1<<1; //外部
const TRIGGER_TYPE_SOFTWARE_BIT	= 1<<2; //软件
const TRIGGER_TYPE_VLOOP_BIT	= 1<<3; //虚拟地感线圈

class Lpr extends EventEmitter.EventEmitter {

    client:Socket = new net.Socket();
    keepLiveTimer:number = 0;
    clientresult:any;
    totalRecvLength:number;
    currTotalLength:number;
    options:{
        autoSaveImage:boolean;
        saveImagePath:string
    } = {
        autoSaveImage: false,
        saveImagePath: ''
    };

    /**
     *
     * @param ip
     * @param port
     * @param options object {autoSaveImage:true|false, saveImagePath:'string'}
     */
    constructor(ip:string, port = 8131, options = {}) {
        super();
        this.clientresult = null;
        this.totalRecvLength = 0;
        this.currTotalLength = 0;
        this.options = Object.assign({}, this.options, options);
        this.conn(port, ip);
    }

    conn(port:number, ip:string){
        this.client = new net.Socket();
        this.client.setTimeout(10000);
        this.client.setKeepAlive(true);
        /* 设置连接的服务器 */
        this.client.connect(port, ip, () => {
            // JSON.str
            this.sendCmd(this.client, {"cmd": "getsn"});
            this.sendCmd(this.client, {
                "cmd": "ivsresult",
                "enable": true,
                "format": "json",
                "image": true,
                "image_type": 2
            });

            this.sendKeepAlive(this.client);
            this.keepLiveTimer = setInterval(() => {
                this.sendKeepAlive(this.client);
            }, 2000)
        });

        /* 监听服务器传来的data数据 */
        this.client.on("data", (data) => {
            let len = this.convBytesToInt(data, 4);
            if (data[0] === 86 && data[1] === 90) {
                // console.log(data[2]);
                if (data[2] === 0) {
                    let IVSResult = data.slice(8, len + 8);
                    this.totalRecvLength = len;
                    this.currTotalLength = IVSResult.length;
                    this.clientresult = IVSResult;
                    this.handleSubPackage();
                } else {
                    //    console.log(data,"收到心跳包");
                }
            } else {
                this.currTotalLength += data.length;
                this.clientresult = Buffer.concat([this.clientresult, data]);
                this.handleSubPackage();
            }
        })

        /* 监听end事件 */
        this.client.on("end", () => {
            console.log("data end");
            this.conn(port, ip);
        });

        /* 监听end事件 */
        this.client.on("error", (e) => {
            this.emit('error', e.toString());
        });

        /* 监听end事件 */
        this.client.on("timeout", () => {
            this.emit('error', "连接超时");
            this.client.destroy();
        });
    }



    // 手动触发抓拍车牌号
    trigger(options = {}) {
        return new Promise((resolve,reject) =>{
            this.options = Object.assign({}, this.options, options);
            try {
                this.once('trigger_software', ivs => {
                    resolve(ivs);
                });
                this.sendCmd(this.client, {
                    "cmd": "trigger",
                });
            }catch (e) {
                reject(e.toString());
            }
        });

    }

    static formatImgFileName(prefix = "full_") {
        return prefix + moment().format('YYYYMMDDHHmmss') + _.random(100000, 999999) + '.jpg';
    }


    onRecv(data:Buffer) {
        if (data.toString().indexOf("\"cmd\":\"ivs_result\"") !== -1) {  // 说明是车牌识别
            let pos = 0;
            while (true) {
                if (data[pos] == 0) {
                    break;
                }
                pos++;
            }
            
            // let ivs = ;
            let ivs = JSON.parse(iconvLite.decode(data.slice(0, pos), 'GB2312')) as ivresult;
            if (ivs.fullImgSize) {    // 大图
                let bigJpgStart = pos + 1;
                let fullImgData = data.slice(bigJpgStart, ivs.fullImgSize + bigJpgStart);
                if (this.options.autoSaveImage) {
                    let fullImgPath = this.options.saveImagePath + Lpr.formatImgFileName("full_");
                    const writeStream = fs.createWriteStream(fullImgPath);
                    writeStream.write(fullImgData);
                    ivs.fullImgPath = fullImgPath
                }else{
                    ivs.fullImgData = fullImgData;
                }

                if (ivs.clipImgSize) {
                    let smallJpgStart = ivs.fullImgSize + bigJpgStart;
                    let clipImgData = data.slice(smallJpgStart, ivs.clipImgSize + smallJpgStart);
                    if (this.options.autoSaveImage) {
                        let clipImgPath = this.options.saveImagePath + Lpr.formatImgFileName("clip_");
                        const writeStream = fs.createWriteStream(clipImgPath);
                        writeStream.write(clipImgData);
                        ivs.clipImgPath = clipImgPath;
                    }else{
                        ivs.clipImgData = clipImgData;
                    }
                }
            }
            this.emit("ivs_result", ivs);   // 所有触发
            if(ivs.PlateResult.triggerType === TRIGGER_TYPE_VLOOP_BIT){
                // 视频触发
                this.emit("trigger_vloop",ivs);
            }
            if(ivs.PlateResult.triggerType === TRIGGER_TYPE_SOFTWARE_BIT){
                // 手动触发
                this.emit("trigger_software",ivs);
            }
            if(ivs.PlateResult.triggerType === TRIGGER_TYPE_EXTERNAL_BIT){
                // IO触发
                this.emit("trigger_external",ivs);
            }
            if(ivs.PlateResult.triggerType === TRIGGER_TYPE_AUTO_BIT){
                // 自动触发
                this.emit("trigger_auto",ivs);
            }
        }
    }

    // 处理分包
    handleSubPackage() {
        if (this.currTotalLength === this.totalRecvLength) {
            this.onRecv(this.clientresult);
            this.totalRecvLength = 0;
            this.currTotalLength = 0;
            this.clientresult = "";
        }
    }

    close() {
        window.clearInterval(this.keepLiveTimer);
        this.client.destroy();
    }


    sendKeepAlive(client:Socket) {
        try {
            let buff:any;
            buff = ['86', '90', '01', '00', '00', '00', '00', '00'];
            //  byte[] buff = {'V','Z',1,0,0,0,0,0};
            buff = Buffer.from(buff);
            client.write(buff);
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }


    sendCmd(client:Socket, cmd:any) {
        try {
            cmd = JSON.stringify(cmd);
            let len = cmd.length;
            let header:any;
            header = ['86', '90', '00', '00', '00', '00', '00', '00'];
            header = Buffer.from(header);
            header[4] += ((len >> 24) & 0xFF);
            header[5] += ((len >> 16) & 0xFF);
            header[6] += ((len >> 8) & 0xFF);
            header[7] += (len & 0xFF);
            client.write(header.toString());
            client.write(cmd);
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    }


    convBytesToInt(buff:Buffer, offset:number) {
        //4bytes 转为int，要考虑机器的大小端问题
        let len, byteValue;
        len = 0;
        byteValue = (0x000000FF & (buff[offset]));
        len += byteValue << 24;
        byteValue = (0x000000FF & (buff[offset + 1]));
        len += byteValue << 16;
        byteValue = (0x000000FF & (buff[offset + 2]));
        len += byteValue << 8;
        byteValue = (0x000000FF & (buff[offset + 3]));
        len += byteValue;
        return len;
    }
}

export default Lpr;