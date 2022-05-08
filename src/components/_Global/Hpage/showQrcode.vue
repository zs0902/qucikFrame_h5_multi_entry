<template>
    <div class="mengceng" v-if="show">
        <div class="content-box">
            <div class="qrcod-box" ref="qrcode"></div>
            <div class="detainNo">
                <span>扣留单号</span>
                <span>{{carOrderNo}}</span>
            </div>
        </div>

        <div class="iconfont icon-fail close-box" @click="show=false"></div>
    </div>
</template>
<script>
import QRCode  from "qrcodejs2"
export default {
    props: {
        carOrderNo: {}
    },
    data() {
        return {
            show: false,
        }
    },
    watch: {
        show(val){
            if(val){
                this.$nextTick(() => {
                    this.createQrcode(this.carOrderNo)
                })
            }
        }
    },
    methods: {
        createQrcode(content) {
            new QRCode(this.$refs.qrcode, {
                width: 200,
                height: 200,        // 高度
                text:content   // 二维码内容
            })
        },
    },
}
</script>
<style lang="less" scoped>
.mengceng {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}    

.content-box {
    margin-top: 1rem;
    padding: 0.85rem;
    background-color: #fff;

    display: flex;
    flex-direction: column;
    align-items: center;

    border-radius: 0.2rem;
}

.detainNo {
    margin-top: 0.5rem;
    font-size: 0.3rem;
    color: #333;
    
    >span:first-child {
        margin-right: 0.25rem;
        color: #999;
    }
}

.close-box {
    font-size: 0.8rem;
    color: #fff;
    margin-block: 0.55rem;
}
</style>