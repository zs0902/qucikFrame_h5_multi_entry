<template>
    <div class="container change-color">
        <template v-if="$route.query.type=='add'">
            <van-address-edit
            :area-list="areaList"
            show-postal
            :show-delete='false'
            :show-set-default='false'
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            tel-maxlength='11'
            :address-info='addressInfo'
            />
        </template>
        <template v-if="$route.query.type=='edit'">
            <van-address-edit
            :area-list="areaList"
            show-postal
            :show-delete='true'
            :show-set-default='false'
            show-search-result
            :search-result="searchResult"
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onUpdate"
            @delete="onDelete"
            save-button-text="修改"
            tel-maxlength='11'
            :address-info='addressInfo'
            />
        </template>
    </div>
</template>

<script>
import areaList from '&/area'
export default {
    data(){
        return {
            areaList,
            searchResult: [],
            addressInfo:{}
        }
    },
    mounted(){
        console.log("this.areaList is:", this.areaList)
        this.areaList.province_list = {510000: '四川省'}
        
        if(this.$route.query.type=='edit'){
            //查询对应地址的信息
            console.log("详情内容为：", this.$route.query.detail)
            this.addressInfo = this.$route.query.detail
        }
    },
    methods: {
        onSave(e) {
            console.log("填写内容为:", e)
            if(!this.$check.verifyPhoneNo()){ 
                this.$toast("手机号格式有误，请重新输入") 
                return false; 
            }
            let params = {}
            params.consignee = e.name
            params.mobile = e.tel
            params.provinceName = e.province
            params.province = e.areaCode
            params.cityName = e.city
            params.districtName = e.county
            params.detailAddress = e.addressDetail
            params.zipcode = e.postalCode
            this.$post('/user/address/add',params).then(res => {
                if(res.code == 'success'){
                    this.$toast.success("添加成功")
                    this.$router.replace({name: 'malldetail',query:{productId:localStorage.getItem('productId'),totalBalance:localStorage.getItem('totalBalance')}})
                }else {
                    this.$toast.fail("添加失败")
                }
            })
        },
        onUpdate(e){
            let params = {}
            params.addressId = this.$route.query.detail.addressId
            params.consignee = e.name
            params.mobile = e.tel
            params.provinceName = e.province
            params.province = e.areaCode
            params.cityName = e.city
            params.districtName = e.county
            params.detailAddress = e.addressDetail
            params.zipcode = e.postalCode
            this.$post('/user/address/update',params).then(res => {
                if(res.code == 'success'){
                    this.$toast.success("修改成功")
                    this.$router.replace({name: 'malldetail',query:{productId:localStorage.getItem('productId'),totalBalance:localStorage.getItem('totalBalance')}})
                }else {
                    this.$toast.fail("修改失败")
                }
            })
        },
        onDelete(e) {
            let params = {}
            params.addressId = this.$route.query.detail.addressId
            this.$post('/user/address/delete',params).then(res => {
                if(res.code == 'success'){
                    this.$toast.success("删除成功")
                    this.$router.replace({name: 'malldetail',query:{productId:localStorage.getItem('productId'),totalBalance:localStorage.getItem('totalBalance')}})
                }else {
                    this.$toast.fail("删除失败")
                }
            })
        },
    },
}
</script>
<style lang="less" scoped>
.change-color .van-button{
    background-color: #1989fa !important;
    border: 1px solid #1989fa !important;
}
</style>