import Vconsole from 'vconsole'
var vConsole = getQueryString('debug')
function getQueryString(name){
    var src = window.location.href.substring(window.location.href.indexOf("?")+1);
　　var reg = new RegExp("(^|&|/?)"+ name +"=([^&]*)(&|$)");
　　var r = src.match(reg);
// 　　if(r!=null){
//         if(decodeURIComponent(r[2].split("#")[0]).replace('/','') == 'debug'){
//             return new Vconsole()
//         }else{
//             return new Vconsole()
//             return null
//         }
//     }else{
//         return null
//     }
return new Vconsole()
}
export default vConsole