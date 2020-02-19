/**
 * 德卡D8读卡器的SDK
 */
import  libm from './loaddll';
import * as _ from 'lodash';
import * as ref from "ref";

class Deka {
    private _icdev:number;

    private _options:{
        port: number,       // 100代表USB
        baud: number     // 为通讯波特率9600～115200
    } = {
        port: 100,       // 100代表USB
        baud: 115200     // 为通讯波特率9600～115200}
    }

    constructor(options = {}){
        this._icdev = 0;    // 串口标识符

        this._options = _.assign(this._options, options);
    }

    getIcdev(){
        return this._icdev;
    }

    // 打开
    open(isbeep = false){
        this._icdev = libm.dc_init(this._options.port, this._options.baud);
        if (this._icdev <= 0) {
            throw new Error('打开端口失败');
        }
        isbeep && libm.dc_beep(this._icdev, 10);
    }

    // 蜂鸣
    beep(){
        libm.dc_beep(this._icdev, 10);
    }

    // 释放资源
    exit(){
        let st = libm.dc_exit(this._icdev);
        if (st !== 0) {
            throw new Error('释放资源失败');
        }
        this._icdev = 0;
    }

    //  巡卡
    request(){
        let handleRef = ref.alloc('uint');
        let st = libm.dc_request(this._icdev, '0', handleRef);
        if (st !== 0) {
            throw new Error('寻卡失败');
        }
        return st;
    }

    /**
     * 装载密码
     * @param SecNr
     * @param Mode
     * @param Nkey
     */
    loadKey(SecNr = 0, Mode = 0, Nkey = 'FFFFFFFFFFFF'){
        let st = libm.dc_load_key_hex(this._icdev, Mode, SecNr, Nkey);
        if (st !== 0) {
            throw new Error('装载卡密失败');
        }
        return st;
    }

    /**
     * 返回卡的序列号
     * @returns {string}
     */
    anticoll() {
        let handleRef = ref.alloc('long');
        let st = libm.dc_anticoll(this._icdev, '0', handleRef);
        if (st !== 0) {
            throw new Error('返回卡的序列号失败');
        }
        return handleRef;
    };

    /**
     * 验校密码
     * @param mode 密码验证模式  默认B密码
     * @param SecNr 扇区号
     * @returns {boolean}
     */
    authentication(SecNr = 10, mode = 4) {
        let st = libm.dc_authentication(this._icdev, mode, SecNr);
        if (st !== 0) {
            throw new Error(`扇区${SecNr}校验密码失败!`);
        }
        return true;
    };

    /**
     * 写入数据
     * @param adr 块地址
     * @param data 要写入的数据
     */
    writeData(data = "0", adr = 41) {
        let handleRef = new Buffer(32);
        handleRef.write(data);
        let st = libm.dc_write(this._icdev, adr, handleRef);
        if (st !== 0) {
            throw new Error(`写卡失败!`);
        }
        return true;
    };

    /**
     * 读取卡内数据
     * @param adr 块地址
     * @returns {string}
     */
    readData(adr = 41) {
        let handleRef = new Buffer(32);

        let st = libm.dc_read_hex(this._icdev, adr, handleRef);
        if (st !== 0) {
            throw new Error(`读卡失败!`);
        }
        return handleRef;
        // console.log(handleRef.toString());
        // return new Buffer(handleRef.toString(), 'hex').toString();
    }

    /**
     * 快速写入数据
     * @param options
     * @returns {boolean}
     */
    writeDataFast(options = {}){
        let option = _.assign({
            secNr:10,   // 扇区
            mode:4,     // 密码模式
            content:"0",   // 需要写入的数据
            adr:41,     // 需要写入的数据块
        }, options);
        if(this._icdev === 0){
            this.open();
        }
        this.request();     //  寻卡
        this.anticoll();    //  防卡冲突，返回卡的序列号
        this.authentication(option.secNr, option.mode); // 验证密码
        this.writeData(option.content,option.adr);
        this.exit();
        return true;
    };

    /**
     * 快速读取数据
     * @param options
     * @returns {string}
     */
    readDataFast(options = {}){
        let option = _.assign({
            secNr:10,   // 扇区
            mode:4,     // 密码模式
            adr:41,     // 需要读取的数据块
        }, options);
        if(this._icdev === 0){
            this.open();
        }
        this.request();     //  寻卡
        this.anticoll();    //  防卡冲突，返回卡的序列号
        this.authentication(option.secNr, option.mode); // 验证密码
        let result = this.readData(option.adr); // 读取数据
        // console.log(result);
        this.exit();    // 释放资源
        return result;
    }

}

export default Deka;