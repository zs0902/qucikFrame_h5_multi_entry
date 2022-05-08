import payLib from './payment_lib/index.js'
const pay = new payLib()

export default function Payment() {
    // 在这里进行一些逻辑处理，决定调用哪个支付，以及支付前后如何处理等，业务页面就只需要调这Payment 方法即可
    console.log("准备唤起支付", pay)
    pay.wxh5_miniapp().then(res => {
        if(res.code=='success'){
            setTimeout(() => {
                consloe.log("支付异步回调成功")
                localStorage.setItem('test:', 898989)
            }, 5000)
        }
    })
}