import Vue from 'vue'
import store from "@/store/index.js"
import PopSelect from './popSelect.vue'

function createInstance() {
    const SelectConstructor = Vue.extend(PopSelect);
    const SelectConstructorDom = new SelectConstructor({
        el: document.createElement('div'),
        store
    });
    
    // 防止重复点击toast多次渲染，不断在同一位置渲染，导致颜色不断加深
    if(document.body.contains(document.querySelector('.select'))){
        document.body.removeChild(document.querySelector('.select'));
    }
    // 把实例化的 dialog.vue 添加到 body 里
    document.body.appendChild(SelectConstructorDom.$el);
    
    return SelectConstructorDom;
};

export default function popSelect(content = {}){
    /**
     * 实例构造
     */
    let popSelectConstructorDom = createInstance() // 创建实例并加入页面
    console.log("popSelectConstructorDom is:", popSelectConstructorDom)
    popSelectConstructorDom.showData.columns = content.value // 将选项内容传入 vant picker 组件进行渲染
    popSelectConstructorDom.showData.defaultIndex = content.defaultIndex||'' // 配置默认选中项
    popSelectConstructorDom.showData.title = content.title||'' // 配置选择弹窗标题
    popSelectConstructorDom.showData.showPicker = true // 显示实例

    /**
     * 返回选择内容
     */
    return new Promise((resolve, reject) => {
        popSelectConstructorDom.onConfirm = function(value, index) {
            // console.log("选择内容:",value)
            popSelectConstructorDom.showData.showPicker = false
            resolve(value)
        }
    })
}