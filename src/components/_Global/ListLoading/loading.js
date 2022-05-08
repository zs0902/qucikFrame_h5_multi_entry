import Vue from 'vue'
import Loading from './loading.vue'

function createInstance(parentEl) {
    // 创建构造器，返回一个Vue子类
    /**
     * Vue.extend返回的是一个扩展实例构造器,也就是预设了部分选项的Vue实例构造器，但未曾实例化，可以理解为创建一个子类，然后让它继承Vue身上的一些功能
     */
    console.log('extend 实例:', Loading)
    const LoadingConstructor = Vue.extend(Loading)
    // 创建实例
    let LoadingDom = new LoadingConstructor({
        el: document.createElement('div')
    })

    /**
     * 上面等价于
     * 
     * let LoadingDom = new LoadingConstructor().$mount(document.createElement('div'))
     */

    // 添加实例前检测是否已有实例，如果存在先删除之前的实例
    if(parentEl.contains(document.querySelector('.load-box'))){
        parentEl.removeChild(document.querySelector('.load-box'))
    }
    // 将实例添加进入页面
    // document.body.appendChild(LoadingDom.$el)
    console.log('组件实例:', LoadingDom)
    parentEl.appendChild(LoadingDom.$el)
    return LoadingDom
}

let listLoading = {
    name: 'listLoading', // 统一注册时需要
    show: function(options){
        let loadingDom = createInstance(options.parentEl)
        loadingDom.message = options.message||'数据加载中'
    },
    close: function(options){
        if(options.parentEl&&options.parentEl.contains(options.parentEl.querySelector('.load-box'))){
            options.parentEl.removeChild(options.parentEl.querySelector('.load-box'))
        }
    }
} 

export default listLoading
