import Vue from 'vue'
import DropDown from './dropDown.vue'

function createInstance() {
    // 返回一个扩展实例构造器
    const DropDownConstructor  = Vue.extend(DropDown)
    // 构造一个实例
    const dropDown_dom = new DropDownConstructor({
        el: document.createElement('div')
    })
    // 防止多次渲染
    if(document.body.contains(document.querySelector('.drop_down_box'))){
        // console.log("删除上一个节点")
        document.body.removeChild(document.querySelector('.drop_down_box'))
    }
    // 把实例化的 组件 添加 到 父组件
    document.body.appendChild(dropDown_dom.$el)
    return dropDown_dom
}

let dropDown = {
    name: 'dropDown', // 统一注册时需要
    create: createInstance,
    delete: () => {
        console.log("清除滑动监听")
        if(document.body.contains(document.querySelector('.drop_down_box'))){
            document.body.removeChild(document.querySelector('.drop_down_box'))
        }
    }
}

export default dropDown