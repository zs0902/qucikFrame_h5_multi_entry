var __enums = {}

export default function EnumUtility() { }

EnumUtility.prototype.Set = function (data) {
    if (!Array.isArray(data)) {
        console.error("枚举输入参数必须是数组");
        return false;
    }
    if (data.length == 0) {
        console.error("枚举输入参数不能为空");
        return false;
    }
    for (var item in __enums) {
        console.error("枚举数据已存在,不允许重复赋值")
        return false;
    }
    data.forEach(function (item) {
        if (!__enums[item.type])
            __enums[item.type] = [];
        __enums[item.type].push(item);
    })
    return true;
}

EnumUtility.prototype.Get = function (type) {
    if (!type) return [];
    return __enums[type] || [];
}

EnumUtility.prototype.Gets = function (types) {
    if (!types) return __enums;
    var data = [];
    types.split(",").forEach(function (item) {
        data.push(__enums[item]);
    })
    return data;
}

EnumUtility.prototype.GetTitle = function (type, value) {
    var data = this.Get(type)
    var result = value;
    data.forEach(function (item) {
        if (item.value == value) {
            result = item.label
            return;
        }
    })
    return result;
}
