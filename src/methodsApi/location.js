import GetLocation from './location_lib/index'
const getLocation = new GetLocation()

/**
 * @author ZHANSHENG
 * @param {*} 无
 */

/*
* 为了缩短定位时间，原本想通过Promise.race机制，同时发起以下定位方式，谁先返回就采用谁，后返回的自动忽略。
*   let locationList = [getLocation.bMap(), getLocation.aMap(), getLocation.web()]
*   return Promise.race(locationList)
* 但是，有任何一个出错并且这个耗时最短的话，会最先返回，那么即使其他有正常的结果返回，最终结果也是先返回的错误结果。
* 这违背了---谁先返回就采用谁，全部出错最终结果才出错的设计理念，因此重新设计了 raceOnlySuc 方法
*
*  定位结果全部都是处理为了高德坐标
*/ 
export default function GetPosition(){
    return Promise.raceOnlySuc([
        getLocation.wechat(), 
        getLocation.unionpay(),
        getLocation.aMap(),
        getLocation.bMap(),
        getLocation.web()
    ]);
}

Promise.raceOnlySuc = (entries) => {
    if (!Array.isArray(entries)) {
        return new Promise(function (_, reject) {
            return reject(new TypeError('You must pass an array to race.'));
        })
    } else {
        return new Promise(function (resolve, reject) {
            let failCount = 0
            for (var i = 0; i < entries.length; i++) {
                entries[i].then(res => { 
                    resolve(res) 
                }).catch(err => { 
                    failCount++ 
                    if(failCount==entries.length){
                        reject('所有结果异常')
                    }
                })
            }
        })
    }
}