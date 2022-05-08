<template>
  <div class="home" >
    <div ref="vueDomSaveToImage">
      <van-button type="primary" @click="testClick">主要按钮</van-button>
      <!-- <div @click.capture="clear">
        <span @click.stop.prevent="test">{{test_data|valuefilter({tof: '你好,我好'})}}</span>
      </div> -->

      <div class="list_box" id="extend_test">{{test_data}}</div>

      <img src="https://192.168.5.187:8087/2021/11/362bmzv598.png" alt="" style="width: 1rem;height: 1rem"> <br>

      <!-- 以下是对一些修饰符做记录 -->
      <!-- 只触发一次 -->
      <button @click.once="test($event)">点击只触发一次</button> <br>
      <!-- 捕获delete按键 -->
      <input v-on:keyup.delete="testDataa = null" v-model="testDataa"> <br>
      <!-- Alt + C 进行清空输入框-->
      <input v-on:keyup.alt.67="test_data = null" v-model.lazy="test_data"> <br>
      <!-- Alt + C 进行其它操作-->
      <input v-on:keyup.alt.67="doSomething" v-model.number="test_data" type="number"> <br>
      <!-- Ctrl + Click 进行其它操作-->
      <div v-on:click.ctrl="doSomething">Ctrl + Click 触发</div> <br>
      <!-- 有且只有 Ctrl 被按下的时候才触发 -->
      <button v-on:click.ctrl.exact="doSomething">有且只有 Ctrl 被按下的时候才触发</button> <br>
      <!-- 没有任何系统修饰符被按下的时候才触发 --> 
      <button v-on:click.exact="doSomething">只允许单纯的点击触发</button> <br>

      <!-- 收货地址管理 -->
      <AddressPop ref="address" :list="addressList" @select="addressSelect"></AddressPop>
    </div>
    <van-button type="primary" @click="saveImg">保存为图片</van-button>
  </div>
</template>

<script>
import PinyinUtil from '@/utility/pinyin/pinyinUtil.js'
import Ws from '@/methodsApi/webSocket/webSocket.js'
import AddressPop from "@/components/addressList.vue"
import Vue from 'vue'

import html2canvas from 'html2canvas'
export default {
  name: 'Home',
  components: {
    AddressPop
  },
  data() {
    return {
      test_data: 0,
      testDataa: 'asd123',
      addressList: [],
      test_list: ['123'],
      test_obj: {name: ''},
    }
  },
  watch: {
    test_list(newVal, oldVal){
      console.log('监听到数组变换:', newVal, oldVal)
    },
    test_obj(newVal, oldVal){
      console.log('监听到对象变化:', newVal, oldVal)
    }
  },
  mounted() {
    localStorage.setItem('abc_test', 'abc+test')
    sessionStorage.setItem('wahaha_test', 'wahaha+test')
    /**
     * 实现loading 效果追随parentEl,并显示在parentEl正中间
     */
    this.$listLoading.show({message: '数据加载中，请稍后', parentEl: document.body.querySelector('.list_box'), domNode: '#extend_test'})
    // this.testClick()
  },
  methods: {
    saveImg() {
      this.$nextTick(()=>{
        html2canvas(this.$refs.vueDomSaveToImage).then(res=>{
          let imgUrl = res.toDataURL('image/png')
          console.log('图片临时地址',imgUrl)
          let aLink = document.createElement('a');
          aLink.href = imgUrl;
          aLink.download = new Date().toLocaleString() + '.png';	//导出文件名，这里以时间命名
          document.body.appendChild(aLink);
		  // 模拟a标签点击事件
          aLink.click()
		  // 事件已经执行，删除本次操作创建的a标签对象
          document.body.removeChild(aLink)
          // // 以服务的方式调用的 Loading 需要异步关闭
          setTimeout(() => {
			        console.log('图片导出成功')
            }, 10);
          })
      })
    },
    testData() {
      /**
       * 日期格式化
       */
      let formatDate = this.DateUtility.Format('MM/dd', new Date())
      console.log("日期工具类调用结果:", formatDate)

      /**
       * 真正意义上的四舍五入
       */
      console.log("重构toFixed后：", 1.335.toFixed(2))
    },
    testClick() {
      /**
       * 模拟接口 401，触发登录组件弹窗
       */
      // this.$store.commit('setLoginStatus','401'+new Date().getTime())

      /**
       * 自定义底部上拉弹框，选择组件，适用于表单项
       */
      // let genderList = [{text:'男', gender: 0, genderName: '男'}, {text:'女', gender: 1, genderName: '女'}]
      // this.$popSelect({value: genderList, title: '选择性别'}).then(res => {
      //   console.log("组件返回内容为：", res)
      // })

      /**
       * 模拟微信，右上角点击下拉出操作选项框
       */
      // let opList = [{icon: '', option: '操作1'},{icon: '', option: '操作2'}]
      // this.$pulldownSelect({opList}).then(res => {
      //   console.log('选择的操作内容为:',res)
      // })

      /**
       * 定位解决方案
       */
      // this.GetLocation().then(res => {
      //   console.log("系统最终定位结果为:", res)
      // })

      /**
       * 自定义导航组件弹窗
       * 可以传入一个对象参数，里面有两个属性，source/goto 分别表示起点信息和终点信息
       */
      // this.$navigation()

      /**
       * 支付解决方案
       */
      // this.Payment()
      

      /**
       * 创建webSocket 链接
       */
      // let ws = new Ws("ws://192.168.7.160:8099",{userId:'ikk'})
      // ws.init().then(res => {
      //   console.log('连上websocket 过后:',res)
      // }).catch(err => {
      //   console.log('连接异常:', err)
      // })

      // console.log('生成guid:', this.generalUtil.getGuid()) 

      // this.$refs.address.addressPopShow = true

      // this.$router.push({name: 'Address'})

      // mock 模拟接口返回数据
      this.$post('/user/userinfo', {name: 'zs', id: '213'}).then(res => {
        console.log('本地模拟数据:', res)
      })
    },

    addressSelect(e){
      console.log("选择内容为:",e)
      this.addressId = e.addressId
      this.detailAddress = e.addressDetail
      this.$refs.address.showPop=false
    },

    test(e) {
      console.log('e is :', e, e.preventDefault())
      console.log('按键码---回车按键')
    },
    clear() {
      console.log('Alt+c 进行清除')
      console.dir()
    },
    doSomething() {
      console.log('ctrl+click才能实现点击效果')
    }
  }
};
</script>

<style lang="less" scoped>
.list_box {
  position: relative;
  width: 6rem;
  height: 6rem;
  background-color: pink;
}
</style>
