<template>
    <div class="keyboard">
        <!-- 选择车牌号 首个汉字键盘 弹出层 -->
        <div :class="show_chinese?'plate_number':'allBoard'">
            <van-popup v-model="show" position="bottom" :overlay="true" overlay-class="displayNone">
                <!-- 汉字 -->
                <div class="plate_chinese_box" v-if="show_chinese">
                    <van-button size="small" v-for="(item, index) in ChineseList"  :key="item.id" @click="checkChinese(index)" >{{item.name}}</van-button>
                    <div class="close-box" @click.stop="close_keyboard">
                        <div>╳</div>
                        <li></li>
                    </div>
                </div>
                <!-- 字母或数字 -->
                <div class="plate_number_box" v-if="show_allBoard">
                    <van-button size="small" v-for="(item, index) in English_Number" :key="item.id" 
                        @click="checkEnglish_num(index)" >
                        {{item.name}}
                    </van-button>
                    <div class="close-box" @click.stop="close_keyboard">
                        <div>╳</div>
                        <li></li>
                    </div>
                </div>
            </van-popup>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showKeyboard: true,    //车牌号输入框是否聚焦
                show_chinese:false,     //是否显示汉字键盘
                show_allBoard:false,     //是否显示英文数字键盘
                ChineseList:[
                    {name:'京',id:1},
                    {name:'津',id:2},
                    {name:'冀',id:3},
                    {name:'晋',id:4},
                    {name:'蒙',id:5},
                    {name:'辽',id:6},
                    {name:'吉',id:7},
                    {name:'黑',id:8},
                    {name:'沪',id:9},
                    {name:'苏',id:10},
                    {name:'浙',id:11},
                    {name:'皖',id:12},
                    {name:'闽',id:13},
                    {name:'赣',id:14},
                    {name:'鲁',id:15},
                    {name:'豫',id:16},
                    {name:'鄂',id:17},
                    {name:'湘',id:18},
                    {name:'粤',id:19},
                    {name:'桂',id:20},
                    {name:'琼',id:21},
                    {name:'渝',id:22},
                    {name:'川',id:23},
                    {name:'贵',id:24},
                    {name:'云',id:25},
                    {name:'藏',id:26},
                    {name:'陕',id:27},
                    {name:'甘',id:28},
                    {name:'青',id:29},
                    {name:'宁',id:30},
                    {name:'新',id:31},
                    {name:'←',id:99},
                ],
                English_Number:[
                    {name:'1',id:28},
                    {name:'2',id:29},
                    {name:'3',id:30},
                    {name:'4',id:31},
                    {name:'5',id:32},
                    {name:'6',id:33},
                    {name:'7',id:34},
                    {name:'8',id:35},
                    {name:'9',id:36},
                    {name:'0',id:37},
                    {name:'Q',id:38},
                    {name:'W',id:39},
                    {name:'E',id:40},
                    {name:'R',id:41},
                    {name:'T',id:42},
                    {name:'Y',id:43},
                    {name:'U',id:44},
                    {name:'I',id:45},
                    {name:'O',id:46},
                    {name:'P',id:47},
                    {name:'A',id:48},
                    {name:'S',id:49},
                    {name:'D',id:50},
                    {name:'F',id:51},
                    {name:'G',id:52},
                    {name:'H',id:53},
                    {name:'J',id:54},
                    {name:'K',id:55},
                    {name:'L',id:56},
                    {name:'Z',id:57},
                    {name:'X',id:58},
                    {name:'C',id:59},
                    {name:'V',id:60},
                    {name:'B',id:61},
                    {name:'N',id:62},
                    {name:'M',id:63},
                    {name:'←',id:99},
                ],
                first:'',
                numArr:[],
                show:false
            }
        },
        watch:{
            show(val,oldVal){
                console.log("监听变换 show",this.show)
                if(val){
                    this.clickShowKeyboard()
                }
            }
        },
        methods: {
            // 唤起键盘
            clickShowKeyboard(){
                if(!this.first){
                    this.show_chinese = true;
                }else{
                    this.show_chinese = false;
                    this.show_allBoard = true;
                }
            },
            // 关闭键盘
            closeKeyBoard(){
                this.show_chinese = false
                this.show_allBoard = false
            },
            // 选择车牌号前面的汉字 
            checkChinese(index){
                // 如果点击删除键，删除第一个格的内容
                if(this.ChineseList[index].id == 99){
                    this.first = ''
                }else{
                    // 把选中的字赋值给第一个格，并且切换键盘
                    this.first = this.ChineseList[index].name;
                    this.show_chinese = false;
                    this.show_allBoard = true;
                }
                this.$emit('getData',this.first+this.numArr.join(''))
                console.log("选择的汉字序号:",index)
                console.log("选择的汉字:",this.first+this.numArr.join(''))
            },
            // 选择车牌号后面的数字和字母 
            checkEnglish_num(index){
                // 如果点击删除键，删除 numArr 的最后一个值
                if(this.English_Number[index].id == 99){
                    this.numArr.pop()
                    // 如果 numArr 里面被删的没有值了，切换键盘
                    if(this.numArr.length == 0){
                        this.show_chinese = true;
                        this.show_allBoard = false;
                    }
                }else{
                    // 把选中的值 push 到 numArr 内
                    this.numArr.push(this.English_Number[index].name)
                    // 如果 numArr 中的值超过 7 个（车牌号的最大位数），删除最后一个
                    // if(this.numArr.length > 7){
                    //     this.numArr.pop()
                    // }
                    if(this.numArr.length==7){
                        this.close_keyboard()
                        return false
                    }
                }
                this.$emit('getData',this.first+this.numArr.join(''))
                console.log("选择的非汉字序号:",index)
                console.log("选择的键盘值:",this.numArr)
            },
            // 关闭虚拟键盘
            close_keyboard(){
                this.first = ''
                this.numArr = []
                this.show_chinese = false
                this.show_allBoard = false
                this.show = false
            }
        }
    }
</script>

<style scoped lang="scss">
.keyboard{
    width: 100%;
    position: absolute;
}
// 车牌号 & 虚拟键盘
.input-box{
    width: 21rem;
    height:3.2rem;
    margin: auto;
    background:rgba(255,255,255,1);
    box-shadow:0px 6px 8px 0px rgba(96,100,112,0.1);
    border-radius:.4rem;
    border:1px solid rgba(206,208,210,1);
    margin: 0 auto 2rem;
    display: flex;
    justify-content: center;
    li{
        flex: 1;
        border-right:1px solid rgba(206,208,210,1);
        box-sizing: border-box;
        margin-left: -1px;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #323233;
    }
    li:last-child{
        border: none;
    }
}

.class-close-box{
    // width: 0.22rem;
    // height: 0.3rem;
    position: absolute;
    right: 0.15rem;
    top: -0.65rem;
}
.class-close-box-div{
    width: 0.4rem;
    height: 0.4rem;
    font-size: 0.3rem;
    line-height: 0.4rem;
    margin: auto;
    text-align: center;
    border: 1px solid #666;
    border-radius: 50%;
}
.class-close-box-li{
    width: 1px;
    height: 0.15rem;
    background: #666;
    margin: auto;
}
.overflow-y{
    overflow-y: inherit;
}
.class-van-button-small{
    min-width: 0;
    border-radius: 5px;
    margin: 5px 2px;
    box-shadow: 5px 5px 5px #aaa;
}
.class-plate-box{
    width: 100%;
    padding: 0.4rem 0.2rem;
    box-sizing: border-box;
    background: #e3efed;
    position: relative;
}
.plate_number{
    .van-popup{
        @extend .overflow-y;
    }
    .van-popup--bottom{
        background: #eee;
    }
    .plate_chinese_box{
        width: 100%;
        @extend .class-plate-box;
        .close-box{
            @extend .class-close-box;
            div{
                @extend .class-close-box-div;
            }
            li{
                @extend .class-close-box-li;
            }
        }
        .van-button--small{
            width: 11.3%;
            height: 0.8rem;
            @extend .class-van-button-small;
        }
    }
}
.allBoard{
    .van-popup{
        @extend .overflow-y;
    }
    .plate_number_box{
        width: 100%;
        @extend .class-plate-box;
        .close-box{
            @extend .class-close-box;
            div{
                @extend .class-close-box-div;
            }
            li{
                @extend .class-close-box-li;
            }
        }
        .van-button--small{
            width: 8.8%;
            height: 0.8rem;
            @extend .class-van-button-small;
        }
        .van-button--small:nth-child(1){
            margin-bottom: 5px;
        }
        .van-button--small:nth-child(21){
            margin-left: 5%;
        }
        .van-button--small:nth-child(30){
            margin-left: 10%;
        }
        .van-button--small:last-child{
            width: 13%;
        }
    }
}
</style>
<style lang="scss">
.displayNone{
    display: none!important;
}
</style>