const electron = window.require("electron");
const EventEmitter = electron.remote.require("events") as typeof import("events");
const SerialPort = electron.remote.require("serialport") as typeof import("serialport");

// const EventEmitter  = require('events').EventEmitter;
// var SerialPort = require("serialport");;

class SeriaportPound extends EventEmitter.EventEmitter
{

    serial:import("serialport");

    constructor(com:string = "COM1", baudRate:number = 9600){
        super();
        this.serial = new SerialPort(com, {
            baudRate: baudRate,
            autoOpen:false
        });

        //串口打开
        this.serial.open((err) => {
            if ( err ) {
                console.log('failed to open: ',err.toString());
                throw new Error(err.toString());
            } else {
                let scanData:any = "";
                //接受串口数据，并打印到终端
                this.serial.on('data', (data) => {
                    scanData += data;
                    scanData = Buffer.from(scanData);
                    if(scanData[0] !== 0x02){
                        scanData = "";
                        return;
                    }
                    if (scanData.length < 12 || scanData[0] !== 0x02 || scanData[11] !== 0x03) {
                        return
                    }
                    this.emit('read', scanData);
                    scanData = "";

                    // let result = scanData.slice(1, 9) // 保留重量数据
                    // let bit = result.slice(7, 8).toString('ascii') // 小数点位
                    // let weight  = result.slice(0, 7).toString('ascii') // 重量
                    // weight = parseInt(weight) / Math.pow(10, parseInt(bit)) / 1000; // 除以1000转成吨
                    // console.log(weight);
                    // //this.autoEventStable(weight);
                    // this.emit('read', weight);
                    // scanData = "";
                    // if((/\n/.test(data))){
                    //     console.log(scanData);
                    //     scanData = "";
                    // }else{
                    //     scanData += data;
                    // }
                });
            }
        });
    }

    close(){
        this.serial.close();
    }
}

export default SeriaportPound;