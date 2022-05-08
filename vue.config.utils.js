'use strict'
// 此工具需要构造的目标多入口对象---官网解释
// pages
// Type: Object

// Default: undefined

// 在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：

// 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；
// 或一个指定其 entry 的字符串。
// module.exports = {
//   pages: {
//     index: {
//       // page 的入口
//       entry: 'src/index/main.js',
//       // 模板来源
//       template: 'public/index.html',
//       // 在 dist/index.html 的输出
//       filename: 'index.html',
//       // 当使用 title 选项时，
//       // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
//       title: 'Index Page',
//       // 在这个页面中包含的块，默认情况下会包含
//       // 提取出来的通用 chunk 和 vendor chunk。
//       chunks: ['chunk-vendors', 'chunk-common', 'index']
//     },
//     // 当使用只有入口的字符串格式时，
//     // 模板会被推导为 `public/subpage.html`
//     // 并且如果找不到的话，就回退到 `public/index.html`。
//     // 输出文件名会被推导为 `subpage.html`。
//     subpage: 'src/subpage/main.js'
//   }
// }


// 用来多入口打包，动态配置entry 和 html插件
const path = require('path')
const glob = require('glob')
const ENTRY_PATH = path.resolve(__dirname, './src/entries')

// 多入口配置，这个函数从 entries 文件夹中读取入口文件，装配成webpack.entry配置
exports.entries = function () {
    //从 entries 文件夹中找到二级目录下的 JS 文件作为入口文件，
    //并且将二级目录的文件夹名作为 key，生成这样一个对象： {“entry1”:"/multi-entry-vue/entries/entry1/main.js"}，
    //多个入口情况下会有更多键值对
    const entryFiles = glob.sync(ENTRY_PATH + '/*/*.js')
    const entryHtml = glob.sync(ENTRY_PATH + '/*/*.html')
    const pages = {}

    entryFiles.forEach(filePath => {
        const filename = filePath.replace(/.*\/(\w+)\/\w+(\.html|\.js)$/, (rs, $1) => $1)
        pages[filename] = {}
        let map = {}
        map.entry = filePath
        map['template'] =  filePath.split('main.js')[0]+'index.html'
        map['filename'] = filename+'.html'
        map['title'] = filename
        map['chunks'] = ['chunk-vendors', 'chunk-common', filename]
        pages[filename] = map
    })

    return pages
}
