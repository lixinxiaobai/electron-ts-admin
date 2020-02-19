import iccardDeka from './deka';
import * as _ from 'lodash';
import * as EventEmitter from "events";
// import * as EventEmitter from 'events';
 

const specialeSplace = function (str:string|Buffer){
    return _.trim((str as string).replace(/\u0000|\u0001|\u0002|\u0003|\u0004|\u0005|\u0006|\u0007|\u0008|\u0009|\u000a|\u000b|\u000c|\u000d|\u000e|\u000f|\u0010|\u0011|\u0012|\u0013|\u0014|\u0015|\u0016|\u0017|\u0018|\u0019|\u001a|\u001b|\u001c|\u001d|\u001e|\u001f/g,""));
};
 
class IcCard extends EventEmitter.EventEmitter {

    configs:{
        port: number,       // 100代表USB
        baud: number,     // 为通讯波特率9600～115200
        secNr: number,   // 需要读取的扇区
        mode: number,     // 密码模式
        adr: number,     // 需要读取的数据块
        autoRead: boolean, // 自动开启扫描
        Nkey:string,
    } = {
        port: 100,       // 100代表USB
        baud: 115200,     // 为通讯波特率9600～115200
        secNr: 10,   // 需要读取的扇区
        mode: 0,     // 密码模式
        adr: 41,     // 需要读取的数据块
        autoRead: false, // 自动开启扫描,
        Nkey:"FFFFFFFFFFFF"
    }; 
    ICCardSDK:iccardDeka;
    static instance:IcCard|null;
    timer:number;

    constructor(options = {}) {
        super();
        this.configs = _.assign({
            port: 100,       // 100代表USB
            baud: 115200,     // 为通讯波特率9600～115200
            secNr: 10,   // 需要读取的扇区
            mode: 0,     // 密码模式
            adr: 41,     // 需要读取的数据块
            autoRead: false, // 自动开启扫描
            Nkey:'FFFFFFFFFFFF'
        }, options);
     //   this.iccard = iccard;
     IcCard.instance = null;
        this.ICCardSDK = new iccardDeka({port: this.configs.port, baud: this.configs.baud});
      //  let configs = Object.assign({}, {Nkey:'FFFFFFFFFFFF'}, this.configs);
    //    if(!configs.Nkey) configs.Nkey = "FFFFFFFFFFFF";
     //   console.log(configs);
      //  this.ICCardSDK.loadKey(configs.secNr, configs.mode, configs.Nkey);
        this.configs.autoRead && this.autoReadIcCard();
        this.timer = 0;
    }

    static getInstance() {
        if(IcCard.instance === null) {
            IcCard.instance = new IcCard();
        }
        return IcCard.instance;
    }

    getConfig() {
        return this.configs;
    }

    getICCardSDK() {
        return this.ICCardSDK;
    }

    /**
     * 手动读取卡号
     */
    readCardNumber(options = {}){
   //     let configs = Object.assign({}, {Nkey:'FFFFFFFFFFFF'}, this.configs, options);
        const ICCardSDK = this.ICCardSDK;
        ICCardSDK.open();
        let reuestResult = 1,IcCardData;
      //  ICCardSDK.loadKey(configs.secNr, configs.mode, configs.Nkey);
        try {
            reuestResult = ICCardSDK.request();
        }catch (e) {
            reuestResult = 1;
        }
        console.log(reuestResult,'reuestResult');
        if (reuestResult === 0) {
            IcCardData = ICCardSDK.anticoll();
            console.log(IcCardData);
            ICCardSDK.beep();
            ICCardSDK.exit();
            return IcCardData.toString('hex');
        }else{
            ICCardSDK.exit();
            throw new Error('没有找到卡片');
        }
    }

    autoReadCardNumber(options = {}){
  //      let configs = Object.assign({}, {Nkey:'FFFFFFFFFFFF'}, this.configs, options);
        const ICCardSDK = this.ICCardSDK;
        ICCardSDK.open(false);
        let reuestResult = 1,IcCardData;
        let requested = false;
    //    ICCardSDK.loadKey(configs.secNr, configs.mode, configs.Nkey);
        let requestCardNo = () => {
            if(ICCardSDK.getIcdev() <= 0){
                ICCardSDK.open(false);
            }
            try {
                reuestResult = ICCardSDK.request();
            }catch (e) {
                reuestResult = 1;
            }
            if (reuestResult === 0) {
                if(requested === false) {
                    requested = true;
                    IcCardData = ICCardSDK.anticoll();
                    ICCardSDK.beep();
                    this.emit('cardno', IcCardData.toString('hex'));
                }
            }else{
                requested = false;
                this.emit('err','没有找到卡片');
            }
        };

        this.timer = setInterval(() => {
            requestCardNo();
        },500);
        requestCardNo();
    }

    clearTimer(){
        this.timer && clearInterval(this.timer);
    }

    release(){
        this.clearTimer();
        this.ICCardSDK.exit();
    }


    readCardData(options = {secNr:10,mode:0,adr:41},beep = true){
        let configs = Object.assign({}, this.configs, options); 
        const ICCardSDK = this.ICCardSDK;
        ICCardSDK.open(false);
        let reuestResult = 1,IcCardData;
        ICCardSDK.loadKey(configs.secNr, configs.mode, configs.Nkey);
        try {
            reuestResult = ICCardSDK.request();
        }catch (e) {
            reuestResult = 1;
        }
        if (reuestResult === 0) {
            ICCardSDK.anticoll();
            ICCardSDK.authentication(configs.secNr, configs.mode); // 验证密码
            IcCardData = ICCardSDK.readData(configs.adr); // 读取数据
            beep && ICCardSDK.beep();
            ICCardSDK.exit();
            return specialeSplace(new Buffer(IcCardData.toString(), 'hex').toString());
        }else{
            ICCardSDK.exit();
            throw new Error('没有找到卡片');
        }
    }

    // 写卡数据
    writeCarData(content = "", beep = true, options = {secNr:10,mode:0,adr:41}){
        let configs = Object.assign({}, this.configs, options,{content});
        const ICCardSDK = this.ICCardSDK;
        ICCardSDK.open(false);
        let reuestResult = 1;
        ICCardSDK.loadKey(configs.secNr, configs.mode, configs.Nkey);
        try {
            reuestResult = ICCardSDK.request(); // 寻卡
        }catch (e) {
            reuestResult = 1;
        }
        if (reuestResult === 0) {
            ICCardSDK.anticoll();    //  防卡冲突，返回卡的序列号
            ICCardSDK.authentication(configs.secNr, configs.mode); // 验证密码
            ICCardSDK.writeData(configs.content, configs.adr);
            beep && ICCardSDK.beep();
            ICCardSDK.exit();
            return true;
        }else{
            ICCardSDK.exit();
            throw new Error('没有找到卡片');
        }
    }


    // writeData


    clearCardData(){
        const ICCardSDK = this.ICCardSDK;
        ICCardSDK.writeDataFast({content:''});
    }

    /**
     * 自动扫描卡
     */
    autoReadIcCard() {
        let configs = this.configs;
        const ICCardSDK = this.ICCardSDK;
        try {
            ICCardSDK.open();
            // requested 是否已经扫描到卡
            // reuestResult 是否扫描到卡
            // IcCardData 卡内数据
            let requested = false, reuestResult = 1,IcCardData;
            this.timer = setInterval(() => {
                try {
                    reuestResult = ICCardSDK.request();
                } catch (e) {
                    reuestResult = 1;
                }
                // 如果已经扫描到卡
                if (reuestResult === 0) {
                    // 如果之前没有扫描到卡
                    if (!requested) {
                        ICCardSDK.beep();
                        ICCardSDK.anticoll();    //  防卡冲突，返回卡的序列号
                        ICCardSDK.authentication(configs.secNr, configs.mode); // 验证密码
                        IcCardData = ICCardSDK.readData(configs.adr); // 读取数据
                        // 扫描到卡的数据
                        this.emit('data', specialeSplace(IcCardData));
                        requested = true;
                    }
                } else {
                    if(requested){
                        // 有卡离开
                        this.emit('cardOut');
                    }
                    IcCardData = null;
                    requested = false;
                }
            }, 1000);
        }catch (err){
            this.emit('err', err);
        }
    }
}

export default IcCard;