export default {
    /**
     * 数组去重 进阶版 --- 包含null undefined {} false NaN
     */
    uniqueArray: function(arr){
        var tempArr = []
        arr.forEach(item => {
            if(isNaN(item)&&typeof item==='number') //取出NaN直接放入数组
                tempArr.push(item)
            else
                tempArr.push(JSON.stringify(item))
        })
        console.log("将原始数组逐项替换为字符串：",tempArr)
        tempArr = Array.from(new Set(tempArr))
        console.log("去重过后：",tempArr)
        tempArr.forEach((item,index) => {
            if(item==undefined||(isNaN(item)&&typeof item==='number')) //undefined 和 NaN 不用改变
                tempArr[index]=item
            else
                tempArr[index]=JSON.parse(item)
        })
        return tempArr
    },

    /**
     * 对象深拷贝
     * 
     * 类似于 Object.assign() 只能用于属性值都是基本类型的对象进行拷贝，对象属性值是复杂类型的，同样也是对引用的复制
     * 之前一直用这个方法，先通过JSON.stringify将对象转化为字符串，然后在通过JSON.parse转化为对象赋值给其他值
     * 
     * 现在通过循环递归的方式赋值
     */
    objDeepClone: function(objA, objB){
        for(let key in objB){
            if(typeof objB[key] === 'object'){
                objA[key] = {}
                objDeepClone(objA[key], objB[key])
                continue
            }
            objA[key] = objB[key]
        }
    },

    /**
     * 格式化分隔手机号等字符串
     */
    formatString: function(num, grapLength, strTemp=''){
        if(!num||num.length<=grapLength){
            return strTemp+num
        }
        
        strTemp += num.substring(0,grapLength)+' '
        return FormatString(num.substring(grapLength), 4, strTemp)
    },

    /**
     * 高德坐标转百度
     */
    converPosition: function(lng, lat) {
        var X_PI = Math.PI * 3000.0 / 180.0;
        var x = lng, y = lat;
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
        var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return {
            lat: bd_lat,
            lng: bd_lng
        }
    },

    /**
     * 根据经纬度计算两点之间的距离
     */
    calculateLineDistance: function(start, end) {
        var d1 = 0.01745329251994329;
        var d2 = start.longitude;
        var d3 = start.latitude;
        var d4 = end.longitude;
        var d5 = end.latitude;
        d2 *= d1;
        d3 *= d1;
        d4 *= d1;
        d5 *= d1;
        var d6 = Math.sin(d2);
        var d7 = Math.sin(d3);
        var d8 = Math.cos(d2);
        var d9 = Math.cos(d3);
        var d10 = Math.sin(d4);
        var d11 = Math.sin(d5);
        var d12 = Math.cos(d4);
        var d13 = Math.cos(d5);
        var arrayOfDouble1 = [];
        var arrayOfDouble2 = [];
        arrayOfDouble1.push(d9 * d8);
        arrayOfDouble1.push(d9 * d6);
        arrayOfDouble1.push(d7);
        arrayOfDouble2.push(d13 * d12);
        arrayOfDouble2.push(d13 * d10);
        arrayOfDouble2.push(d11);
        var d14 = Math.sqrt((arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0]) +
            (arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1]) +
            (arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2]));
    
        return(Math.asin(d14 / 2.0) * 12742001.579854401);
    },

    /**
     * 复制操作
     */
    copy: function(value){
        return new Promise((resolve, reject) => {
            const input = document.createElement('input')
            document.body.appendChild(input)
            input.onpaste = function(event) {
                alert("paste: " + event.clipboardData.getData('text/plain'));
                // event.preventDefault();
            };
            
            input.setAttribute('value',value) //给输入框赋值
            input.select() //选取文本域的所有内容 而focus是获取焦点; 这就相当于让输入框的内容可编辑然后以下document.execCommand就可以操控之
            
            /**
             * 当一个HTML文档切换到设计模式时，document暴露 execCommand 方法，该方法允许运行命令来操纵可编辑内容区域的元素。
             * document.execCommand 方法返回boolean值，当为false时，说明操作不被支持或者未启用
             */
            if (document.execCommand('copy')) {
                document.execCommand('copy')
                document.body.removeChild(input)
                resolve({code: 'success', data: '复制成功'})
            }else{
                reject({code: 'fail', data: '浏览器不支持或未启用该操作'})
            }
        })
    },

    /**
     * 生成唯一标识  GUID
     */
    getGuid: function() {
        let guid = "";
        for (let i = 1; i <= 32; i++){
            let n = Math.floor(Math.random()*16.0).toString(16);
            guid += n;
            if((i==8)||(i==12)||(i==16)||(i==20))
            guid += "-";
        }
        return guid
    }
}