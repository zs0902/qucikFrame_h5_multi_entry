export default function DateUtility() { }

DateUtility.prototype.Format = function (fmt, date, UTC) {
    // console.log("fmt is:",fmt,date)
    if (!fmt) {
        fmt = fmt || "yyyy-MM-dd HH:mm:ss";
    }
    // 预约修改了此处
    // if (date && /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)) {
    //     date = date.replace(/-/g, "/")
    // }
    if (!Number.isNaN(Date.parse(date))){
        date = new Date(Date.parse(date))
    }else if(Number.isNaN(Date.parse(date))){
        date = new Date(date)
    }else{
        date = new Date()
    }
        

    let o = {
        "M+": (UTC ? date.getUTCMonth() : date.getMonth()) + 1,
        "d+": UTC ? date.getUTCDate() : date.getDate(),
        "H+": UTC ? date.getUTCHours() : date.getHours(),
        "m+": UTC ? date.getUTCMinutes() : date.getMinutes(),
        "s+": UTC ? date.getUTCSeconds() : date.getSeconds(),
        "q+": Math.floor(((UTC ? date.getUTCMonth() : date.getMonth()) + 3) / 3), /*季度*/
        "S": UTC ? date.getUTCMilliseconds() : date.getMilliseconds(),
        "W": ["日", "一", "二", "三", "四", "五", "六"][date.getDay()]
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, ((UTC ? date.getUTCFullYear() : date.getFullYear()) + "").substr(4 - RegExp.$1.length));

    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return fmt
}

DateUtility.prototype.PickerOptions = {
    disabledDate(time) {
        return time.getTime() > Date.now();
    },
    shortcuts: [{
        text: '今天',
        onClick(picker) {
            picker.$emit('pick', new Date());
        }
    }, {
        text: '昨天',
        onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
        }
    }, {
        text: '一周前',
        onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
        }
    }]
}

DateUtility.prototype.PickerRangeOptions = {
    shortcuts: [{
        text: '最近一周',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }]
}