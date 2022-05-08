import Vue from 'vue'
import PulldownSelect from './pulldownSelect.vue'

function createInstance() {
    let PulldownSelectStructor = Vue.extend(PulldownSelect)
    const PulldownSelectDom = new PulldownSelectStructor({
        el: document.createElement('div')
    })

    // 防止重复点击toast多次渲染，不断在同一位置渲染，导致颜色不断加深
    if(document.body.contains(document.querySelector('.mengceng_select'))){
        document.body.removeChild(document.querySelector('.mengceng_select'));
    }
    // 把实例化的 dialog.vue 添加到 body 里
    document.body.appendChild(PulldownSelectDom.$el);
    
    return PulldownSelectDom;
}

export default function pulldownSelect(content = {}){
    /**
     * 实例构造
     */
    let pulldownSelectConstructorDom = createInstance() // 创建实例并加入页面
    pulldownSelectConstructorDom.opList = content.opList // 
    pulldownSelectConstructorDom.show = true // 显示实例

    /**
     * 返回选择内容
     */
    return new Promise((resolve, reject) => {
        pulldownSelectConstructorDom.onConfirm = function(value) {
            pulldownSelectConstructorDom.show = false
            resolve(value)
        }
    })
}