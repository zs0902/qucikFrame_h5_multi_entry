<template>
<!-- 列表页面滑动到一定距离显示’回到顶部‘按钮 -->
    <div class="drop_down_box" v-if="show" :style="{'left': left+'px'}">
        <span class="iconfont icon-dingbu" @click="scrollToTop" style="font-size: 0.5rem;"></span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
    mounted(){
        window.addEventListener('scroll', this.calc)
        this.calc()
        this.clientWidth = document.body.clientWidth;      
        this.left = this.clientWidth - 55;
    },
    methods: {
        calc() {
            // console.log("监听到了滚动2")
            let scrollTop = document.body.scrollTop||document.documentElement.scrollTop
            if(scrollTop>document.body.clientHeight*0.8){ // 判断：如果上滑距离达到了整个屏幕的80% 就显示回到顶部图标
                this.show = true
            }else{
                this.show = false
            }
            // this.show = true
        },
        scrollToTop() {
            // console.log('回到顶部')
            document.body.scrollTo(0, 0)
            document.documentElement.scrollTo(0, 0)
        }
    }
}
</script>

<style lang="less" scoped>
.drop_down_box {
    position: fixed;
    // left: 0.25rem;
    bottom: 0.5rem;
    width: 0.85rem;
    height: 0.85rem;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    text-align: center;
    line-height: 0.85rem;
    border: 0.04rem solid #6ec3e6;
    color: #8ac5de;
}
</style>