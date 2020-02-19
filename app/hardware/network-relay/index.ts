const net = window.require("electron").remote.require("net") as typeof import("net");

function SendDirective(ip:string, port:number, sendcontent:string){
    return new Promise((resolve, reject) => {
        let client = new net.Socket();
        client.setEncoding('utf8');
        client.setTimeout(1000);
        client.connect(port, ip, () => {
            client.write(Buffer.from(sendcontent, "hex"));
        });
        //监听与服务端连接的错误事件
        client.on('data', function (data) {
            let ReceiveData = Buffer.from(data);
            resolve(ReceiveData);
            client.end();
        });
        client.on('error', function (err) {
            let errstring = '在于服务器连接或通信过程中发生了一个错误，错误为' + err.toString();
            client.destroy();
            reject(errstring);
        });
        client.on('timeout', function(){
            let errstring = '连接超时';
            client.destroy();
            reject(errstring);
        });
    })
}

let reconn = 0;

let writeData:any = async (ip:string, port:number, input:string) => {
    let result;
    try {
        result = await SendDirective(ip, port, input);
        reconn = 0;
        return result;
    }catch (e){ // 连接失败重试5次
        console.log(e.toString());
        reconn++;
        if(reconn < 5) {
            return writeData(ip, port, input);
        }else{
            reconn = 0;
            throw new Error('连接继电器失败次数过多');
        }
    }
};

export default {
    /**
     * 读取输入点
     * @param ip
     * @param port
     * @returns {Promise<void>}
     */
    async read(ip:string, port:number){
        let input = "483a01520000000000000000d54544";
        let result;
        result = await writeData(ip, port, input);
        let inputHeader = result.slice(0,4);
        let inputContent = result.slice(4,12);
        if(result.length === 17 && inputHeader.toString('hex') === '483a0141'){
            let json = JSON.stringify(inputContent);
            let array = JSON.parse(json);
            return array.data;
        }
    },

    /**
     * 打开某个输出点
     * @param ip
     * @param port
     * @param out
     * @returns {Promise<void>}
     */
    async writeOpen(ip:string, port:number, out:string){
        let output = "483A01700"+out+"0100004544";
        return await writeData(ip, port, output);
    },

    /**
     * 关闭某个输出点
     * @param ip
     * @param port
     * @param out
     * @returns {Promise<void>}
     */
    async writeClose(ip:string, port:number, out:string){
        let output = "483A01700"+out+"0000004544";
        return await writeData(ip, port, output);
    }
};