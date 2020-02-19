const ffi = window.require("electron").remote.require("ffi") as typeof import("ffi");

let libm = ffi.Library('dlls/QYLED', {
    'OpenServer': ['int', ['int']], // 开启服务
    'CloseServer': ['int',[]],     // 关闭服务
    'AddShowPage':['int',['string','string','int']],    // 添加显示页
    'AddArea':['int',['int','int','int','int']],        // 添加区域
    'AddTemplate_InternalText':['int',['string','int','int','int','int','int','int','int','int','bool']],        // 添加内码文字素材
    'SendCollectionData_Net': ['int', ['string','string','int','int','int','int','int',]],    // 发送实时采集
    /**
     * string TshowContent 字符串指针
     * string TcardIP 控制卡IP地址
     * int TnetProtocol 与控制卡通讯所用的网络通讯协议
     * int TareaWidth 区域宽度不大于屏宽，8的倍数，最小值16
     * int TareaHigth 区域高度不大于屏高，最小值16
     * int Tuid 内码文字ID识别内码文字，值唯一
     * int TscreenColor  显示屏颜色
     * int TshowStyle 显示方式
     * int TshowSpeed 显示速度
     * int TstopTime 停留时间
     * int TfontColor 字体颜色
     * int TfontBody 字体
     * int TfontSize  字体大小
     * int TupdateStyle 更新方式
     * bool TpowerOffSave 是否掉电保存
     */
    'SetChnCodeMode':['int',['int']],
    'SendInternalText_Net':['int', ['string','string','int','int','int','int','int','int','int','int','int','int','int','int','bool']],
    'PlayVoice_Net':['int',['string','string','string','int','int']]
});

export default libm;