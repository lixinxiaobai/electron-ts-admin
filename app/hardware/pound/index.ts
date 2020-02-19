const electron = window.require("electron");
const EventEmitter = electron.remote.require("events") as typeof import("events");
import SeriaportPound from "./SeriaportPound";
import NetPound from "./NetPound";


/**
 * 地磅实例
 */
class Pound extends EventEmitter.EventEmitter{


    weights:Map<string,number>;
    stables:Map<string,number[]>;
    isStable:boolean;
    poundPath:string;
    PoundObject:SeriaportPound|NetPound;
    stableNumber:number;


    /**
     * 地磅构造函数
     * @param type string  serialport|net
     * @param path string com|ip
     * @param port string|int baund|port
     * @param unit string t|kg
     * @param stableNumber float
     */
    constructor (type:"serialport"|"net", path:string, port:number, unit:"t"|"kg" = 't', stableNumber:number = 0.5) {
        super();
        this.weights = new Map();
        this.stables = new Map();
        this.isStable = false;
        this.poundPath = path;
        // this.PoundObject = null;
        this.stableNumber = stableNumber;
        switch (type){
            case "serialport":
                this.PoundObject  = new SeriaportPound(path, port);
                break;

            case "net":
                this.PoundObject  = new NetPound(path, port);
                break;

            default:
                throw new Error("不支持的地磅通信类型");
        }
        this.PoundObject.on('read', result => {
            result = result.slice(1, 9); // 保留重量数据
            let bit = result.slice(7, 8).toString('ascii'); // 小数点位
            let weight  = result.slice(0, 7).toString('ascii'); // 重量
            weight = parseInt(weight) / Math.pow(10, parseInt(bit)); // 除以1000转成吨
            if(unit === 't'){
                weight = weight/1000;
            }
            this.autoEventStable(weight);
            this.emit('read', weight);
        })
    }

    read () {
        return this.weights.get(this.poundPath)
    }

    close(){
        this.PoundObject.close();
    }

    autoEventStable(weight:number){
        var poundPath = this.poundPath;
        this.weights.set(poundPath, weight);
        // 采集15个读数作为算法判断数据
        let _weights = this.stables.get(poundPath) || [];
        if (_weights.length > 15) {
            _weights.shift()
        }
        _weights.push(weight);
        this.stables.set(poundPath, _weights);
        let weights = this.stables.get(poundPath);
        if (weights && weights.length > 15) {
            let newWeights = Object.assign([],weights);
            newWeights.sort((a,b) => a - b)
            let minVal = newWeights[0];
            let maxVal = newWeights[newWeights.length-1];
            if(Math.abs(maxVal - minVal) <= this.stableNumber){
                if (this.isStable === false && weight > 1)
                {
                    this.isStable = true;
                    this.emit('stable',weight);
                }
            }else{
                this.isStable = false;
            }
        }else{
            this.isStable = false;
        }
    }


    isStables() {
        let weights = this.stables.get(this.poundPath);
        if (weights && weights.length < 15) {
            return false
        }
        let newWeights = Object.assign([],weights);
        newWeights.sort((a,b) => a - b);
        let minVal = newWeights[0];
        let maxVal = newWeights[newWeights.length-1];
        return maxVal - minVal <= this.stableNumber;
    }

    reset() { //重置地磅
        this.isStable = false;
    }
}


export default Pound;