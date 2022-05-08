// 做一些全局统一的初始化处理

/**
 * 重构 Number toFixed 方法
 * @param {*} s 
 * @returns 
 */
Number.prototype.toFixed=function(s) {//重写toFixed
    const adjust = this >= 0 ? 0.5 : -0.5;
    // _data 为四舍五入过后的值
    let _data = (parseInt(this * Math.pow( 10, s ) + adjust)/ Math.pow( 10, s )).toString();
    // 经过以上处理，完善了原本toFixed的四舍五入方法，但是会剔除小数位最后的0
    // 例如10,原本 toFixed(2) 的结果为10.00, 经过如上处理过后，结果为10,所以需要自动补零操作 
    // 复原原本toFixed方法的保留小数位的特性
    if(_data.toString().split('.').length==1){
        return _data+'.'+'0'.repeat(s)
    }else if(_data.toString().split('.')[1].length<=s){
        return _data+'0'.repeat(s-_data.toString().split('.')[1].length)
    }
}

/**
 * 对含特定内容的字符串进行特定内容的替换（占位符替换）
 * eg: link:'http://h5.ypsg.100bm.cn/#/tab?promotePlat=3&extUserId={openid}&merchantId={merchantid}',
 * 替换{openid}以及{merchantid}  link.format({openid:'123',merchantid:'888'})
 */
String.prototype.format = function(args) {
    var result = this;
    // arguments 代表函数实参内容
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key]!==undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题
                    var reg2= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg2, arguments[i]);
                }
            }
        }
    }
    return result;
}