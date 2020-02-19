import * as ffi from 'ffi';
import * as ref from 'ref';
// import ref from 'ref';
// console.log(333444);
// console.log(__static);
// console.log(process.env.NODE_ENV);
let dllPath = 'dlls/dcrf32.dll';
let libm = ffi.Library(dllPath, {
    /**
     功 能：初始化通讯口
     参 数：port：取值为0～19时，表示串口1～20；为100时，表示USB口通讯，此时波特率无效。
     baud：为通讯波特率9600～115200
     */
    'dc_init': ['int', ['int','long']],
    /**
     功 能：关闭端口
     参 数：icdev：通讯设备标识符
     */
    'dc_exit':['int',['int']],
    /**
     功 能：蜂鸣
     参 数：icdev：通讯设备标识符
     unsigned int _Msec：蜂鸣时间，单位是10毫秒
     */
    'dc_beep': ['int',['int','uint']],
    /**
     功 能：将密码装入读写模块RAM中
     参 数：icdev：通讯设备标识符
     _Mode：装入密码模式，同密码验证模式mode_auth
     _SecNr：扇区号（M1卡：0～15；  ML卡：0）
     _Nkey：写入读写器中的卡密码
     */
    'dc_load_key_hex':['int',['int','int','int','string']],
    /**
     功 能：寻卡，能返回在工作区域内某张卡的序列号(该函数包含了dc_request,dc_anticoll,dc_select的整体功能)
     参 数：icdev：通讯设备标识符
     _Mode：寻卡模式mode_card
     _Snr：返回的卡序列号
     */
    'dc_card':['int',['int', 'char', ref.refType('long')]],
    /**
     功 能：寻卡请求
     参 数：icdev：通讯设备标识符
     _Mode：寻卡模式mode_card
     Tagtype：卡类型值，详情见附录TagType特征值
     */
    'dc_request':['int',['int','char',ref.refType('uint')]],
    /**
     功 能：防卡冲突，返回卡的序列号
     参 数：icdev：通讯设备标识符
     _Bcn： 设为0
     _Snr：返回的卡序列号地址
     */
    'dc_anticoll':['int',['int','char',ref.refType('long')]],
    /**
     功 能：从卡中读数据(转换为16进制)
     参 数：icdev：通讯设备标识符
     _Adr：M1卡——块地址（0～63）,MS70(0-255)；
     ML卡——页地址（0～11）
     _Data：读出数据
     */
    'dc_read_hex':['int',['int','int',ref.refType('byte')]],
    /**
     功 能：核对密码函数，用此函数时，可以不用执行dc_load_key()函数
     参 数：icdev: dc_init返回的设备描述符
     _Mode：密码验证模式
     blockAddr：要验证密码的块地址号
     passbuff:密码字符串
     */
    'dc_authentication_passaddr_hex':['int',['int','int','int','string']],
    /**
     功 能：核对密码函数，用此函数时，可以不用执行dc_load_key()函数
     参 数：icdev: dc_init返回的设备描述符
     _Mode：密码验证模式
     blockAddr：要验证密码的块地址号
     passbuff:密码字符串
     */
    'dc_authentication':['int',['int','int','int']],
    /**
     功 能：向卡中写入数据
     对于M1卡，一次必须写一个块，为16个字节；
     对于ML卡，一次必须写一页，为4个字节
     参 数：icdev：通讯设备标识符
     _Adr：M1卡——块地址（1～63）,M1S70卡—块地址（1-255）；
     ML卡——页地址（2～11）
     _Data：要写入的数据
     */
    'dc_write_hex':['int',['int','int','string']],
    /**
     功 能：向卡中写入数据
     对于M1卡，一次必须写一个块，为16个字节；
     对于ML卡，一次必须写一页，为4个字节
     参 数：icdev：通讯设备标识符
     _Adr：M1卡——块地址（1～63）,M1S70卡—块地址（1-255）；
     ML卡——页地址（2～11）
     _Data：要写入的数据
     */
    'dc_write':['int',['int','int','string']],
});

export default libm