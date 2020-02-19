import { Socket } from "dgram";

const electron = window.require("electron");
const EventEmitter = electron.remote.require("events") as typeof import("events");
const dgram = electron.remote.require("dgram") as typeof import("dgram");

class IdReader extends EventEmitter.EventEmitter{
    ip:string;
    client:Socket
    localPort:number;
    remotePort:number;

    constructor(ip:string, localPort = 4196, remotePort = 4196){
        
        super();
        this.client = dgram.createSocket('udp4');
        this.ip = ip;
        this.localPort = localPort;
        this.remotePort = remotePort;
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
            console.log(msg);
            if (info.size !== 17 || msg[0] !== 0x00 || msg[1] !== 0x00 || msg[info.size-1] !== 0xFF) {
                return
            }
            let res = msg.slice(2, msg.length-3).toString('hex');
            this.emit('data', res);
        });
        this.client.bind(parseInt(this.localPort.toString()));
    }

    open(){
        let SendBuff = Buffer.from("A0036500F8", "hex");
        let SendLen = SendBuff.length;
        this.client.send(SendBuff, 0, SendLen, this.remotePort, this.ip)
    }

    close(){
        let SendBuff = Buffer.from("A003A800B5", "hex");
        let SendLen = SendBuff.length;
        this.client.send(SendBuff, 0, SendLen, this.remotePort, this.ip);
        setTimeout(() => {
            this.client.close();
        },500)
    }
}

export default IdReader;