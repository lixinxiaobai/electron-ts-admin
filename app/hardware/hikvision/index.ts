import libm,{NET_DVR_DEVICEINFO_V30, NET_DVR_JPEGPARA, NET_DVR_MANUALSNAP, NET_DVR_PLATE_RESULT} from "./dll";
import * as ref from "ref";
//import * as fs from 'fs-extra';
import * as iconv from "iconv-lite";

// 海康类
export default class Hikvision {
    ip:string;
    port:number;
    user:string;
    pass:string;
    m_lUserID:number;

    constructor(ip:string, port:number = 8000, user:string = 'admin', pass:string = '123456') {
        this.ip = ip;
        this.port = port;
        this.user = user;
        this.pass = pass;

        libm.NET_DVR_Init();
        var DeviceInfo = new NET_DVR_DEVICEINFO_V30();
        //登录设备 Login the device
        this.m_lUserID = libm.NET_DVR_Login_V30(this.ip, this.port, this.user, this.pass, DeviceInfo.ref());
        if (this.m_lUserID < 0) {
            let iLastErr = libm.NET_DVR_GetLastError();
            let str = "NET_DVR_Login_V30 failed, error code= " + iLastErr; //登录失败，输出错误号
            throw new Error(str);
        }
    }


    // 车牌识别
    Lpr() {
        let struPlateResultInfo = new NET_DVR_PLATE_RESULT();
        let struInter = new NET_DVR_MANUALSNAP();
        let result = false;
        result = libm.NET_DVR_ManualSnap(this.m_lUserID, struInter.ref(), struPlateResultInfo.ref());
        if (!result) {
            let iLastErr = libm.NET_DVR_GetLastError();
            let str = "NET_DVR_ManualSnap failed, error code= " + iLastErr;
            throw new Error(str);
        } else {
            let dwPicLen = struPlateResultInfo.dwPicLen;
            let dwPicPlateLen = struPlateResultInfo.dwPicPlateLen;
            if (dwPicLen > 0) {
            }
            if (dwPicPlateLen > 0) {
            }
            // console.log(struPlateResultInfo.struPlateInfo)
            // console.log("车牌识别：" + struPlateResultInfo.struPlateInfo.sLicense);
            let slicenseBuffer = struPlateResultInfo.struPlateInfo.sLicense.buffer.slice(-12);
            let GBKEN = iconv.decode(slicenseBuffer, 'GBK');
            return GBKEN
        }
    }

    // 抓图
    Capture() {
        let lChannel, lpJpegPara ;
        //图片保存路径和文件名 the path and file name to save
        // sJpegPicFileName = null;
        lChannel = 1; //通道号 Channel number
        lpJpegPara = new NET_DVR_JPEGPARA();
        lpJpegPara.wPicQuality = 0; //图像质量 Image quality
        lpJpegPara.wPicSize = 0xff; //抓图分辨率 Picture size: 2- 4CIF，0xff- Auto(使用当前码流分辨率)，抓图分辨率需要设备支持，更多取值请参考SDK文档
        let buff = Buffer.alloc(1024 * 1024);
        var handleRef:any;
        handleRef = ref.alloc('ulong');
        //JPEG抓图 Capture a JPEG picture
        if (!libm.NET_DVR_CaptureJPEGPicture_NEW(this.m_lUserID, lChannel, lpJpegPara.ref(), buff, 1024 * 1024, handleRef)) {
            let iLastErr = libm.NET_DVR_GetLastError();
            let str = "NET_DVR_CaptureJPEGPicture failed, error code= " + iLastErr;
            throw new Error(str);
        } else {
            let jpgsize = handleRef.deref();
          //  fs.outputFileSync(fileName, buff.slice(0, jpgsize))
            return buff.slice(0, jpgsize);
        }
    }

    logout() {
        libm.NET_DVR_Logout(this.m_lUserID);
    }

    // 录像
    Video() {

    }
}

// export function Camera(ip, port = 8000, user = 'admin', pass = '123456') {
//     try {
//         return new Hikvision(ip, port = 8000, user = 'admin', pass = '123456');
//     }catch (e) {
//         throw new e.toString();
//     }
// }

// export Hikvision;