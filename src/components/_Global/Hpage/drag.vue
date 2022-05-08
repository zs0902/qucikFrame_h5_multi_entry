<template>
    <div>
        <div class="ys-float-btn" 
            :style="{'left': thisLeft+'px','top': thisTop+'px'}"    
            ref="div"    
            @touchstart.prevent="(e) => {dragStart(e)}"     
            @touchend.prevent="(e) => {dragEnd(e)}"     
            @touchmove.prevent="(e) => {dragProgress(e)}"    
            >    
            <span :class="'iconfont '+ content"></span>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        content: {
            type: String,
            require: true,
            defalut: 'test'
        },
        left: {
            type: Number,
            require: true,
            defalut: 0
        },
        top: {
            type: Number,
            require: true,
            defalut: 0
        }
    },
    data(){
        return {
            gapWidth: 0, //边距
            itemWidth: 60, // 图标的宽度
            itemHeight: 40, // 图标的高度
            clientWidth:'',
            clientHeight:'',
            thisLeft:'',
            thisTop:'',

            changan: false,
            tid: null
        }
    },
    created() {      
        this.clientWidth = document.body.clientWidth;     
        this.clientHeight = document.documentElement.clientHeight;      
        this.thisLeft = this.left;      
        this.thisTop = this.top;   

        // 仿微信 监听过渡结束---触发方法改变元素样式
        // 当然，还可以监听，过渡事件的开始，进行，结束事件，分别为transitionstart、transitionrun、transitionend。
        // window.addEventListener('transitionend',(e) => {
        //     console.log("过渡结束 e is:",e)
        //     e.target.className = this.left==0?'ys-float-btn-end-left':'ys-float-btn-end-right'
        // })
        // window.addEventListener('touchmove',function(e){
        //     console.log("移动进行中 e is:",e)
        //     e.target.className = 'ys-float-btn'
        // })

    },
    methods: {
        dragStart(e) {  
            this.changan = false
            clearTimeout(this.tid)   
            this.tid = setTimeout(() => {
                // console.log("e is:",e)
                this.$refs.div.style.transition = 'none';
                this.changan = true
            },100)
        },
        dragEnd(e) { 
            if(this.changan){
                this.$refs.div.style.transition = 'all 0.3s';        
                if (this.thisLeft > this.clientWidth/2) { 
                    this.thisLeft = this.clientWidth - 55;
                } else {          
                    this.thisLeft = 10;        
                }      
                // 在这里用延时改变样式，要比监听过渡结束改变样式来的自然平滑
                // setTimeout(()=>{
                //     e.target.className = this.left==0?'ys-float-btn-end-left':'ys-float-btn-end-right'
                // },50)
            }else{
                this.$emit('weakup')
            }  
        },      
        dragProgress(e) {        
            // 仿微信 拖动过程中修改拖动内容样式
            // console.log("拖动过程中动态改变图标位置",e)
            // e.target.className = 'ys-float-btn'
            if (e.targetTouches.length === 1) {          
                let touch = event.targetTouches[0];          
                this.thisLeft = touch.clientX - this.itemWidth/2;              
                this.thisTop = touch.clientY - this.itemHeight/2;        
            }      
        }
    }
}
</script>

<style lang="less" scoped>
.ys-float-btn {
    position: fixed;
    height: 0.85rem;
    /* background: transparent url(../../assets/images/jiaohang_logo.png) no-repeat center; */
    background: rgba(255, 255, 255, 0.5);
    text-align: center;
    width: 0.85rem;
    border-radius: 50%;
    text-align: center;
    line-height: 0.85rem;
    border: 0.04rem solid #6ec3e6;
    color: #8ac5de;

    span {
        font-size: 0.5rem;
    }
}   
.ys-float-btn-end-left {
    box-sizing: border-box;
    position: absolute;
    height: 40px;
    /* background: transparent url(../../assets/images/jiaohang_logo.png) no-repeat center; */
    border: 0.02rem solid gray;
    border-left: none;
    text-align: center;
    width: 60px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
} 
.ys-float-btn-end-right {
    box-sizing: border-box;
    position: absolute;
    height: 40px;
    /* background: transparent url(../../assets/images/jiaohang_logo.png) no-repeat center; */
    border: 0.02rem solid gray;
    border-right: none;
    text-align: center;
    width: 60px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
}
</style>