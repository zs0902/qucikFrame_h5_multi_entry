<template>
    <van-popup v-model="addressPopShow" round position="bottom" @close="()=>{addressPopShow = false}" 
        :style="{ 'height': '9.32rem', 'box-sizing': 'border-box', 'padding': '0.2rem 0 0','background-color': '#f5f5f5'}">

    <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="onSelect"
        />
    </van-popup>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            require: true,
            default: []
        },
    },
    data(){
        return{
            addressPopShow: false,
            chosenAddressId: '1', //默认选中第一个
            addressList: []
        }
    },
    watch: {
        addressPopShow(val){
            if(val){
                this.addressList = [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                        isDefault: true,
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号',
                    },
                ]
                console.log("lll:", this.addressList)
            }
        }
    },
    methods: {
        onAdd(){ //点击新增按钮--跳转到新增页面
            this.$router.push({name: 'Address', query: { type: 'add'}})
        },
        onEdit(e){//点击编辑按钮--跳转到编辑页面
            console.log("编辑",e)
            this.$router.push({name: 'Address ',query: { type: 'edit', detail: e}})
        },
        onSelect(e){ //切换选中按钮时触发
            console.log("选择地址内容为:",e)
            this.$emit('select',e)
        }
    }
}
</script>
<style lang="less" scoped>
/deep/ .van-button{
    background-color: #1989fa !important;
    border: 1px solid #1989fa !important;
}

/deep/ .van-radio__icon--checked .van-icon {
    color: #fff;
    background-color: #1989fa !important;
    border-color: #1989fa !important;
}

/deep/ .van-address-item__value {
    padding-right: 24px;
}

/deep/ .van-address-item__edit {
    position: absolute;
    top: 50%;
    right: 0px;
    color: #969799;
    font-size: 20px;
    -webkit-transform: translate(0,-50%);
    transform: translate(0,-50%);
}
</style>