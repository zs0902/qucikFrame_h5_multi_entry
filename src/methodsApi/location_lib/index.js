import AMap from "AMap"
export default function GetLocation(){}

/**
 * @author ZHANSHENG
 * @param {*} 无
 * @version 1.0.0
 */

/**
 * 关于坐标系:
 *  地球坐标系——WGS84：常见于 GPS 设备，Google 地图等国际标准的坐标体系。
 *  火星坐标系——GCJ-02：中国国内使用的被强制加密后的坐标体系，高德坐标就属于该种坐标体系。
 *  百度坐标系——BD-09：百度地图所使用的坐标体系，是在火星坐标系的基础上又进行了一次加密处理。
 */

 /**
 * 关于以下几种定位的说明（基于测试）
 * 1、首先说明，微信定位（包括其他微信jssdkApi）只能在微信环境中使用；
 * 2、在正常开启手机定位的情况下，几种定位方式皆能正常取到用户位置信息，其中，经测试，定位耗时：网页<百度<高德<微信jssdk
 * 3、在关闭定位开启wifi的情况下，只有高德可以获取定位(但测试，耗时基本在10s左右)
 * 4、在关闭定位关闭wifi的情况下，定位都无法获取经纬度
 * 5、在浏览器中，关于定位授权弹框应该只能弹第一次，不管用户第一次同意或者拒绝定位授权
 *    都会在第一次被存入缓存，之后便不会弹框了（点击同意过后不会像微信定位授权那样，自动跳到系统设置，去开启手机定位，也就是说定位授权弹框和手机定位开启
 *    与否无关，只是单纯询问）
 * 6、某些浏览器（如微信浏览器）为了提高安全限制，限制协议为https的网页才能正常取到定位数据，并且项目中所有引入的js 也需要是https的
 */



/**
 * 云闪付定位
 * 
 * 前提条件：
 *  需要事先引入https://open.95516.com/s/open/js/upsdk.js，
 *  并且在upsdk.pluginReady 之后调用
 * 
 * 定位结果是基于高德坐标系
 */
GetLocation.prototype.unionpay = function () {
    return new Promise((resolve, reject) => {
        upsdk.getLocationGps({
            success: (r) => {
                console.log("云闪付定位结果:",r)
                /**
                 * 云闪付在安卓的定位结果是字符串，ios系统为对象，所以要根据系统区别处理
                 */
                let longitude = localStorage.getItem('os_system')==='a'?JSON.parse(r).longitude.toString():r.longitude.toString()//JSON.parse(r).longitude
                let latitude =  localStorage.getItem('os_system')==='a'?JSON.parse(r).latitude.toString():r.latitude.toString()//JSON.parse(r).latitude
                resolve({
                    code: 'success',
                    lat: latitude,
                    lng: longitude,
                    type: "云闪付小程序"
                })
            },
            fail: (err) => {
                reject({code: 'fail', mes: '云闪付定位失败'+err})
            }
        });
    })
}

/**
 * 微信jssdk定位
 * 
 * 前提条件
 *  须事先引入https://res2.wx.qq.com/open/js/jweixin-1.6.0.js
 *  并成功加载jssdk过后方能正常使用
 * 
 * 定位坐标系可根据参数type 来区分
 */

GetLocation.prototype.wechat=function(){
    return new Promise((resolve, reject) => {
            let startTime = Date.now()
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success:(res) => {
                    if(res.errMsg="getLocation:ok"){
                        let endTime = Date.now()
                        console.warn("微信耗时："+(endTime-startTime)/1000+'s')
                        console.log('微信定位结果:', res)
                        resolve({
                            code: 'success',
                            lat: res.latitude,
                            lng: res.longitude,
                            type: "微信网页定位"
                        })
                    }
                },
                fail: function(err){
                    console.log('微信定位失败:',err); 
                    reject({code: 'fail', mes: '微信网页定位失败'+err})
                }
            })
        
    })
}

/**
 * 高德定位  (目前这个定位时间最长，而且时间飘忽不定，有一定差异)
 */
GetLocation.prototype.aMap = function(){
    //加载地图，调用浏览器定位服务   高德地图
    return new Promise((resolve, reject) => {
        var map = new AMap.Map('container', { resizeEnable: true });
        map.plugin('AMap.Geolocation', function() {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000, //超过10秒后停止定位，默认：无穷大
                buttonPosition: 'RB',
            });
            map.addControl(geolocation) // 把定位插件加入地图实例
            let startTime = Date.now()
            geolocation.getCurrentPosition();
            AMap.event.addListener(geolocation, 'complete', function onComplete(data) {
                let endTime = Date.now()
                console.warn("高德定位耗时："+(endTime-startTime)/1000+'s')
                console.log("高德定位结果:",data.position)
                resolve({
                    code: 'success',
                    lat: data.position.lat,
                    lng: data.position.lng,
                    type: "高德定位"
                })
            }); 
            AMap.event.addListener(geolocation, 'error', function onError(err) {
                //返回定位出错信息
                console.log("高德定位失败",err)
                reject({code: 'fail', mes: '高德网页定位失败'+err})
            }); 
        })
    })
}

/**
 * 普通网页定位
 * 
 * 定位结果基于WGS84
 */
GetLocation.prototype.web = function(){
    return new Promise((resolve, reject) => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionError,{
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge:30000000
            })
        }else{
            reject({code:'fail', mes: '浏览器不支持使用HTML5来获取地理位置服务'})
        }
        //定位数据获取成功响应
        let startTime = Date.now()
        function getPositionSuccess(position){
            let endTime = Date.now()
            console.error("网页定位耗时："+(endTime-startTime)/1000+'s')
            console.log("网页定位结果:",position.coords.longitude,position.coords.latitude)
            // 由于我们使用的高德地图，所以需要将此坐标转换为高德坐标系 (关于坐标系转换还有其他方法，此处用高德api进行转换)
            let posi = [position.coords.longitude, position.coords.latitude]
            AMap.convertFrom(posi, 'gps', function (status, result) {
                if (result.info === 'ok') {
                    let endTime = Date.now()
                    console.error("网页定位转换最终耗时："+(endTime-startTime)/1000+'s')
                    console.log("网页转高德坐标结果:", result.locations)
                    resolve({
                        code: 'success',
                        lat: result.locations[0].lat,
                        lng: result.locations[0].lng,
                        type: "网页定位"
                    })
                }else{
                    reject({code:'fail', mes: '网页定位转高德坐标失败'+reslut}) //经纬度转换失败
                }
            });
        }
        //定位数据获取失败响应
        function getPositionError(error) {
            console.log("网页定位失败",error,error.code)
            var errMsg = ''
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    errMsg = "您拒绝对获取地理位置的请求";
                    break;
                    
                case error.POSITION_UNAVAILABLE:
                    errMsg = "位置信息是不可用的";
                    break;
                case error.TIMEOUT:
                    errMsg = "请求您的地理位置超时"
                    break;
                case error.UNKNOWN_ERROR:
                    errMsg = "未知错误"
                    break;
            }
            reject({code: 'fail', mes: '网页定位失败'+errMsg})
        }
    })
}

/**
 * 百度定位
 */
GetLocation.prototype.bMap=function(){
    return new Promise((resolve, reject) => {
        var geolocation = new BMap.Geolocation({});

        let startTime = Date.now()
        geolocation.enableSDKLocation();// 开启SDK辅助定位
        geolocation.getCurrentPosition( function(r) {
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                let endTime = Date.now()
                console.log("百度定位结果",r.point)
                console.error("百度耗时："+(endTime-startTime)/1000+'s')
                let posi = [r.point.lng, r.point.lat]
                AMap.convertFrom(posi, 'baidu', function (status, result) {
                    if (result.info === 'ok') {
                        console.log("百度转高德坐标结果:", result.locations)
                        resolve({
                            code: 'success',
                            lat: result.locations[0].lat,
                            lng: result.locations[0].lng,
                            type: "百度定位"
                        })
                    }else{
                        reject({code:'fail', mes: '百度转高德失败'+result}) //经纬度转换失败
                    }
                })
            }else {
                console.log('百度定位失败：'+this.getStatus());
                reject({code:'fail', mes: '百度定位失败'+this.getStatus()})
            }        
        })
    })
}

/**
 * 高德api 根据经纬度获取具体位置信息
 */
GetLocation.prototype.getAddress = function() {
    return new Promise((resolve, reject) => {
        let geocoder = new AMap.Geocoder({
            city: ""//城市，默认：“全国”
        });
        console.log("高德坐标信息:",lnglat)
        geocoder.getAddress(lnglat, (status, result) => {
            if (status === 'complete'&&result.regeocode) {
                console.log("地址获取成功,", result)
                resolve({code: 'success', data: result})
            }else{
                console.log('根据经纬度查询地址失败', status, result)
                reject({code: 'fail', data: '根据经纬度查询地址失败'})
            }
        });
    })
}