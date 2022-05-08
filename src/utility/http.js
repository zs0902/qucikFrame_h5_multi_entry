import axios from 'axios';
import store from "../store/index.js"
axios.defaults.timeout = 500000;
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.NODE_ENV=='development'?'/': 'https://lctcc.zt666.com.cn'//'https://lctcc.zt666.com.cn/'//'http://47.108.174.245:8040'//'https://longbytest.100bm.cn';

//http request 拦截器  AuthorizationUser
axios.interceptors.request.use(
    config => {
        config.headers = {
            'Content-Type': 'application/json',
            'AuthorizationUser': sessionStorage.getItem('token')
        }
        return config
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.status == 401 || response.data.code == "401") {
            setLoginStatus(JSON.parse(response.config.data).funcName);
            return;
        }
        return response;
    },
    err => {
        if (err.response && err.response.status == 401) {
            setLoginStatus(JSON.parse(err.config.data).funcName);
            return;
        }
        return Promise.reject(err);
    }
)


/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params }) .then(response => {
            if (response&&response.status == 200) {
                resolve(response.data);
            }
        }).catch(err => {
            reject(err)
        })
    })
}





/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {},config={}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data,config).then(response => {
            if (response&&response.status == 200) {
                resolve(response.data);
            }
        }, err => {
            reject(err)
        })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(response => {
            if (response.status == 200) {
                resolve(response.data);
            }
        }, err => {
            reject(err)
        })
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
    data = Qs.stringify(data)
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(response => {
            if (response.status == 200) {
                resolve(response.data);
            }
        }, err => {
            reject(err)
        })
    })
}


/**
 * 封装delete请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function del(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.delete(url, data).then(response => {
            if (response.status == 200) {
                resolve(response.data);
            }
        }, err => {
            reject(err)
        })
    })
}

function setLoginStatus(funcName){
    // 捕获401,在appvue页面监听到这个值得变换，判断401然后唤起登录。
    // 加上时间戳，这样就不用在登录成功过后，重置store中的loginStatus也可以捕获到下一次401异常
    store.commit('setLoginStatus', '401'+new Date().getTime())
    // 将触发401的接口外层的调用方法名称，也存入store,以实现登录过后，回调此方法完成后续流程
    store.commit('setFuncName', funcName)
}