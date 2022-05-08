import NaviComponent from '@/components/Navigation/navigation'
import NaviLib from './navigation_lib/index'
const Navi = new NaviLib()

/**
 * @author ZHANSHENG
 * @param {*} source={lng, lat, sName} 起点对象
 * @param {*} goto={lng, lat, eName, eAddress} 终点对象
 * @param {*} type  导航类型
 * 
 * 在 Navigation 中 进行调用分支的逻辑判断（例如，微信导航、云闪付导航等）
 */

export default function Navigation (source, goto){
    NaviComponent(source, goto)

    // if(JSON.parse(localStorage.getItem(window.location.href.split('#')[0])).login=='yunshanfu'){ // 云闪付小程序导航
    //     Navi.unionpay(source, goto)
    // }else{ // 平台无自有导航封装，调用h5导航方式---这里创建导航组件
    //     NaviComponent(source, goto)
    // }
}