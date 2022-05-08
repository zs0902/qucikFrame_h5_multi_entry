<template>
<!-- 页面底部上拉选择框 -->
    <van-popup v-model="showData.showPicker" round position="bottom" class="select">
        <van-picker
            :title="showData.title"
            show-toolbar
            :columns="showData.columns"
            @cancel="showData.showPicker = false"
            @confirm="onConfirm"
            @change="onChange"
            :default-index="showData.defaultIndex"
        />
    </van-popup>
</template>
<script>
import PopSelect from './popSelect.js'
export default {
    data(){
        return {
            showData:{
                showPicker: false,
                columns: [],
                defaultIndex: '',
                title: '选择',
            },
        }
    },
    methods:{
        onConfirm(){},
        onChange(picker, values){ // 通过此方法动态设置选择内容
            console.log("选择变换:", picker, values)
        }
    },
}
</script>