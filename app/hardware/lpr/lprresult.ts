export type ivresult = {
    "PlateResult": {
        "bright": number,
        "carBright": number,
        "carColor": number,
        "colorType": number,
        "colorValue": number,
        "confidence": number,
        "direction": number,
        "license": string,
        "enable_encrypt": number,
        "location": {
            "RECT": {
                "bottom": number,
                "left": number,
                "right": number,
                "top": number
            }
        },
        "timeStamp": {
            "Timeval": {
                "sec": number,
                "usec": number
            }
        },
        "timeUsed": number,
        "triggerType": number,
        "type": number,
        "car_location": {
            "RECT": {
                "bottom": number,
                "left": number,
                "right": number,
                "top": number
            }
        },
        "car_brand": {
            "brand": number,
            "type": number,
            "year": number
        },
        "featureCode": string,
    },
    "active_id": number,
    "clipImgSize": number,
    "clipImgPath"?:string;
    "clipImgData"?:Buffer;
    "cmd": string,
    "fullImgSize": number,
    "fullImgPath"?:string,
    "fullImgData"?:Buffer;
    "id": number,
    "imageformat": string,
    "timeString": string
}

/***
其中各字段的含义如下表所示： 字段名 说明 
license 车牌号码（汉字为GB2312编码）
 enable_encrypt 车牌是否加密（0不加密，1加密） 
 colorValue 车牌颜色
  colorType 车牌颜色序号，详见车牌颜色定义LC_X 
  type 车牌类型，详见车牌类型定义LT_X 
  confidence 车牌可信度 
  bright 亮度评价 
  direction 运动方向，详见运动方向定义 DIRECTION_X 
  location：rect 车牌位置 
  timeUsed 识别所用时间 
  carBright 车的亮度 
  carColor 车的颜色，详见车辆颜色定义LCOLOUR_X 
  timeStamp 识别时间点 
  triggerType 触发结果的类型,见TH_TRIGGER_TYPE_BIT cmd 当前指令名称 id 识别记录的编号 
  imageformat 图片格式 
  timeString 触发时间字符串，格式如：2015-01-02 03:04:05 fullImgSize 整幅大图的尺寸（字节数） 
  clipImgSize 车牌区域图片的尺寸（字节数） 
  active_id 车牌加密方式 
  car_location 车辆位置 
  Car_Brand 车辆品牌信息 
  featureCode 特征码(16位字符串)
Car_Brand中个字段信息 
    brand 车辆品牌信息 
    type 车辆类型 
    year 年份
 * 
 */
