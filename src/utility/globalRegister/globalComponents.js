// 为了防止打包过后入口文件过大，这里只配置需要全局注册的组件
const ctx = require.context('@/components/_Global', true, /.js$/)

export default {
    install(vue) {
        // console.log('批量注册全局组件:', ctx.keys())
        ctx.keys().forEach(path => {
            let component = ctx(path).default
            vue.prototype['$'+component.name] = component
        })
    }
}