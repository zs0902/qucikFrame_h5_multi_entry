import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "*", redirect: {name: '样例测试'} },
  { path: "/", name: "Home", component: () => import(/* webpackChunkName: 'Home' */ "@/views/Home.vue"), meta:{ title: '首页' } },
  // { path: "/", name: "Login", component: () => import("@/views/Login.vue"), meta:{ title: '登录' },children: [ 
  //   { path: "home", name: "Home", component: () => import("@/views/Home.vue"), meta:{ title: '首页' } },
  // ] },

  { path: "/address", name: "Address", component: () => import(/* webpackChunkName: 'Address' */  "@/views/address.vue"), meta:{ title: '新增地址' } },

  { path: "/test", name: "样例测试", component: () => import(/* webpackChunkName: 'Address' */  "@/views/test/test.vue"), meta:{ title: '样例测试' } },
];

const router = new VueRouter({
  mode: process.env.NODE_ENV === 'production'?"history":"hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {  // 解决不同页面滚动条相互影响
    return { x: 0, y: 0 }
  }
});

export default router;
