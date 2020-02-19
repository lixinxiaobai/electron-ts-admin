const ffi = require('ffi');
const ref = require('ref');
const refArray = require('ref-array');
const EventEmitter = require('events').EventEmitter;
let callback = ffi.Function(ref.types.void, [ref.refType(refArray(ref.types.uchar, 32)), ref.types.int], ffi.FFI_STDCALL);

let dllpath = process.env.NODE_ENV === 'production' ? 'dlls\\Disdll.dll' : __static + "\\..\\dlls\\Disdll.dll";

var kernel32 = ffi.Library("kernel32", {
    'SetDllDirectoryA': ["bool", ["string"]]
});
kernel32.SetDllDirectoryA(process.env.NODE_ENV === 'production' ? 'dlls' : __static + "/../dlls");

// 'dlls/Disdll.dll',
let libm = ffi.Library(dllpath,  {
    'DeviceInit': ['bool', ['string','int','int']],
    'DeviceConnect': ['bool',[]],
    'DeviceDisconnect':['bool',[]],
    'BeginMultiInv':['bool',['int',callback]],
    'StopInv':['bool',['int']],
});

let res = libm.DeviceInit("192.168.19.224",0,4196);
res = libm.DeviceConnect();

libm.BeginMultiInv(0, callback.toPointer((a, b) => {
    let res = a.slice(1, b-2).toString('hex');
    console.log(a,res);
}));

/**
 * ID读卡器类
 */
class IdReader extends EventEmitter{

    constructor(ip, port = 4196, deviceId = 0){
        super();
        this.deviceId = deviceId;
   //     let i = libm.DeviceInit(ip, deviceId, port);

    }

    open(){
        // let result =libm.DeviceConnect();
        // if(result === false){
        //     throw new Error("读卡器连接失败")
        // }
        // try {
        //     libm.BeginMultiInv(this.deviceId, callback.toPointer((a, b) => {
        //         console.log(a, b);
        //     //    let res = a.slice(1, b - 2).toString('hex');
        //         //  this.emit('data', res);
        //     }));
        // }catch (e) {
        //     console.log(e);
        // }
    }

    stop(){
        libm.StopInv(this.deviceId);
    }

}

export default IdReader;