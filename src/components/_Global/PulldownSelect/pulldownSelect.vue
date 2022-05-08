<template>
<!-- 仿微信右上角下来操作选项框 -->
    <div class="mengceng_select" v-if="show" >
        <div class="content-box" @touchstart.self="(e) => {show = false}">
            <div class="opt-box">
                <div class="item-box">
                    <div class="content" v-for="(item, index) in opList" :key="index" @click="onConfirm(item)">
                        <span :class="'iconfont '+item.icon"></span>
                        <span class="opt-item" :style="{border: index==0?'none':''}">{{item.option}}</span>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 仿微信右上角操作下拉框
export default {
    data() {
        return {
            show: false,
            opList: [],
        }
    },
    watch: {
        show(val){
            if(val){
                // this.opList = JSON.parse(JSON.stringify(this.list.filter(item=>{return item.disabled==false})))
                // console.log("可操作性项为123:",this.list, this.opList)
            }
        },
    },
    methods: {
        onConfirm(content) {}
    },
}
</script>
<style lang="less" scoped>
.mengceng_select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0);
}    

@keyframes bigger {
    0% {
        width: 0.6rem;
    }

    100% {
        width: 3rem;
    }
}

.content-box {
    position: relative;
    width: 100vw;
    height: 100vh;
    // background-color: pink;

    .opt-box {
        position: absolute;
        right: 0.1rem;
        top: 0.2rem;
        width: 3rem;
        height: auto;
        background: #333;
        border-radius: 0.2rem;
        box-shadow: 0rem 0.05rem 0.05rem 0.05rem #333;
        z-index: 999;

        .item-box {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 0.2rem;
            // background: gold;

            &::after {
                content: '';
                display: block;

                position: absolute;
                top: -0.4rem;
                right: 0.2rem;

                width: 0;
                border: 0.2rem solid transparent;
                border-bottom: 0.2rem solid #333;
            }

            .content {
                width: 100%;
                height: 1rem;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color: #fff;

                span:first-child{
                    width: 30%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 0.4rem;
                }

                .opt-item {
                    width: 70%;
                    height: 100%;
                    border-top: 0.02rem solid #fff;
                    font-size: 0.28rem;
                    line-height: 1rem;
                }
            }
        }
    }
}
</style>