import ComJs from '@/utility/generalUtil/util.js'
import Check from '@/utility/validate/validate.js'
/**
 * @author ZHANSHENG
 * @param {*} source={lng, lat, sName} 起点对象
 * @param {*} goto={lng, lat, eName, eAddress} 终点对象
 * @param {*} type  导航类型
 * @version 1.0.0
 * 
 * 高德地图 --- 火星坐标
 * 百度地图 --- 加密火星坐标
 * 腾讯地图 --- 火星坐标
 * 
 * 若不能打开对应app，可按照以下地址查询对应文档
 * 腾讯地图app --- https://lbs.qq.com/webApi/uriV1/uriGuide/uriMobileRoute
 * 腾讯地图h5  --- https://lbs.qq.com/webApi/uriV1/uriGuide/uriWebGuide
 * 
 * 高德地图app --- https://lbs.amap.com/api/amap-mobile/guide/android/navigation
 * 高德地图h5  --- https://lbs.amap.com/api/uri-api/guide/travel/route
 * 
 * 百度地图app --- https://lbsyun.baidu.com/index.php?title=uri/api/android#service-page-anchor10
 * 百度地图h5  --- https://lbsyun.baidu.com/index.php?title=uri/api/web
 * 
 * 要想通过sceme协议直接唤起对应app, 前提是手机已提前安装对应app, 否则点击链接会没有效果
 */
const check = new Check()
export default function Navigation(){}

/**
 * @param {*} source 
 * @param {*} goto 
 * 高德导航 h5
 */
Navigation.prototype.aMapH5 = function(source, goto) {
    console.log('高德导航')
    if(check.judgeSystem()=='i'){
        console.log("苹果")
        var url = encodeURIComponent(encodeURI('://path?sourceApplication=mo_ul_weixin&slat='+source.lat+'&slon='+source.lng+'&sname=四川千行你我科技有限公司&dlat='+latitude_t+'&dlon='+goto.lng+'&dname=新世纪环球购物中心&dev=0&m=0&t=0')) 
        window.location.href = 'https://mo.amap.com/applink/?schema=iosamap'+url
        // ios 中不像安卓，它只能通过 href的方式唤起导航app（iframe 没有反应）。经过测试，还不会存在下载的h5页面(当然前提是你已下载)，相当于ios可以自动识别手机是否安装软件
    }else if(check.judgeSystem()=='a'){
        console.log("安卓",source)
        var baseUri = "https://uri.amap.com/navigation?"
        var params = {
            from : source.lng+","+source.lat+","+(source.sName || '当前位置'),//导航起点
            to : goto.lng+","+goto.lat+","+(goto.eName || '油站位置'),//导航终点
            mode:"car",
            policy:1,
            src:"mypage",
            coordinate:"gaode",
            callnative:0,
        }
        var plist = []           
        for (const key in params) {
            plist.push(key+"="+encodeURIComponent(params[key]))
        }
        var pStr = plist.join("&")
        var amapUri = ''
        amapUri = baseUri + pStr
        window.location.href=amapUri
    }   
}

/**
 * @param {*} source 
 * @param {*} goto 
 * 百度导航 h5
 */
Navigation.prototype.bMapH5 = function(source, goto) {
    window.location.href = "http://api.map.baidu.com/direction?origin="+ComJs.converPosition(source.lng,source.lat).lat+","+ComJs.converPosition(source.lng,source.lat).lng+"&destination="+ComJs.converPosition(goto.lng,goto.lat).lat+","+ComJs.converPosition(goto.lng,goto.lat).lng+"&mode=driving&region="+goto.eName+"&output=html"    
}

/**
 * @param {*} source 
 * @param {*} goto 
 * 腾讯导航 h5
 */
Navigation.prototype.tMapH5 = function(source, goto) {
    window.location.href='https://apis.map.qq.com/uri/v1/routeplan?type=drive&from=当前位置&fromcoord='+source.lat+','+source.lng+'&to='+(source.eName||'终点为值')+'&tocoord='+goto.lat+','+goto.lat+'&policy=1&referer=yxpt'
}

/**
 * @param {*} source 
 * @param {*} goto 
 * 高德导航 直接唤起高德app
 */
Navigation.prototype.aMapApp = function(source, goto) {
    if(check.judgeSystem()=='i'){
        let a = document.createElement('a')
        a.setAttribute('href', 
            `iosamap://navi?sourceApplication=applicationName&poiname=${goto.eName}&lat=${goto.lat}&lon=${goto.lng}&dev=1`
        )
        document.body.appendChild(a)
        a.click()
    }else if(check.judgeSystem()=='a'){
        let a = document.createElement('a')
        a.setAttribute('href', 
            `androidamap://navi?sourceApplication=applicationName&poiname=${goto.eName}&lat=${goto.lat}&lon=${goto.lng}&dev=1`
        )
        document.body.appendChild(a)
        a.click()
    }
}


/**
 * @param {*} source 
 * @param {*} goto 
 * 百度导航 直接唤起百度app
 */
Navigation.prototype.bMapApp = function(source, goto) {
    if(check.judgeSystem()=='i'){
        let a = document.createElement('a')
        a.setAttribute('href', 
            `baidumap://map/navi?location=${goto.lat},${goto.lng}&coord_type=gcj02&src=ios.baidu.openAPIdemo`
        )
        document.body.appendChild(a)
        a.click()
    }else if(check.judgeSystem()=='a'){
        let a = document.createElement('a')
        a.setAttribute('href', 
            `baidumap://map/navi?location=${goto.lat},${goto.lng}&coord_type=gcj02&src=andr.baidu.openAPIdemo`
        )
        document.body.appendChild(a)
        a.click()
    }
}

/**
 * 云闪付 导航
 * @param {*} source 
 * @param {*} goto 
 * 
 * 前提条件
 *   须要事先引入https://open.95516.com/s/open/js/upsdk.js，
 *   并且在upsdk.pluginReady 之后调用 
 */
Navigation.prototype.unionpay = function(source, goto) {
    upsdk.navi({
        sLat: source.lat+'', // 起点纬度
        sLon: source.lng+'', // 起点经度
        sName: source.sName||'当前位置', // 起点名称
        dLat: goto.lat+'', // 终点维度
        dLon: goto.lng+'', // 终点经度
        dName: goto.eAddress, // 终点名称
        success:function(suc){ 
          console.log("云闪付导航成功:",suc)
        }, 
        fail: (msg) => { 
          console.log("打开云闪付导航失败",msg)
        }
    })
}

/**
 * 微信网页 导航
*    须要事先引入https://res2.wx.qq.com/open/js/jweixin-1.6.0.js，
 *   并且在调接口成功加载jssdk 之后调用 
 */
Navigation.prototype.wechat = function(source, goto) {
    wx.openLocation({
        latitude: parseFloat(goto.lat), // 纬度，浮点数，范围为90 ~ -90
        longitude: parseFloat(goto.lng), // 经度，浮点数，范围为180 ~ -180。
        name: goto.eName, // 位置名
        address:goto.eAddress, // 地址详情说明
        scale: 13, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
        success: function () {
            console.log('打开地图成功');
        }
    })
}

