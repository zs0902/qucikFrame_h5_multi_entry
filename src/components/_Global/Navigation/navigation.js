import Vue from 'vue'
import Navigation from './navigation.vue'

function createInstance() {
    const NavigationConstructor = Vue.extend(Navigation);
    const NavigationConstructorDom = new NavigationConstructor({
        el: document.createElement('div'),
    });
    
    // 防止重复点击toast多次渲染，不断在同一位置渲染，导致颜色不断加深
    if(document.body.contains(document.querySelector('.carowner-loading-box'))){
        document.body.removeChild(document.querySelector('.carowner-loading-box'));
    }
    // 把实例化的 dialog.vue 添加到 body 里
    document.body.appendChild(NavigationConstructorDom.$el);
    
    return NavigationConstructorDom;
};

export default function navigation(content = {}){
    let navigationConstructorDom = createInstance()
    console.log("导航经纬度为:", content)
    navigationConstructorDom.source = Object.assign(navigationConstructorDom.source, content.source)  
    navigationConstructorDom.goto = Object.assign(navigationConstructorDom.goto, content.goto)
}