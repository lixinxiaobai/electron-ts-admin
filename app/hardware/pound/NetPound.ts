const electron = window.require("electron");
const EventEmitter = electron.remote.require("events") as typeof import("events");
const dgram = electron.remote.require("dgram") as typeof import("dgram");

class NetPound extends EventEmitter.EventEmitter{

    client: import("dgram").Socket
    ip:string;


    constructor (ip:string, port:number) {
        super();
        this.client = dgram.createSocket('udp4')
        // 存放ip到weight数据
        this.ip = ip;
        this.client.on('close', () => {
            console.log('socket已关闭')
        });

        this.client.on('error', (err) => {
            throw new Error(err.toString());
        });

        this.client.on('message', (msg, info) => {
            if (info.address !== this.ip) {
                return
            }
            let result = Buffer.from(msg);
            // 校验数据
            if (info.size !== 12 || result[0] !== 0x02 || result[11] !== 0x03) {
                return
            }
            this.emit('read', result);
        });
        this.client.bind(parseInt(port.toString()))
    }

    close(){
        this.client.close();
    }

}


export default NetPound;