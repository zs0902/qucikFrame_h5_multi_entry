import Vue from 'vue'
import Empty from './empty.vue'

function createInstance(parentEl) {
    // 创建构造器
    const EmptyConstructor = Vue.extend(Empty)
    // 创建实例 
    let emptyDom = new EmptyConstructor({
        el: document.createElement('div')
    })
    // 添加实例之前清除之前添加的实例
    // if(document.body.contains(document.querySelector('.empty_box'))){
    //     document.body.removeChild(document.body.querySelector('.empty_box'))
    // }
    if(parentEl.contains(document.querySelector('.empty_box'))){
        parentEl.removeChild(document.querySelector('.empty_box'))
    }
    // 将实例添加到页面
    // document.body.appendChild(emptyDom.$el)
    console.log('Empty 实例:', Empty)
    parentEl.appendChild(emptyDom.$el)
    // 返回实例
    return emptyDom
}

let listEmpty = {
    name: 'listEmpty', // 统一注册时需要
    show: function(options){
        let emptyDom = createInstance(options.parentEl)
        emptyDom.message = options.message||''
    },
    close: function(options){
        if(options.parentEl&&options.parentEl.contains(document.querySelector('.empty_box'))){
            options.parentEl.removeChild(document.body.querySelector('.empty_box'))
        }
    }
}

export default listEmpty