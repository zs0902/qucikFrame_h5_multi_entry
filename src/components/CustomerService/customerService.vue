<template>
    <div class="mengceng">
        <div class="customer-box">
            <div class="title">联系客服</div>
            <div class="phone">{{customer.phoneNo}}</div>
            <div class="time-box">
                <span>{{customer.weekday}}</span>
                <span>{{customer.weekend}}</span>
            </div>
            <div class="btn-box">
                <div class="cancel-btn" @click="close">取消</div>
                <div class="sure-btn" @click="call">联系客服</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            customer: {}
        }
    },
    mounted(){
        this.customer = customerService
    },
    methods: {
        call(){
            let el = document.createElement('a')
            document.body.appendChild(el)
            el.setAttribute('href', 'tel://'+this.customer.phoneNo)
            el.click()
        },
        close(){
            document.body.removeChild(document.querySelector('.mengceng'))
        }
    }
}
</script>
<style lang="less" scoped>
.mengceng {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    justify-content: center;
    align-items: center;

    .customer-box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5rem;
        height: 4rem;
        border-radius: 0.1rem;
        background-color: #fff;
        padding: 0.35rem 0rem;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        align-items: center;
    }
}

.title {
    font-size: 0.33rem;
    font-weight: 600;
    color: #323233;
    letter-spacing: 0.05rem;
}

.phone {
    font-size: 0.32rem;
    color: #FF913B;
    margin-top: 0.25rem;
}

.time-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.3rem;
    font-size: 0.28rem;
}

.btn-box {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 0.5rem;
}

.cancel-btn {
    width: 1.6rem;
    height: 0.6rem;
    border-radius: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0.02rem solid #FF913B;
    color: #FF913B;
}

.sure-btn {
    width: 1.6rem;
    height: 0.6rem;
    border-radius: 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FF913B;
    color: #fff
}
</style>