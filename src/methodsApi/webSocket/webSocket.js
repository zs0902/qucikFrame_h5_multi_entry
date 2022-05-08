function WebScoketZs(wsUrl,params = {}) {
    this.wsUrl = wsUrl
    this.params = ''

    for(let i in params){
        this.params += (this.params?'&':'?')+i+'='+params[i]
    }

    this.init = function(){
        try{
            return new Promise((resolve, reject) => {
                // 创建连接
                if('WebSocket' in window){
                    console.log("webSocket1")
                    this.ws = new WebSocket(this.wsUrl+this.params);
                }else if('MozWebSocket' in window){   //在Firefox中为MozWebSocket
                    console.log("webSocket2")
                    this.ws = new MozWebSocket(this.wsUrl+this.params);
                }else{
                    console.log("抱歉，您的浏览器不支持websocket协议")
                }

                // 初始化webSocket 状态管理
                this.initEventHandle(resolve, reject); 
            })
        }catch(e){
            console.log("初始化webSocket异常:",e);
            // 初始化webSocket异常，尝试重连
            this.reconnect(wsUrl);
        }   
    }

    this.initEventHandle = function(resolve, reject){
        this.ws.onclose = () => {
            reject('connect_closed')
            console.log("ws连接关闭!"+new Date().toUTCString())
        };
        this.ws.onerror = () => {
            reject('connect_error')
            console.log("ws连接错误!");
            this.reconnect();
        };
        this.ws.onopen = () => {
            resolve('connect_opened')
            console.log("ws连接成功!"+new Date().toUTCString());
            this.heartCheck.reset().start();      //心跳检测重置（每三秒验证一次连接状态---通过收发ping~pong的形式）
        };
        this.ws.onmessage = (event) => {    //如果获取到消息，心跳检测重置
            this.heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
            console.log("ws收到消息啦:" +event.data);
            window.resetSetItem('watchStorage', event.data)
        };
    }

    this.reconnect = function() {
        console.log("=========ws重连=========")
        if(this.lockReconnect) return
        this.lockReconnect = true
        setTimeout( () => {     //没连接上会一直重连，设置延迟避免请求过多
            this.init(this.wsUrl,this.params)
            this.lockReconnect = false
        }, 2000);
    }
    
    //心跳检测
    this.heartCheck = {
        _this: this, //用_this 指代 外部构造函数作用域，区分 heartCheck的this 作用域
        timeout: 3000,        //3s发一次心跳
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function(){ 
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function(){
            var self = this;
            this.timeoutObj = setTimeout(() => {
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                this._this.ws.send("ping");
                console.log("ping!")
                this.serverTimeoutObj = setTimeout(() => {//onmessage收到消息过后，会立马调用此heartCheck的reset重置超时，如果超过一定时间还没重置，说明后端主动断开了
                    console.log("后端主动断开")
                    this._this.ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                }, this.timeout)
            }, this.timeout)
        }
    }

    // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
        this.ws.close();
    }  

    window.resetSetItem = function (key, newVal) {
        if (key === 'watchStorage') {
      
            // 创建一个StorageEvent事件
            var newStorageEvent = document.createEvent('StorageEvent');
            const storage = {
                setItem: function (k, val) {
                    sessionStorage.setItem(k, val);
      
                    // 初始化创建的事件
                    newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
      
                    // 派发对象
                    window.dispatchEvent(newStorageEvent)
                }
            }
            return storage.setItem(key, newVal);
        }
    } 
}
export default WebScoketZs