import DateUtil from '../date/date'
export default function check(){}
/**
 * 身份证号校验
 * @param code 身份证号码
 * @author zhansheng
 */
check.prototype.identityCheck=function(code){
    var arr = code.split('')
    var date = arr.slice(6,14) //出生日期
    var area = arr.slice(0,6) //地区编号
    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 0];//加权因子
    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];//校验位(最后一位)
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};

    // 以下按照已知身份证规则依次校验
    
    /** 
     * 校验号码长度 新版 18位；老版存在15位
     * 
     **/
    if(code.toString().length!=18&&code.toString().length!=15){
        return "身份证号格式有误(位数不正确)"
    }

    /** 
     * 校验最后一位符合规则与否
     * 
     **/
    //求前17的加权和
    var sum = 0
    arr.forEach((item,index) => {
        sum = sum + item*factor[index]
    })
    //根据规则求出最后一位的值(取余)
    var last = parity[sum%11]
    if(arr[17] != last){
        return "身份证最后一位不符合规则"
    } 

    /** 
     * 校验年月日
     * 
     **/
    //校验月
    var yue = date.slice(4,6)
    if(yue.join('')>12){
        return "身份证号格式有误(出生日期有误-月份超范围)"
    }
    //校验日
    var ri = date.slice(-2)
    var LargeMonth = ['01','03','05','07','08','10','12']
    var midleMonth = ['04','06','09','11']
    var smallMonth = ['02']
    if(LargeMonth.includes(yue.join('').toString())){
        if(ri.join('')>31){
            return "身份证号格式有误(出生日期有误-号数超范围)"
        }
    }else if(midleMonth.includes(yue.join('').toString())){
        if(ri.join('')>30){
            return "身份证号格式有误(出生日期有误-号数超范围)"
        }
    }else{
        if(date.slice(0,4).join('')%4==0&&date.slice(0,4).join('')%100==0){
            if(ri.join('')>29){
                return "身份证号格式有误(出生日期有误-号数超范围)"
            }
        }else{
            if(ri.join('')>28){
                return "身份证号格式有误(出生日期有误-号数超范围)"
            }
        }
    }
    //校验出生日期范围
    var beginDate = 18000101
    let dateFormat = new DateUtil()
    var endDate = dateFormat.Format("yyyyMMdd",new Date())
    if((date.join('')-beginDate)<0||(endDate-date.join(''))<0){
        return "身份证号格式有误(出生日期范围不正确)"
    }

    /** 
     * 校验前六位地区码
     * 
     **/
    var province = area.slice(0,2)
    if(!city.hasOwnProperty(province.join(''))){
        return "身份证号格式有误(地区号码不正确)"
    }

    return "success"
}

/**
 * 新能源车牌校验
 * @param code 车牌号码
 * @author zhansheng
 */
check.prototype.licensePlateCheck=function(code){
    /** 
     * 校验号码长度
     * 
     **/
    console.log("code is:",/^[A-Z]$/.test(code.split('')[7]),code.split('')[7])
    if('京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领'.indexOf(code.split('')[0])<0){
        return "车牌规则有误"
    }else if(!(/^[A-Z]$/.test(code.split('')[1]))){
        return "车牌规则有误"
    }else if(!(/^[A-Z]$/.test(code.split('')[2]))&&!(/^[A-Z]$/.test(code.split('')[7]))){
        return "车牌规则有误"
    }else if((/^[A-Z]$/.test(code.split('')[2]))&&(/^[A-Z]$/.test(code.split('')[7]))){
        return "车牌规则有误"
    }else if(!(/^[0-9]$/.test(code.split('')[3]))||!(/^[0-9]$/.test(code.split('')[4]))||!(/^[0-9]$/.test(code.split('')[5]))||!(/^[0-9]$/.test(code.split('')[6]))){
        return "车牌规则有误"
    }
    //^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$
    return "success"
}

/**
 * 电话号码校验
 * @params code 电话号码
 * @author zhansheng
 */
check.prototype.phoneNoCheck=function(code){
    if(!/^1[3456789]\d{9}$/.test(code)){
        return false
    }
    return true
}

/**
 * 邮箱校验
 * @params code 邮箱地址
 * @author zhansheng 
 */
check.prototype.emailCheck=function(code){
    var ext = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return ext.test(code)
}

/**
 * 数字校验
 * @params code 数值
 * @author zhansheng 
 * 
 * 单独拆分：

　　1. 整数：/^([^0][0-9]+|0)$/

　　2. 小数：/^(([^0][0-9]+|0)\.([0-9]{1,2}))$/

　　根据需求可更改：

　　1. 若更改小数点前限制位数，则更改 + （例如：小数点前限制4位——([^0][0-9]\d{0,3}|0) ），整数同理。

　　2. 若更改小数点后限制位数，则更改 {1,2} （ 例如:：小数点后最多保留3位——{1, 3}；小数点后必须保留3位——{3} ）。
 */
check.prototype.numCheck=function(val){
    var ext = /^(([^0][0-9]+|0)\.([0-9]{1,9})$)|^([^0][0-9]+|0)$/
    return ext.test(val)
}

/**
 * 移动端pc端校验
 */

check.prototype.deviceTypeCheck = function() {
    const detectDeviceType = () =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
          ? "Mobile"
          : "Pc";
    return detectDeviceType();
}

/**
 * 系统要求，创建的账号不能有大写字母
 */
check.prototype.validateAccount = (rule, value, callback) => {
    let p2 = /^.*(?=.{0,20})(?=.*[A-Z]{1,}).*$/ // 大写字母校验
    if (value.length==''){
        callback(new Error('账号不能为空'));
    }else if(p2.test(value)) {
        callback(new Error('账号不能包含大写字母'));
    }else {
        callback();
    }
};

/**
 * 系统要求，创建的账号密码要复合一定规则
 */
check.prototype.validatePass = (rule, value, callback) => {
    let p1 = /^.*(?=.{8,20})(?=.*\d).*$/ // 数字校验
    let p2 = /^.*(?=.{8,20})(?=.*[A-Z]{1,}).*$/ // 两个大写字母校验
    let p3 = /^.*(?=.{8,20})(?=.*[a-z]{1,}).*$/ // 两个小写字母校验
    let p4 = /^.*(?=.{8,20})(?=.*[!@#$%^&*?()_+~\(\)]).*$/ // 特殊字符校验
    // console.log('llll:', p1.test(value),p2.test(value),p3.test(value),p4.test(value) )
    if (value.length<8){
        callback(new Error('密码最短为8位'));
    }else if(!p1.test(value)) {
        callback(new Error('密码必须包含1个数字'));
    }else if(!p2.test(value)) {
        callback(new Error('密码必须包含1个大写字母'));
    }else if(!p3.test(value)) {
        callback(new Error('密码必须包含1个小写字母'));
    }else if(!p4.test(value)) {
        callback(new Error('密码必须包含1个特殊字符'));
    } else {
        callback();
    }
};


/**
 * 创建唯一的字符串
 * @return {string} ojgdvbvaua40
 */
export function createUniqueString () {
    const timestamp = +new Date() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    return (+(randomNum + timestamp)).toString(32)
  }
  
  /**
   * 数字存储大小格式化
   * @param {number} num 存储大小 单位：Byte
   * @param {number} digits 保留几位小数
   * @return {string} 2MB
   */
  function toStorage (num, digits) {
    digits = digits || 2
    if (num < 1024) {
      return num + 'B'
    }
    num = (num * 1000 / 1024)
    const si = [
      { value: 1E18, symbol: 'E' },
      { value: 1E15, symbol: 'P' },
      { value: 1E12, symbol: 'T' },
      { value: 1E9, symbol: 'G' },
      { value: 1E6, symbol: 'M' },
      { value: 1E3, symbol: 'K' }
    ]
    for (let i = 0; i < si.length; i++) {
      if (num >= si[i].value) {
        return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') +
          si[i].symbol + 'B'
      }
    }
  }
  
    /**
     * 图片上传
     * @param {file} file el-upload文件对象
     * @param {number} size 限制的文件大小(kb) 默认10M
     */
    export const validFileSize = (file, size) => {
        size = +size || 10240
        const isSizeOut = file.size / 1024 > size
        if (isSizeOut) {
        //   Message.error('上传图片大小不能超过' + tools.toStorage(size * 1024))
        }
        return !isSizeOut
    }

    /**
     * 判断相等  ---能校验数组，对象等
     */
    check.prototype.judgeEqual = function(temp1,temp2){
        return JSON.stringify(temp1)===JSON.stringify(temp2)
    },

    /**
     * 判断对象是否为空 
     */
    check.prototype.objIsEmpty = function(obj){
        for(let key in obj){
            return false
        }
        return true
    }

    /**
     * 判断手机系统
     * 主要区分安卓和ios
     */
     check.prototype.judgeSystem = function() {
        var userAgent = navigator.userAgent;
        var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; //android终端
        var isIos = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid?'a':isIos?'i':''
    }

    /**
     * 判断浏览器环境
     */
     check.prototype.judgeBrowser = function() {
        //平台、设备和操作系统
        var system = {
            win: false,
            mac: false,
            xll: false,
            ipad: false
        };
        //检测平台
        var p = navigator.platform;
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        system.ipad = (navigator.userAgent.match(/iPad/i) != null) ? true : false;
        //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
        if (system.win || system.mac || system.xll || system.ipad) {
            console.log("当前为PC环境");
        } else {
            var ua = navigator.userAgent.toLowerCase();
            if(ua.match(/MicroMessenger/i)=="micromessenger") {
                console.log("当前为手机端微信环境");
                return 0
            } else {
                console.log("当前为手机端非微信环境");
                return 1
            }
        }
    }
  