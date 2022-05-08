<template>
<!-- 页面指定盒子空内容效果 -->
    <div class="empty_box">
        <img src="@/assets/images/list-empty.png" alt="">
        <div class="text">{{message}}</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            message: null
        }
    }
}
</script>
<style lang="less" scoped>
    .empty_box{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    img {
        width: 2.2rem;
    }

    .text {
        text-align: center;
        color: #999;
        margin-top: 0.2rem;
    }
</style>