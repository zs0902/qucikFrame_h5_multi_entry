# wechat-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

一个用于h5快速开发的孵化项目。包含了定位、导航、登录处理以及支付等功能

项目架构关键点说明

关于路由
1、通过路由懒加载的方式，实现异步组件按需加载


关于app.vue（作为根组件，实现一些通用的全局配置）
1、在此处实现rem的比例配置
2、以及实现一些全局的方法配置，例如页面的隐藏与显示的监听
3、在此处实现401登录状态的全局捕获，以便针对登录异常状态全局的统一性、便捷性处理

关于.env 环境配置
1、主要用于团队成员项目协作以及不同环境不同配置便捷性使用

