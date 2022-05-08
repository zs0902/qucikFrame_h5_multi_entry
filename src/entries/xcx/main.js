import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";

/**
 *  字体图标
 * */ 
import '@/assets/font/iconfont.css'

/**
 * vconsloe 调试
 */
import '@/utility/vconsole.js'
import "@/utility/init.js" 

/**
 *  通过babel-plugin-import 自动按需引入vant组件
 * */  
import { Button, Toast, Dialog, Picker, Popup, Field, AddressList, AddressEdit, CellGroup, Cell, Icon, Tab, Tabs, GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Field)
Vue.use(AddressList)
Vue.use(AddressEdit)
Vue.use(CellGroup)
Vue.use(Cell)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);

/**
 *  动态设置标题
 * */  
Vue.use(require('vue-wechat-title'))

// 注入全局组件
import GlobalComponents from '@/utility/globalRegister/globalComponents'
Vue.use(GlobalComponents)

/**
 * 全局过滤器
 */
import filter from '@/utility/filter.js'
Vue.filter('valuefilter',function(value,valuePipe){
  return filter.valuefilter(value,valuePipe)
})

/**
 *  自定义工具类
 * */ 
import {post, get} from '@/utility/http.js'
import DateUtility from '@/utility/date/date.js'
import generalUtil from '@/utility/generalUtil/util.js'
import Check from '@/utility/validate/validate.js'

Vue.prototype.DateUtility = new DateUtility()
Vue.prototype.$post = post
Vue.prototype.$get = get
Vue.prototype.generalUtil = generalUtil
Vue.prototype.$check  = new Check()

/**
 * 通用api封装
 */
import GetLocation from '@/methodsApi/location.js' // 获取用户定位
import Payment from '@/methodsApi/payment.js' // 唤起支付控件
Vue.prototype.GetLocation = GetLocation
Vue.prototype.Payment = Payment

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: (h) => h(App),
}).$mount("#app");

/**
 *  路由跳转的时候清除一些页面状态
 * */ 
router.beforeEach((to,from,next)=>{
	Vue.prototype.$dropDown.delete()
  Vue.prototype.$listEmpty.close({parentEl: document.querySelector('.list_box')}) // 这里 list_box 根据页面实际加empty的盒子决定, 绝对定位在盒子中心位置
  Vue.prototype.$listLoading.close({parentEl: document.querySelector('.list_box')}) // 这里 list_box 根据页面实际加loading的盒子决定, 绝对定位在盒子中心位置
  next()
})
