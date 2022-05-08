<template>
  <keep-alive :include="keepAliveList">
    <router-view v-wechat-title="$route.meta.title" ref="son"></router-view>
  </keep-alive>
</template>

<script>
/**
 * 为了减轻项目代码冗余，以及优化业务页面代码逻辑，是业务代码更专注于业务处理
 * 现在将一些处理抽出放到App.vue 做全局应用处理
 */
export default {
  name: 'App',
  data() {
    return {
      keepAliveList: ['Home']
    }
  },
  methods: {
    setRem() {
      let deviceWidth = document.documentElement.clientWidth;
      document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
      document.body.style.fontSize = "14px"; // 在body上将字体还原大小，避免页面无样式字体超大
      if (deviceWidth > 750) {
        deviceWidth = 750;
        document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
      }
    },
    pageHideAndShow(){
      if (document.visibilityState === 'hidden') { // 当页面由前端运行在后端时，出发此代码 
        console.warn('页面隐藏了', this.$route.name) 
      } 
      if (document.visibilityState === 'visible') { // 当页面由隐藏至显示时 
        console.warn('页面回来了',this.redirectPage) 
      } 
    },
  },
  watch:{
    '$store.state.loginStatus'(val) {
      console.warn("页面监听到登录状态异常，异常值为：",val)
      if(val.indexOf('401')>-1){
        // 统一在这里面进行唤起登录的操作（具体根据业务环境具体处理，例如微信公众号：直接跳转三方授权code页面；有登陆弹框唤起弹框；有登陆页面，跳转页面等等；）
        // this.$router.replace({name: 'Login'})

        // 函数式组件唤起登录
        this.LoginByPhoneNo().then(res => {
          console.error('登录成功:', res)
          // 这里登录成功过后，就可以根据对应的store里面设置的funcName，再次触发后续方法
          // this.$refs.son[this.$store.state.funcName]()
        }).catch(err => {
          console.error('登录异常:', err)
        })
      }
    },
  },
  created() {
    this.setRem();
    // 全局监听页面进入后台运行
    document.addEventListener("visibilitychange", this.pageHideAndShow)
  }
}

</script>
<style>
* {padding: 0; margin: 0;} 
html,body{
  height: 100% !important; background: #f5f5f5;
}
</style>
