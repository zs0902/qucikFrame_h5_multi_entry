import {post} from '@/utility/http.js'

export default function Payment() {}

/**
 * 微信公众号支付
 * 
 * 商户实际的支付目录必须和在微信支付商户平台设置的一致，否则会报错“当前页面的URL未注册：”
 * 还有一系列前提条件，可以参考文档
 * 
 * 这个无需配置回调地址，因为能捕获支付结果
 * 
 * 参考文档：https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_3.shtml
 */
Payment.prototype.offiaccount = function(orderNo) {
    return new Promise((resolve,reject)=>{
        post("/order/pay", {orderNo:orderNo, payType:'2'}).then(res => {
            if(res.code == "success"){
                if(res.result.success=="true" && res.result.errcode == "000000"){
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', paymentCall, false)
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', paymentCall)
                            document.attachEvent('onWeixinJSBridgeReady', paymentCall)
                        }
                    }else{
                        let dataJson={
                            "appId":res.result.appId,     //公众号名称，由商户传入     
                            "timeStamp":res.result.timeStamp,         //时间戳，自1970年以来的秒数     
                            "nonceStr":res.result.nonceStr, //随机串     
                            "package":res.result.packageValue,     
                            "signType":res.result.signType,         //微信签名方式：     
                            "paySign":res.result.paySign //微信签名 
                        }
                        WeixinJSBridge.invoke('getBrandWCPayRequest', dataJson, res => {
                            WeixinJSBridge.log(res.err_msg);
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                resolve({code:'success', type: '微信公众号支付', data: '用户已使用微信公众号支付完成支付'})
                            } else if (res.err_msg == "get_brand_wcpay_request:cancel" ) {
                                reject({code:'fail', type: '微信公众号支付', data:'已取消支付'})
                            } else {
                                reject({code:'fail', type: '微信公众号支付', data:'支付失败'})
                            }
                        })
                    } 
                }else{
                    reject({code:'fail', type: '微信公众号支付', data:res.result.errmsg})
                }
            }else{
                reject({code:'fail', type: '微信公众号支付', data:'根据平台订单号获取微信公众号支付参数失败'})
            }
        }).catch(err => {
            reject({code:'fail', type: '微信公众号支付', data:'微信公众号支付流程异常'})
        })
    })
}

/**
 * 微信浏览器环境 h5 跳转小程序支付页面，唤起支付
 * 
 * 这个得借助认证的公众号appid，配置wxjssdk 开放标签wx-open-launch-weapp 过后方能正常跳转指定小程序
 * 参考文档：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_Open_Tag.html
 */
Payment.prototype.wxh5_miniapp = function() {
    return new Promise((resolve, reject) => {
        location.href = "https://www.baidu.com"
        resolve({code: 'success', type: '测试'})
    })
}

/**
 * 非微信浏览器唤起微信app支付
 * 
 * 前提说明
 *   准备唤起微信支付收银台的h5域名必须在微信商户平台里名对应商户号配置权限
 * 
 * 参考文档：https://pay.weixin.qq.com/wiki/doc/apiv3/open/pay/chapter2_6_2.shtml
 */
Payment.prototype.h5_app = function(orderNo) {

    return new Promise((resolve, reject) => {
        post('/wechat/pay/mweb',{orderId:orderNo,tradeType:"MWEB",redirect_url: encodeURI(redirect_url)}).then(res=>{
            if(res.code == "success"){
                resolve({code: 'success', type: '微信h5支付', data: res.result.mwebUrl})
            }else{
                reject({code: 'fail', type: '微信h5支付', data: '非微信浏览器h5唤起微信app支付失败1'})
            }
        }).catch(err => {
            reject({code: 'fail', type: '微信h5支付', data: '非微信浏览器h5唤起微信app支付失败2'})
        })
    })
}

/**
 * 非微信浏览器环境h5页面唤起微信小程序支付页面支付（非微信浏览器h5跳转微信小程序）
 * 前提说明
 *   要提前引入https://res.wx.qq.com/open/js/cloudbase/1.1.0/cloud.js
 * 
 * 参考文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/staticstorage/jump-miniprogram.html
 */
Payment.prototype.h5_miniapp = function(orderNo) {

    return new Promise((resolve, reject) => {
        try {
            openWeapp(orderNo, resolve)
        } catch (error) {
            reject({code: 'fail', type: '非微信浏览器环境h5唤起小程序支付', data: '非微信浏览器h5唤起微信小程序支付失败2'})
        }
    })
}

/**
 * 微信小程序环境跳转微信小程序支付页面进行支付
 * 前提说明
 *   这是同一套h5页面直接通过小程序webview的形式嵌入小程序的情况
 * 判断是在小程序环境，直接跳转到对应的支付页面，根据平台订单号，唤起支付即可
 * 
 * 参考文档： https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html
 */
Payment.prototype.h5_miniapp = function(orderNo) {

    return new Promise((resolve, reject) => {
        post("order/pay", {orderNo:orderNo,payType:'4'}).then(res=>{
            if(res.code == "success"){
                if(res.result.success=="true" && res.result.errcode == "000000"){
                    self.isPay = false
                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', paymentCall, false)
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', paymentCall)
                            document.attachEvent('onWeixinJSBridgeReady', paymentCall)
                        }
                    } else {
                        var payParam = {
                            "appId":res.result.appId,     //外刊小程序appid
                            "timeStamp":res.result.timeStamp, //时间戳，自1970年以来的秒数
                            "nonceStr":res.result.nonceStr, //随机串
                            "package":res.result.packageValue,
                            "signType":res.result.signType,//微信签名方式：
                            "paySign":res.result.paySign//微信签名
                        };
                        console.log(res,'支付res')

                        //定义path 与小程序的支付页面的路径相对应
                        var path = `/pages/pay/pay?orderNo=${orderNo}&payPageSource=${payPageSource}&orderDetail=${JSON.stringify(orderDetail)}&sid=${localStorage.getItem("sid")}&payParam=${encodeURIComponent(JSON.stringify(payParam))}&module=${window.urlData.module}&carrierno=${window.urlData.carrierno}`;
                        //通过JSSDK的api跳转到指定的小程序页面
                        wx.miniProgram.navigateTo({url: path});
                    } 
                }else{
                    reject({code: 'fail', type: '微信小程序webview页面跳转支付页面', data: '根据平台订单号获取微信小程序webview页面跳转支付页面参数异常1'})
                }
            }
        }).catch(err => {
            reject({code: 'fail', type: '微信小程序webview页面跳转支付页面', data: '根据平台订单号获取微信小程序webview页面跳转支付页面参数异常2'})
        })
    })
}

/**
 * 云闪付app支付
 * 
 * @param {*} orderNo 
 * @param {*} self 
 * @param  {...any} args 
 * 前提条件
 *   须要事先引入https://open.95516.com/s/open/js/upsdk.js，
 *   并且在upsdk.pluginReady 之后调用 
 * 
 * 参考文档：https://opentools.95516.com/applet/#/
 */
Payment.prototype.unionpay = function() {
    return new Promise(() => {
        post('/order/pay', {orderNo, payType: 10}).then(res => {
            if(res.code === 'success'&&res.result.tn){
                upsdk.pay({
                    tn: res.result.tn,
                    success: function(){
                        console.log("唤起云闪付支付————支付成功")
                        resolve({code: 'success', type: '云闪付小程序支付', data:'用户成功完成云闪付支付'})
                    },
                    fail: function(err){
                        // 支付失败, err.msg 是失败原因描述, 比如 TN 号不合法, 或者用户取消了交易等等。
                        console.log("唤起云闪付支付————支付失败",err)
                        reject({code: 'fail', type: '云闪付小程序支付', data: err.msg})
                    }
                });
            }else {
                reject({code: 'fail', type: '云闪付小程序支付', data: '根据平台订单号获取支付流水号失败1'})
            }
        }).catch(err => {
            reject({code: 'fail', type: '云闪付小程序支付', data: '根据平台订单号获取支付流水号失败2'})
        })
    })
}

/**
 * 支付宝h5支付
 * 
 * @param {*} orderNo 
 * @param {*} self 
 * @param  {...any} args 
 * 
 * 手机浏览器h5页面调用支付宝h5支付
 */
Payment.prototype.alih5 = function(orderNo) {
    
    return new Promise((resolve, reject) => {
        post('/order/pay', {orderNo, payType: 14, backUrl: redirect_url}).then(res => {
            if(res.code === 'success'&&res.result.url){
                resolve({code: 'success', type: '支付宝h5支付', data: res.result.url})
            }else{
                reject({code:'fail', type:'支付宝h5支付', data:'获取支付宝h5支付地址失败1',})
            }
        }).catch(err => {
            reject({code:'fail', type:'支付宝h5支付', data:'获取支付宝h5支付地址失败2',})
        })
    })
}

/**
 * 支付宝小程序支付
 * 
 * @param {*} orderNo 
 * @param {*} self 
 * @param  {...any} args 
 * 
 * 手机浏览器h5页面调用支付宝h5支付
 */
Payment.prototype.alih5 = function(orderNo) {
    
    return new Promise((resolve, reject) => {
        // 根据平台订单号获取阿里订单号，然后调起支付
        post('/order/pay',{orderNo:orderNo,payType:'5'}).then(res => {
            if(res.code == 'success'&&res.result.tradeNo){
                my.tradePay({
                    // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
                    tradeNO: res.result.tradeNo,
                    success: (res) => {
                        console.log("唤起支付宝小程序成功")
                        if(res.resultCode==9000){
                            resolve({code: 'success', type: '支付宝小程序支付', data: '用户支付成功'})
                        }else{
                            reject({code: 'fail', type: '支付宝小程序支付', data: '用户取消支付'})
                        }
                    },
                    fail: (res) => {
                        reject({code: 'fail', type: '支付宝小程序支付', data: res})
                    }
                });
            }
        }).catch(err => {
            reject({code: 'fail', type: '支付宝小程序支付', data: '根据平台订单号获取阿里订单号失败'})
        })
    })
}



/**
 * 天府银行app支付
 * 
 * @param {*} orderNo 
 * @param {*} self 
 * @param  {...any} args 
 * 
 */
Payment.prototype.tfBank = function(orderNo) {
    return new Promise((resolve, reject) => {
        post("/order/pay", {orderNo:orderNo,payType:'9',token:localStorage.getItem('token'),quitUrl:redirect_url}).then(res => {
            if(res.code == "success"){
                resolve({code:'success', type:'天府银行支付', data:res.result.data})
            }else{
                reject({code:'fail', type:'天府银行支付', data:res.message})
            }
        }).catch(err => {
            reject({code:'fail', type:'天府银行支付', data:'天府银行支付唤起异常'})
        })
    })
}

/**
 * 农信银行app支付
 * 
 * @param {*} orderNo //需要唤起支付的平台订单号
 * @param {*} self //调用方法的上下文
 * @param  {...any} args //其他不定参数
 * 
 * 这里的接口地址，payType等差异化内容不暴露出去，防止外部调用时逻辑处理过多。直接差异化配置在方法里，有需要手动修改即可
 */
Payment.prototype.scrcu = function(orderNo) {

    return new Promise((resolve, reject) => {
        // 请求支付跳转地址
        post('/order/pay',{orderNo:orderNo,payType:15,returnUrl:redirect_url}).then(res=>{
            if(res.code == 'success'){
                resolve({code: 'success', type: '农信支付', data: res.result.cashierPayHtml})
            }else{
                reject({code:'fail', type:'农信支付', data:'获取农信支付地址失败1',})
            }
        }).catch(err => {
            reject({code:'fail', type:'农信支付', data:'获取农信支付地址失败2',})
        })
    })
}

/**
 * 中行app支付
 * 
 * @param {*} orderNo 
 * @param {*} self 
 * @param  {...any} args 
 * 
 * 暂未开发
 */

let openWeapp = async function(orderNo, resolve) {
    var c = new cloud.Cloud({
        // 必填，表示是未登录模式
        identityless: true,
        // 资源方 AppID
        resourceAppid: 'wx38f3af0ebd8bf2fc', // <!-- replace -->
        // 资源方环境 ID
        resourceEnv: 'cloud1-7gqg7fu085c37388', // <!-- replace -->
    })
    await c.init()
    window.c = c
    var c = window.c
    const res = await c.callFunction({
        name: 'urlscheme',
        data: {
            sid: localStorage.getItem('sid'),
            orderNo: orderNo
        },
    })
    console.log("小程序跳转链接:",res.result.openlink)
    resolve({code: 'success', type: '非微信浏览器环境h5唤起小程序支付', data: res.result.openlink})
} 