import Vue from 'vue'
import customerService from './customerService.vue'

function createInstance() {
    const CustomerService = Vue.extend(customerService)

    let customerServiceDom = new CustomerService({
        el: document.createElement('div')
    })
    // 把实例化的 组件 添加 到 父组件
    document.body.appendChild(customerServiceDom.$el)
    return customerServiceDom
}

let customerServicePop = createInstance

export default customerServicePop