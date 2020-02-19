let defaultConfig:any = {};
defaultConfig.ScreenColor = 0; // 0	单基色1	双基色2	三基色

defaultConfig.FontBody = 1; // 1 宋体 2	楷体 3	黑体 4	隶书 5	行书/幼圆

defaultConfig.FontSize = 0; // 0 12×12点阵 1	16×16点阵 2	24×24点阵 3	32×32点阵 4	48×48点阵 5	64×64点阵 6	80×80点阵 7	96×96点阵

defaultConfig.FontColor = 1; // 红色   1	红色2	绿色 3	黄色
/**
 * 0自适应(系统自动配置) 1	从右向左移动 2	从左向右移动 3	从下向上移动 4	从上向下移动 5
 * 从右向左展开 6	从左向右展开 7	从下向上展开 8	从上向下展开 9	立即显示 10	从中间向两边展开 11
 * 从两边向中间展开 12	从中间向上下展开 13	从上下向中间展开 14	闪烁 15	右百叶 16	下百叶
 */
defaultConfig.ShowStyle = 3;

defaultConfig.ShowSpeed = 1; // 显示速度  0	自适应(控制卡自动配置) 1-8	数值越大，移动速度越慢

/*0	由程序依据播放方式和每屏的显示字符数自动设定(每屏内容不停留,循环播放)
//0<N <255	N*5(以5秒钟为一个单位)
//255	一直静止显示
*/
defaultConfig.StopTime = 255;

defaultConfig.PowerOffSave = false; // 掉电保存

/**
 1  发送完毕所有素材立即更新
 2	发送完毕后本素材立即更新，其他素材显示不变
 3	发送完毕后本素材不立即更新，按正常显示进行
 * @type {number}
 */
defaultConfig.UpdateStyle = 2; // 更新方式

/**
 1	红色
 2	绿色
 3	黄色
 * @type {number}
 */
defaultConfig.NumColor = 4; // 日期时间素材中的数字颜色

/**
 1	红色
 2	绿色
 3	黄色
 * @type {number}
 */
defaultConfig.ChrColor = 4; // 日期时间素材中的字符颜色

/**
 0	四位，如2013年
 1	二位，如13年
 * @type {number}
 */
defaultConfig.YearLen = 0; // 日期时间素材中显示的年份位数

/**
 1	年月日星期时分秒全部显示
 2	年月日
 3	时分秒
 4	时分
 5	星期
 6	年
 7	月
 8	日
 9	时
 10	分
 11	秒
 * @type {number}
 */
defaultConfig.TimeFormat = 2; // 日期时间素材中显示的年份位数

/**
 1	YYYY年MM月DD日 HH时MM分SS秒
 2	YYYY-MM-DD HH:MM:SS
 3	MM/DD/YYYY HH:MM:SS
 * @type {number}
 */
defaultConfig.ShowFormat = 1;// 日期时间素材的显示格式

/**
 1	YYYY年MM月DD日 HH时MM分SS秒
 2	YYYY-MM-DD HH:MM:SS
 3	MM/DD/YYYY HH:MM:SS
 * @type {number}
 */
defaultConfig.ShowFormat = 1;// 日期时间素材的显示格式

/**
 0	滞后
 1	超前
 * @type {number}
 */
defaultConfig.TimeDifSet = 0; // 日期时间素材的时差设置

/**
 0	滞后
 1	超前
 * @type {number}
 */
defaultConfig.TimeDifSet = 0; // 日期时间素材的时差设置

/**
 true	闪烁
 false	不闪烁
 * @type {boolean}
 */
defaultConfig.LineUpFlash = true;// 排队叫号是否闪烁;

/**
 1	UDP协议
 2	TCP协议
 * @type {number}
 */
defaultConfig.NetProtocol = 1;// 网络通讯协议;

/**
 1	RS232
 2	RS485
 * @type {number}
 */
defaultConfig.RSType = 1;// 串口通讯类型;

/**
 0	设置点播规则
 1	回读当前点播规则
 * @type {number}
 */
defaultConfig.RSType = 0;// 0	设置点播规则

defaultConfig.CardIP = ""; // 输出参数


defaultConfig.ReturnResult = 0; // 输出参数

export default defaultConfig;