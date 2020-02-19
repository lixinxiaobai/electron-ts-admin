import LEDSDK from "./LedSDK";

export default class LED {
    
    ledsdk:LEDSDK;
    oldContent:string[];
    area:number[];

    static instance:{[ip:string]:LED} = {};

    constructor(ip:string, options = {}) {
        this.ledsdk = new LEDSDK(ip, options);
        this.oldContent = ["", "", "", ""];
        this.area = [41, 42, 43, 44];
    }

    static getInstance(ip:string, options={}) {
        if(!LED.instance[ip]) {
            LED.instance[ip] = new LED(ip,options);
        }
        return LED.instance[ip];
    }


    sendLedMessage(content:string[]) {
        for (let i = 0; i <= 3; i++) {
            if (content[i] !== this.oldContent[i]) {
                this.ledsdk.SendCollectionData_Net(this.area[i], content[i]);
            }
        }
        this.oldContent = content;
    }

    sendAreaMessage(line:number, message:string) {
        line -= 1;
        if (message !== this.oldContent[line]) {
            this.ledsdk.SendCollectionData_Net(this.area[line], message);
        }
        this.oldContent[line] = message;
    }

}