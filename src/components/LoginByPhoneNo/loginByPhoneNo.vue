<template>
    <div class="save-phone-box">
        <div class="save-phone-main">
            <div class="save-phone-content">
                <div class="save-phone-item">
                    <img src="@/assets/images/phone-icon.png" />
                    <van-field v-model="showData.phoneNo" center clearable placeholder="请输入手机号" maxlength="11" />
                </div>
                <div class="save-phone-item">
                    <img src="@/assets/images/code-icon.png" />
                    <van-field v-model="showData.code" center clearable placeholder="请输入短信验证码">
                        <template #button>
                            <van-button size="small" color="#EF4646" @click="sendCode" :disabled="showData.phoneNo.length!=11||showData.codeSendMes!='获取验证码'">{{showData.codeSendMes}}</van-button>
                        </template>
                    </van-field>
                </div>

                <div class="xeiyi">
                    <img src="@/assets/images/agree-before.png" alt="" v-if="!showData.agree" @click="showData.agree=true">
                    <img src="@/assets/images/agree-after.png" alt="" v-if="showData.agree" @click="showData.agree=false">
                    <span>同意《<span style="text-decoration: underline;" @click="showXieyiModal">用户注册服务协议</span>》</span>
                </div>
                <van-button class="save-phone-subtn" @click="login" >登&nbsp;&nbsp;录</van-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showData: {
                codeSendMes: '获取验证码',
                phoneNo: '',
                code: '',
                agree: false,
            },

            tid: ''
        }
    },
    methods: {
        sendCode(){
            if(!(/^1[3456789]\d{9}$/.test(this.showData.phoneNo))){
                this.$toast("您输入的手机号码有误，请重新输入")
                return
            }
            if(this.showData.codeSendMes!='获取验证码'){
                return
            }
            this.showData.codeSendMes = '发送中'
            
            this.$get('member/send/code',{phoneNo:this.showData.phoneNo}).then(res=>{
                if(res.code=='success'){
                    this.countDown()
                }else{
                    this.showData.codeSendMes='获取验证码'
                    this.$toast(res.message||"验证码发送失败")
                }
            })
        },
        // 倒计时
        countDown(){
            let count = 59
            this.tid = setInterval(() => {
                if(count==0){
                    this.showData.codeSendMes = "获取验证码"
                    clearInterval(this.tid)
                    return
                }
                this.showData.codeSendMes = (count--)+'s'
            },1000)
        },
        showXieyiModal(){
            this.$emit('showXieyi')
        },
        login(){
            // if(!this.showData.phoneNo){
            //     this.$toast('请先输入手机号')
            //     return 
            // }
            // if(!this.showData.code){
            //     this.$toast('请先输入验证码')
            //     return 
            // }
            // if(!this.showData.agree){
            //     this.$toast('请先阅读并同意注册服务协议')
            //     return 
            // }
            // let params = {
            //     phoneNo: this.showData.phoneNo,
            //     code: this.showData.code
            // }
            // this.$emit('continueLogin', params)
            // 这里调用登录接口进行用户登录

            // 延时2s模拟登录接口返回成功
            setTimeout(() => {
                document.body.removeChild(document.querySelector('.save-phone-box')) // 登录成功关闭弹窗
                this.afterLogin('success')
            },2000)
        }
    }
}
</script>
<style lang="less" scoped>
.xeiyi{
    display: flex;
    align-content: center;
    justify-content: center;
    margin-bottom: 0.12rem;

    img {
        width: 0.3rem;
        height: 0.3rem;
        margin-right: 0.15rem;
    }

    span {
        font-size: 0.22rem;
        color: gray
    }
}

.save-phone-box{
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
    position: fixed;
    top:0;
    left: 0;
    z-index: 125;
}
.save-phone-main{
    background-color: #fff;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 6rem;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 0.3rem 0.3rem;
}
.sav-phone-title{
    font-size: 0.32rem;
    text-align: center;
    background-position: center right;
    background-repeat: no-repeat;
    // background-image: url("../assets/images/close.png");
    background-size: 0.6rem 0.6rem;
    line-height: 0.6rem;
}
.save-phone-content{
    overflow: hidden;
    margin-top:0.5rem;
}
.save-phone-item{
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-bottom: 0.2rem;
}
.save-phone-item>img{
    width: 0.6rem;
}
.save-phone-item>.phone-input-text{
    border: none;
    flex: 1;
    color:#333
}
.save-phone-item .van-cell{
    padding:0.2rem 0 0.2rem 0.2rem;
}
.save-phone-subtn{
    width: 100%;
    border-radius: 5px;
    background-color: #EF4646;
    color:#fff;
    text-align: center;
    height: 0.8rem;
    font-size: 0.32rem;
    line-height: 0.8rem;
    margin-top: 0.2rem;
}
</style>