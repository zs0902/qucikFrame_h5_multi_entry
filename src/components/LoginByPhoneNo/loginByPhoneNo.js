
import Vue from 'vue'
import LoginByPhoneNo from './loginByPhoneNo.vue'

function createInstance() {
    let LoginByPhoneNoStructor = Vue.extend(LoginByPhoneNo)

    const LoginByPhoneNoDom = new LoginByPhoneNoStructor({
        el: document.createElement('div')
    })

    // 如果存在此组件，先清除再添加
    if(document.body.contains(document.querySelector('.save-phone-box'))){
        document.body.removeChild(document.querySelector('.save-phone-box'))
    }

    // 添加组件到页面
    document.body.appendChild(LoginByPhoneNoDom.$el)

    return LoginByPhoneNoDom;
}

export default function loginByPhoneNo(content = {}) {
    let loginByPhoneNoDom = createInstance()

    return new Promise((resolve, reject) => {
        loginByPhoneNoDom.afterLogin = function (reslut) {
            if(reslut=='success'){
                resolve('login_suc')
            }else{
                reject('login_fail')
            }
        }
    })
}