import * as ffi from 'ffi';
import * as ref from 'ref';
import * as StructType from 'ref-struct';
import * as ArrayType from 'ref-array';
// import * as path from 'path';
// import * as iconv from 'iconv-lite'; 
// import electron from "electron";  
// define the time types
// var time_t = ref.types.byte;
// var suseconds_t = ref.types.long
// console.log(ref.types.byte)
const Byte = ref.types.uchar;
const Ushort = ref.types.ushort;
const Uint = ref.types.uint;
const Float = ref.types.float;
const Uint32 = ref.types.int32;
const Booleans = ref.types.bool; 
 
//NET_DVR_Login_V30()参数结构
var NET_DVR_DEVICEINFO_V30 = StructType({
    sSerialNumber: ArrayType(Byte, 32),//序列号
    byAlarmInPortNum: Byte,//报警输入个数
    byAlarmOutPortNum: Byte,
    byDiskNum: Byte,                    //硬盘个数
    byDVRType: Byte,                    //设备类型, 1:DVR 2:ATM DVR 3:DVS ......
    byChanNum: Byte,                    //模拟通道个数
    byStartChan: Byte,                    //起始通道号,例如DVS-1,DVR - 1
    byAudioChanNum: Byte,                //语音通道数
    byIPChanNum: Byte,                    //最大数字通道个数，低位
    byZeroChanNum: Byte,            //零通道编码个数 //2010-01-16
    byMainProto: Byte,            //主码流传输协议类型 0-private, 1-rtsp,2-同时支持private和rtsp
    bySubProto: Byte,                //子码流传输协议类型0-private, 1-rtsp,2-同时支持private和rtsp
    bySupport: Byte,        //能力，位与结果为0表示不支持，1表示支持，
    ySupport1: Byte,        // 能力集扩充，位与结果为0表示不支持，1表示支持
    ySupport2: Byte, /*能力，位与结果为0表示不支持，非0表示支持
                     bySupport2 & 0x1, 表示解码器是否支持通过URL取流解码
                     bySupport2 & 0x2,  表示支持FTPV40
                     bySupport2 & 0x4,  表示支持ANR
                     bySupport2 & 0x8,  表示支持CCD的通道参数配置
                     bySupport2 & 0x10,  表示支持布防报警回传信息（仅支持抓拍机报警 新老报警结构）
                     bySupport2 & 0x20,  表示是否支持单独获取设备状态子项
    bySupport2 & 0x40,  表示是否是码流加密设备*/
    wDevType: ref.types.ushort,              //设备型号
    ySupport3: Byte, //能力集扩展，位与结果为0表示不支持，1表示支持
    //bySupport3 & 0x1, 表示是否支持批量配置多码流参数
    // bySupport3 & 0x4 表示支持按组配置， 具体包含 通道图像参数、报警输入参数、IP报警输入、输出接入参数、
    // 用户参数、设备工作状态、JPEG抓图、定时和时间抓图、硬盘盘组管理
    //bySupport3 & 0x8为1 表示支持使用TCP预览、UDP预览、多播预览中的"延时预览"字段来请求延时预览（后续都将使用这种方式请求延时预览）。而当bySupport3 & 0x8为0时，将使用 "私有延时预览"协议。
    //bySupport3 & 0x10 表示支持"获取报警主机主要状态（V40）"。
    //bySupport3 & 0x20 表示是否支持通过DDNS域名解析取流

    yMultiStreamProto: Byte,//是否支持多码流,按位表示,0-不支持,1-支持,bit1-码流3,bit2-码流4,bit7-主码流，bit-8子码流
    yStartDChan: Byte,        //起始数字通道号,0表示无效
    yStartDTalkChan: Byte,    //起始数字对讲通道号，区别于模拟对讲通道号，0表示无效
    yHighDChanNum: Byte,        //数字通道个数，高位
    ySupport4: Byte,        //能力集扩展，位与结果为0表示不支持，1表示支持
    //bySupport4 & 0x4表示是否支持拼控统一接口
    // bySupport4 & 0x80 支持设备上传中心报警使能。表示判断调用接口是 NET_DVR_PDC_RULE_CFG_V42还是 NET_DVR_PDC_RULE_CFG_V41
    yLanguageType: Byte,// 支持语种能力,按位表示,每一位0-不支持,1-支持
    //  byLanguageType 等于0 表示 老设备
    //  byLanguageType & 0x1表示支持中文
    //  byLanguageType & 0x2表示支持英文
    yVoiceInChanNum: Byte,   //音频输入通道数
    yStartVoiceInChanNo: Byte, //音频输入起始通道号 0表示无效
    bySupport5: Byte,  //按位表示,0-不支持,1-支持,bit0-支持多码流
    //bySupport5 &0x01表示支持wEventTypeEx ,兼容dwEventType 的事件类型（支持行为事件扩展）--先占住，防止冲突
    //bySupport5 &0x04表示是否支持使用扩展的场景模式接口
    /*
       bySupport5 &0x08 设备返回该值表示是否支持计划录像类型V40接口协议(DVR_SET_RECORDCFG_V40/ DVR_GET_RECORDCFG_V40)(在该协议中设备支持类型类型13的配置)
       之前的部分发布的设备，支持录像类型13，则配置录像类型13。如果不支持，统一转换成录像类型3兼容处理。SDK通过命令探测处理)
    */
    bySupport6: Byte,   //能力，按位表示，0-不支持,1-支持
    //bySupport6 0x1  表示设备是否支持压缩
    //bySupport6 0x2 表示是否支持流ID方式配置流来源扩展命令，DVR_SET_STREAM_SRC_INFO_V40
    //bySupport6 0x4 表示是否支持事件搜索V40接口
    //bySupport6 0x8 表示是否支持扩展智能侦测配置命令
    //bySupport6 0x40表示图片查询结果V40扩展
    byMirrorChanNum: Byte,    //镜像通道个数，<录播主机中用于表示导播通道>
    wStartMirrorChanNo: ref.types.ushort,  //起始镜像通道号
    ySupport7: Byte,   //能力,按位表示,0-不支持,1-支持
    // bySupport7 & 0x1  表示设备是否支持 INTER_VCA_RULECFG_V42 扩展
    // bySupport7 & 0x2  表示设备是否支持 IPC HVT 模式扩展
    // bySupport7 & 0x04  表示设备是否支持 返回锁定时间
    // bySupport7 & 0x08  表示设置云台PTZ位置时，是否支持带通道号
    // bySupport7 & 0x10  表示设备是否支持双系统升级备份
    // bySupport7 & 0x20  表示设备是否支持 OSD字符叠加 V50
    // bySupport7 & 0x40  表示设备是否支持 主从跟踪（从摄像机）
    // bySupport7 & 0x80  表示设备是否支持 报文加密
    byRes2: Byte,        //保留

});

// 预览V40接口
var NET_DVR_PREVIEWINFO = StructType({
    lChannel: Uint32,
    dwStreamType: Uint,
    dwLinkMode: Uint,
    hPlayWnd: Byte,
    bBlocked: Booleans,
    bPassbackRecord: Booleans,
    byPreviewMode: Byte,
    byStreamID: ArrayType(Byte, 32),
    byProtoType: Byte,
    byRes1: Byte,
    byVideoCodingType: Byte,
    dwDisplayBufNum: Uint,
    byNPQMode: Byte,
    byRes: ArrayType(Byte, 32)
});


//图片质量
var NET_DVR_JPEGPARA = StructType({
    /*注意：当图像压缩分辨率为VGA时，支持0=CIF, 1=QCIF, 2=D1抓图，
           当分辨率为3=UXGA(1600x1200), 4=SVGA(800x600), 5=HD720p(1280x720),6=VGA,7=XVGA, 8=HD900p
           仅支持当前分辨率的抓图*/
    wPicSize: ref.types.ushort,/* 0=CIF, 1=QCIF, 2=D1 3=UXGA(1600x1200), 4=SVGA(800x600), 5=HD720p(1280x720),6=VGA*/
    wPicQuality: ref.types.ushort/* 图片质量系数 0-最好 1-较好 2-一般 */
});

// public struct NET_DVR_PREVIEWINFO
//         {
//             public Int32 lChannel;//通道号
//             public uint dwStreamType;	// 码流类型，0-主码流，1-子码流，2-码流3，3-码流4 等以此类推
//             public uint dwLinkMode;// 0：TCP方式,1：UDP方式,2：多播方式,3 - RTP方式，4-RTP/RTSP,5-RSTP/HTTP
//             public IntPtr hPlayWnd;//播放窗口的句柄,为NULL表示不播放图象
//             public bool bBlocked;  //0-非阻塞取流, 1-阻塞取流, 如果阻塞SDK内部connect失败将会有5s的超时才能够返回,不适合于轮询取流操作.
//             public bool bPassbackRecord; //0-不启用录像回传,1启用录像回传
//             public byte byPreviewMode;//预览模式，0-正常预览，1-延迟预览
//             [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = STREAM_ID_LEN, ArraySubType = UnmanagedType.I1)]
//             public byte[] byStreamID;//流ID，lChannel为0xffffffff时启用此参数
//             public byte byProtoType; //应用层取流协议，0-私有协议，1-RTSP协议
//             [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 2, ArraySubType = UnmanagedType.I1)]
//             public byte[] byRes1;
//             public uint dwDisplayBufNum;
//             [MarshalAsAttribute(UnmanagedType.ByValArray, SizeConst = 216, ArraySubType = UnmanagedType.I1)]
//             public byte[] byRes;
//         }

//区域框结构
var NET_VCA_RECT = StructType(
    {
        fX: Float,//边界框左上角点的X轴坐标, 0.001~1
        fY: Float,//边界框左上角点的Y轴坐标, 0.001~1
        fWidth: Float,//边界框的宽度, 0.001~1
        fHeight: Float//边界框的高度, 0.001~1
    });

// 车牌识别结果子结构
var NET_DVR_PLATE_INFO = StructType(
    {
        byPlateType: Byte,                    //车牌类型
        byColor: Byte,                        //车牌颜色
        byBright: Byte,                        //车牌亮度
        byLicenseLen: Byte,                    //车牌字符个数
        byEntireBelieve: Byte,                //整个车牌的置信度，-100
        byRegion: Byte,                       // 区域索引值 0-保留，1-欧洲(EU)，2-俄语区域(ER)，3-欧洲&俄罗斯(EU&CIS) ,4-中东(ME),0xff-所有
        byCountry: Byte,                      // 国家索引值，参照枚举COUNTRY_INDEX（不支持"COUNTRY_ALL = 0xff, //ALL  全部"）
        byArea: Byte,                         //区域（省份），各国家内部区域枚举，阿联酋参照 EMI_AREA
        byPlateSize: Byte,                    //车牌尺寸，0~未知，1~long, 2~short(中东车牌使用)
        byRes: ArrayType(Byte, 15),                       //保留
        sPlateCategory: ArrayType(Byte, 8), //车牌附加信息, 即中东车牌中车牌号码旁边的小字信息，(目前只有中东地区支持)
        dwXmlLen: Uint,                        //XML报警信息长度
        pXmlBuf: "char*",                      // XML报警信息指针,报警类型为 COMM_ITS_PLATE_RESUL时有效，其XML对应到EventNotificationAlert XML Block
        struPlateRect: NET_VCA_RECT,        //车牌位置
        sLicense: ArrayType(ref.types.char, 16),        //车牌号码,注：中东车牌需求把小字也纳入车牌号码，小字和车牌号中间用空格分隔
        byBelieve: ArrayType(Byte, 16),   //各个识别字符的置信度，如检测到车牌"浙A12345", 置信度为,20,30,40,50,60,70，则表示"浙"字正确的可能性只有%，"A"字的正确的可能性是%
    })

//时间参数
var NET_DVR_TIME_V30 = StructType(
    {
        wYear: Uint,
        byMonth: Byte,
        byDay: Byte,
        byHour: Byte,
        byMinute: Byte,
        bySecond: Byte,
        byISO8601: Byte,     /*是否是8601的时间格式，即时差字段是否有效0-时差无效，年月日时分秒为设备本地时间 1-时差有效 */
        wMilliSec: Uint,       //毫秒，精度不够，默认为0
        cTimeDifferenceH: ref.types.char,  		//与UTC的时差（小时），-12 ... +14，+表示东区, byISO8601为1时有效
        cTimeDifferenceM: ref.types.char       	//与UTC的时差（分钟），-30, 30, 45，+表示东区，byISO8601为1时有效
    });

// 图片信息（后续会加入码流）
var NET_ITS_PICTURE_INFO = StructType(
    {
        dwDataLen: Uint,            //媒体数据长度
        byType: Byte,           // 0:车牌图;1:车辆图;2:合成图; 3:特写图;4:二直图;5:码流;6:人脸子图(主驾驶);7:人脸子图(副驾驶)成图;8-非机动车;9-行人;10-称重原始裸数据;11-目标图;12-主驾驶室图 ;13-副驾驶室图;14-人脸图抠小图
        // 0-数据直接上传; 1-云存储服务器URL(3.7Ver)原先的图片数据变成URL数据，图片长度变成URL长度
        byDataType: Byte,
        byCloseUpType: Byte,//特写图类型，0-保留,1-非机动车,2-行人
        byPicRecogMode: Byte,  //图片背向识别：0-正向车牌识别，1-背向识别(尾牌识别) ；
        dwRedLightTime: Uint,       //经过的红灯时间  （s）
        byAbsTime: ArrayType(Byte, 32),        //绝对时间点,yyyymmddhhmmssxxx,e.g.20090810235959999  最后三位为毫秒数
        struPlateRect: NET_VCA_RECT,     //车牌位置,当byType为8-非机动车;9-行人时，表示人体坐标
        struPlateRecgRect: NET_VCA_RECT,    //牌识区域坐标，当图片类型为12-主驾驶室图13-副驾驶室图是，该坐标为驾驶员坐标
        pBuffer: Byte,    //数据指针
        dwUTCTime: Uint,//UTC时间定义
        byCompatibleAblity: Byte, //兼容能力字段 0表示无效，1表示有效; bit0-表示dwUTCTime字段有效
        byTimeDiffFlag: Byte,      /*时差字段是否有效  0-时差无效， 1-时差有效 */
        cTimeDifferenceH: ref.types.char,         /*与UTC的时差（小时），-12 ... +14， +表示东区,，byTimeDiffFlag为1时有效*/
        cTimeDifferenceM: ref.types.char,      	/*与UTC的时差（分钟），-30, 30, 45， +表示东区，byTimeDiffFlag为1时有效*/
        byRes2: ArrayType(Byte, 4),          //保留
    });

//车辆信息
var NET_DVR_VEHICLE_INFO = StructType(
    {
        dwIndex: Uint,         //车辆序号
        byVehicleType: Byte,    //车辆类型 0 表示其它车型，1 表示小型车，2 表示大型车 ,3表示行人触发 ,4表示二轮车触发 5表示三轮车触发(3.5Ver)
        byColorDepth: Byte,        //车身颜色深浅
        byColor: Byte,          //车身颜色,参考VCR_CLR_CLASS
        /*雷达异常状态：
        0~雷达正常，
        1~雷达故障
        2~雷达一直发送某一个相同速度值
        3~雷达送出数据为0
        4~雷达送出数据过大或者过小
        */
        byRadarState: Byte,
        wSpeed: Uint,                //单位km/h
        wLength: Uint,               //前一辆车的车身长度
        /*违规类型，0-正常，1-低速，2-超速，3-逆行，4-闯红灯,5-压车道线,6-不按导向，7-路口滞留，
        8-机占非，9-违法变道，10-不按车道 11-违反禁令，12-路口停车，13-绿灯停车, 14-未礼让行人(违法代码1357),
15-违章停车，16-违章掉头,17-占用应急车道,18-禁右,19-禁左,20-压黄线,21-未系安全带,22-行人闯红灯,23-加塞,24-违法使用远光灯，
25-驾驶时拨打接听手持电话，26-左转不让直行，27-右转不让左转，28-掉头不让直行，29-大弯小转, 30-闯绿灯*/
        byIllegalType: Byte,
        byVehicleLogoRecog: Byte, //参考枚举类型 VLR_VEHICLE_CLASS
        byVehicleSubLogoRecog: Byte, //车辆品牌子类型识别；参考VSB_VOLKSWAGEN_CLASS等子类型枚举。
        byVehicleModel: Byte, //车辆子品牌年款，0-未知，参考"车辆子品牌年款.xlsx"
        byCustomInfo: ArrayType(Byte, 16), //自定义信息
        wVehicleLogoRecog: Uint,       //车辆主品牌，参考"车辆主品牌.xlsx" (该字段兼容byVehicleLogoRecog);
        byRes3: ArrayType(Byte, 14)
    })


//抓拍触发请求结构(保留)
var NET_DVR_MANUALSNAP = StructType(
    {
        byosdenable: Byte,//0-不关闭(默认)，1-关闭
        bylaneno: Byte,//车道号, 范围为1-6，默认为1(抓拍机内部测试使用)
        bychannel: Byte,//通道号
        byres: ArrayType(Byte, 21), //保留
    });


//车牌检测结果 旧
var NET_DVR_PLATE_RESULT = StructType(
    {
        dwSize: Uint,            //结构长度
        byResultType: Byte,    //0-视频识别结果，1图像识别结果 2 大于10M时走下载路线
        byChanIndex: Byte,    //通道号
        wAlarmRecordID: Uint,    //报警录像ID(用于查询录像，仅当byResultType为2时有效)
        dwRelativeTime: Uint,    //相对时间点
        byAbsTime: ArrayType(Byte, 32),   //绝对时间点,yyyymmddhhmmssxxx,e.g.20090810235959999（毫秒）
        dwPicLen: Uint,        //图片长度(近景图)
        dwPicPlateLen: Uint,  //车牌小图片长度
        dwVideoLen: Uint,        //录像内容长度
        byTrafficLight: Byte,    //0-非红绿灯抓拍，1-绿灯时抓拍；2-红灯时抓拍
        byPicNum: Byte,       //连拍的图片序号
        byDriveChan: Byte,    //触发车道号
        byVehicleType: Byte, //车辆类型，参考VTR_RESULT
        dwBinPicLen: Uint,    //车牌二值图长度
        dwCarPicLen: Uint,    //车辆原图长度
        dwFarCarPicLen: Uint, //远景图长度
        pBuffer3: Byte,      //车牌二值图
        pBuffer4: Byte,      //车辆原图
        pBuffer5: Byte,      //远景图
        //关联车道方向类型，参考ITC_RELA_LANE_DIRECTION_TYPE
        //该参数为车道方向参数，与关联车道号对应，确保车道唯一性。
        byRelaLaneDirectionType: Byte,
        byCarDirectionType: Byte, //车辆具体行驶的方向，0表示从上往下，1表示从下往上（根据实际车辆的行驶方向来的区分）
        byRes3: ArrayType(Byte, 6),
        struPlateInfo: NET_DVR_PLATE_INFO,     //车牌信息结构
        struVehicleInfo: NET_DVR_VEHICLE_INFO,    //车辆信息
        pBuffer1: Byte,                   // 当上传的是图片(近景图)，指针指向图片信息，当上传的是视频，指针指向视频信息，如果不想获得图片或视频信息，传NULL(DVS车辆近景图)
        pBuffer2: Byte,                  // 当上传的是图片(车牌图)时，指向车牌图片的指针（DVS车牌彩图）
    })


//车牌检测结果  新
var NET_ITS_PLATE_RESULT = StructType(
    {
        dwSize: Uint,       //结构长度
        dwMatchNo: Uint,        //匹配序号,由(车辆序号,数据类型,车道号)组成匹配码
        byGroupNum: Byte,    //图片组数量（一辆过车相机多次抓拍的数量，代表一组图片的总数，用于延时匹配数据）
        byPicNo: Byte,       //连拍的图片序号（接收到图片组数量后，表示接收完成;接收超时不足图片组数量时，根据需要保留或删除）
        bySecondCam: Byte,   //是否第二相机抓拍（如远近景抓拍的远景相机，或前后抓拍的后相机，特殊项目中会用到）
        byFeaturePicNo: Byte, //闯红灯电警，取第几张图作为特写图,0xff-表示不取
        byDriveChan: Byte,      //触发车道号
        byVehicleType: Byte,     //车辆类型，参考VTR_RESULT
        byDetSceneID: Byte,//检测场景号[1,4], IPC默认是0
        //车辆属性，按位表示，0- 无附加属性(普通车)，bit1- 黄标车(类似年检的标志)，bit2- 危险品车辆，值：0- 否，1- 是
        //该节点已不再使用,使用下面的byYellowLabelCar和byDangerousVehicles判断是否黄标车和危险品车
        byVehicleAttribute: Byte,
        wIllegalType: Ushort,       //违章类型采用国标定义
        byIllegalSubType: ArrayType(Byte, 8),   //违章子类型
        byPostPicNo: Byte,    //违章时取第几张图片作为卡口图,0xff-表示不取
        //通道号(有效，报警通道号和所在设备上传报警通道号一致，在后端和所接入的 通道号一致)
        byChanIndex: Byte,
        wSpeedLimit: Ushort,          //限速上限（超速时有效）
        byChanIndexEx: Byte,      //byChanIndexEx*256+byChanIndex表示真实通道号。
        byRes2: Byte,
        struPlateInfo: ref.refType(NET_DVR_PLATE_INFO),     //车牌信息结构
        struVehicleInfo: ref.refType(NET_DVR_VEHICLE_INFO),    //车辆信息
        byMonitoringSiteID: ArrayType(Byte, 48),        //监测点编号
        byDeviceID: ArrayType(Byte, 48),                //设备编号
        byDir: Byte,            //监测方向，1-上行（反向），2-下行(正向)，3-双向，4-由东向西，5-由南向北,6-由西向东，7-由北向南，8-其它
        byDetectType: Byte,    //检测方式,1-地感触发，2-视频触发，3-多帧识别，4-雷达触发
        //关联车道方向类型，参考ITC_RELA_LANE_DIRECTION_TYPE
        //该参数为车道方向参数，与关联车道号对应，确保车道唯一性。
        byRelaLaneDirectionType: Byte,
        byCarDirectionType: Byte, //车辆具体行驶的方向，0表示从上往下，1表示从下往上（根据实际车辆的行驶方向来的区分）
        //当wIllegalType参数为空时，使用该参数。若wIllegalType参数为有值时，以wIllegalType参数为准，该参数无效。
        dwCustomIllegalType: Uint, //违章类型定义(用户自定义)
        /*为0~数字格式时，为老的违章类型，wIllegalType、dwCustomIllegalType参数生效，赋值国标违法代码。
          为1~字符格式时，pIllegalInfoBuf参数生效。老的违章类型，wIllegalType、dwCustomIllegalType参数依然赋值国标违法代码*/
        pIllegalInfoBuf: Byte,    //违法代码字符信息结构体指针；指向NET_ITS_ILLEGAL_INFO
        byIllegalFromatType: Byte, //违章信息格式类型； 0~数字格式， 1~字符格式
        byPendant: Byte,// 0-表示未知,1-车窗有悬挂物，2-车窗无悬挂物
        byDataAnalysis: Byte,            //0-数据未分析, 1-数据已分析
        byYellowLabelCar: Byte,        //0-表示未知, 1-非黄标车,2-黄标车
        byDangerousVehicles: Byte,    //0-表示未知, 1-非危险品车,2-危险品车
        //以下字段包含Pilot字符均为主驾驶，含Copilot字符均为副驾驶
        byPilotSafebelt: Byte,//0-表示未知,1-系安全带,2-不系安全带
        byCopilotSafebelt: Byte,//0-表示未知,1-系安全带,2-不系安全带
        byPilotSunVisor: Byte,//0-表示未知,1-不打开遮阳板,2-打开遮阳板
        byCopilotSunVisor: Byte,//0-表示未知, 1-不打开遮阳板,2-打开遮阳板
        byPilotCall: Byte,// 0-表示未知, 1-不打电话,2-打电话
        //0-开闸，1-未开闸 (专用于历史数据中相机根据黑白名单匹配后，是否开闸成功的标志)
        byBarrierGateCtrlType: Byte,
        byAlarmDataType: Byte,//0-实时数据，1-历史数据
        struSnapFirstPicTime: ref.refType(NET_DVR_TIME_V30),//端点时间(ms)（抓拍第一张图片的时间）
        dwIllegalTime: Uint,//违法持续时间（ms） = 抓拍最后一张图片的时间 - 抓拍第一张图片的时间
        dwPicNum: Uint,       //图片数量（与picGroupNum不同，代表本条信息附带的图片数量，图片信息由struVehicleInfoEx定义
        struPicInfo: ArrayType(ref.refType(NET_DVR_VEHICLE_INFO), 6)        //图片信息,单张回调，最多6张图，由序号区分
    })


// var TimeValPtr = ref.refType(TimeVal);
var kernel32 = ffi.Library("kernel32", {
    'SetDllDirectoryA': ["bool", ["string"]]
});

let dllpath = 'dlls/hikvision';
kernel32.SetDllDirectoryA(dllpath);

/*********************************************************
 Function:    REALDATACALLBACK
 Desc:        预览回调
 Input:    lRealHandle 当前的预览句柄
 dwDataType 数据类型
 pBuffer 存放数据的缓冲区指针
 dwBufSize 缓冲区大小
 pUser 用户数据
 Output:
 Return:    void
 public delegate void REALDATACALLBACK(Int32 lRealHandle, UInt32 dwDataType, IntPtr pBuffer, UInt32 dwBufSize, IntPtr pUser);
 **********************************************************/
// var REALDATACALLBACK = ffi.Callback('void', ['int', 'int', ref.refType('int'), 'int', ref.refType('int')],
//     function (lRealHandle, dwDataType, pBuffer, dwBufSize, pUser) {
//         console.log("预览回调");
//     });

let baseDllPath = 'dlls/hikvision/HCNetSDK.dll';

let libm = ffi.Library(baseDllPath, {
    'NET_DVR_CaptureJPEGPicture': ['bool', ['int', 'int', ref.refType(NET_DVR_JPEGPARA), 'string']],         // 抓拍图片
    'NET_DVR_CaptureJPEGPicture_NEW': ['bool', ['int', 'int', ref.refType(NET_DVR_JPEGPARA), ref.refType('int'),'int',"pointer"]],
    'NET_DVR_Login_V30': ["int", ['string', 'int', 'string', 'string', ref.refType(NET_DVR_DEVICEINFO_V30)]], // 开启服务
    'NET_DVR_Init': ['int', []],     // 关闭服务
    'NET_DVR_ManualSnap': ['bool', ['int', ref.refType(NET_DVR_MANUALSNAP), ref.refType(NET_DVR_PLATE_RESULT)]],    // 识别车牌
    'NET_DVR_RealPlay_V40': ['int', ['int', ref.refType(NET_DVR_MANUALSNAP), 'pointer', ref.refType('int')]],        // 预览
    'NET_DVR_StopRealPlay': ['bool', ['int']],                                                                    // 停止预览
    'NET_DVR_MakeKeyFrame': ['bool', ['int', 'int']], // 动态生成帧
    'NET_DVR_SaveRealData': ['bool', ['int', 'string']], // 开始录像
    'NET_DVR_StopSaveRealData': ['bool', ['int']],    // 停止录像
    'NET_DVR_GetLastError': ['int', []],
    'NET_DVR_Logout':['bool',  ['int']]
});

export default libm;
export {
    NET_DVR_DEVICEINFO_V30,
    NET_DVR_JPEGPARA,
    NET_DVR_MANUALSNAP,
    NET_DVR_PLATE_INFO,
    NET_DVR_PLATE_RESULT,
    NET_DVR_PREVIEWINFO,
    NET_DVR_TIME_V30,
    NET_DVR_VEHICLE_INFO,
    NET_ITS_PICTURE_INFO,
    NET_ITS_PLATE_RESULT,
    NET_VCA_RECT
}

// // 车牌识别
// const Lpr = function () {
//     libm.NET_DVR_Init();
//     var DeviceInfo = new NET_DVR_DEVICEINFO_V30();
//     //登录设备 Login the device
//     var m_lUserID = libm.NET_DVR_Login_V30("192.168.8.132", 8000, "admin", "dl123456", DeviceInfo.ref());
//     if (m_lUserID < 0) {
//         let iLastErr = libm.NET_DVR_GetLastError();
//         let str = "NET_DVR_Login_V30 failed, error code= " + iLastErr; //登录失败，输出错误号
//         console.log(str)
//         return;
//     } else {
//         console.log("登录成功");
//         let struPlateResultInfo = new NET_DVR_PLATE_RESULT();
//         let struInter = new NET_DVR_MANUALSNAP();
//         let result = false;
//         result = libm.NET_DVR_ManualSnap(m_lUserID, struInter.ref(), struPlateResultInfo.ref());
//         if (!result) {
//             let iLastErr = libm.NET_DVR_GetLastError();
//             let str = "NET_DVR_ManualSnap failed, error code= " + iLastErr;
//             console.log(str)
//         } else {
//             let dwPicLen = struPlateResultInfo.dwPicLen;
//             let dwPicPlateLen = struPlateResultInfo.dwPicPlateLen;
//             console.log(dwPicLen);
//             console.log(dwPicPlateLen);
//             if (dwPicLen > 0) {
//             }
//             if (dwPicPlateLen > 0) {
//             }
//             console.log(struPlateResultInfo.struPlateInfo)
//             console.log("车牌识别：" + struPlateResultInfo.struPlateInfo.sLicense);
//             let slicenseBuffer = struPlateResultInfo.struPlateInfo.sLicense.buffer.slice(-12);
//             var GBKEN = iconv.decode(slicenseBuffer, 'GBK');
//             console.log(GBKEN);
//         }
//     }
// }
//
// // 抓图
// const Capture = function () {
//     libm.NET_DVR_Init();
//     var DeviceInfo = new NET_DVR_DEVICEINFO_V30();
//     //登录设备 Login the device
//     var m_lUserID = libm.NET_DVR_Login_V30("192.168.8.132", 8000, "admin", "dl123456", DeviceInfo.ref());
//     if (m_lUserID < 0) {
//         let iLastErr = libm.NET_DVR_GetLastError();
//         let str = "NET_DVR_Login_V30 failed, error code= " + iLastErr; //登录失败，输出错误号
//         console.log(str)
//         return;
//     } else {
//         console.log("登录成功");
//         let sJpegPicFileName, lChannel, lpJpegPara;
//         //图片保存路径和文件名 the path and file name to save
//         sJpegPicFileName = "JPEG_test.jpg";
//         lChannel = 1; //通道号 Channel number
//         lpJpegPara = new NET_DVR_JPEGPARA();
//         lpJpegPara.wPicQuality = 0; //图像质量 Image quality
//         lpJpegPara.wPicSize = 0xff; //抓图分辨率 Picture size: 2- 4CIF，0xff- Auto(使用当前码流分辨率)，抓图分辨率需要设备支持，更多取值请参考SDK文档
//
//         //JPEG抓图 Capture a JPEG picture
//         if (!libm.NET_DVR_CaptureJPEGPicture(m_lUserID, lChannel, lpJpegPara.ref(), sJpegPicFileName)) {
//             let iLastErr = libm.NET_DVR_GetLastError();
//             let str = "NET_DVR_CaptureJPEGPicture failed, error code= " + iLastErr;
//             console.log(str);
//             //    MessageBox.Show(str);
//             return;
//         } else {
//             let str = "Successful to capture the JPEG file and the saved file is " + sJpegPicFileName;
//             console.log(str);
//         }
//     }
// };
//
// // 录像
// const Video = function () {
//     libm.NET_DVR_Init();
//     var DeviceInfo = new NET_DVR_DEVICEINFO_V30();
//     //登录设备 Login the device
//     var m_lUserID = libm.NET_DVR_Login_V30("192.168.1.144", 8000, "admin", "dl123456", DeviceInfo.ref());
//     if (m_lUserID < 0) {
//         let iLastErr = libm.NET_DVR_GetLastError();
//         let str = "NET_DVR_Login_V30 failed, error code= " + iLastErr; //登录失败，输出错误号
//         console.log(str)
//         return;
//     } else {
//         console.log("登录成功");
//         let lpPreviewInfo = new NET_DVR_PREVIEWINFO();
//         lpPreviewInfo.hPlayWnd = null;//预览窗口
//         lpPreviewInfo.lChannel = 1;//预te览的设备通道
//         lpPreviewInfo.dwStreamType = 0;//码流类型：0-主码流，1-子码流，2-码流3，3-码流4，以此类推
//         lpPreviewInfo.dwLinkMode = 0;//连接方式：0- TCP方式，1- UDP方式，2- 多播方式，3- RTP方式，4-RTP/RTSP，5-RSTP/HTTP
//         lpPreviewInfo.bBlocked = true; //0- 非阻塞取流，1- 阻塞取流
//         lpPreviewInfo.dwDisplayBufNum = 1; //播放库播放缓冲区最大缓冲帧数
//         lpPreviewInfo.byProtoType = 0;
//         lpPreviewInfo.byPreviewMode = 0;
//         //打开预览 Start live view
//         let m_lRealHandle = libm.NET_DVR_RealPlay_V40(m_lUserID, lpPreviewInfo.ref(), null/*RealData*/, ref.alloc('int'));
//         if (m_lRealHandle < 0) {
//             let iLastErr = libm.NET_DVR_GetLastError();
//             let str = "NET_DVR_RealPlay_V40 failed, error code= " + iLastErr; //预览失败，输出错误号
//             console.log(str);
//             return;
//         } else {
//             console.log("预览成功 开始录像");
//             //录像保存路径和文件名 the path and file name to save
//             let sVideoFileName = "Record_test.mp4";
//             //强制I帧 Make a I frame
//             let lChannel = 1; //通道号 Channel number
//             libm.NET_DVR_MakeKeyFrame(m_lUserID, lChannel);
//             //开始录像 Start recording
//             if (!libm.NET_DVR_SaveRealData(m_lRealHandle, sVideoFileName)) {
//                 let iLastErr = libm.NET_DVR_GetLastError();
//                 let str = "NET_DVR_SaveRealData failed, error code= " + iLastErr;
//                 console.log(str);
//                 return;
//             } else {
//                 setTimeout(() => {
//                     // 5秒后停止录像
//                     //停止录像 Stop recording
//                     if (!libm.NET_DVR_StopSaveRealData(m_lRealHandle)) {
//                         let iLastErr = libm.NET_DVR_GetLastError();
//                         let str = "NET_DVR_StopSaveRealData failed, error code= " + iLastErr;
//                         console.log(str);
//                         return;
//                     } else {
//                         let str = "Successful to stop recording and the saved file is " + sVideoFileName;
//                         console.log(str);
//                     }
//                 }, 5000)
//             }
//             //btnPreview.Text = "Stop Live View";
//         }
//     }
// }
//
// Video();