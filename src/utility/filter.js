import DateUtility  from './date/date'
import EnumUtility from './enum'

export default {
  valuefilter:function(value,valuePipe){
    try {
      if (!valuePipe) {
        return value
      } 
      if (valuePipe.enum) {
        let enumName = valuePipe.enum
        return this.SubstituteEnum(value,enumName)

      } else if (valuePipe.placeholder) {
        let placeholderName = valuePipe.placeholder
        return this.SubStituteHolder(value,placeholderName)

      } else if (valuePipe.date) {

        let dateFormat = valuePipe.date
        return this.SubstituteDate(value,dateFormat)

      } else if (valuePipe.flowByte !== undefined) {
        
        return this.SubstituteByte(value)

      } else if (valuePipe.tof) {
        
        let tof = valuePipe.tof
        return this.SubstituteTof(value,tof)

      } else if (valuePipe.tof1) {

        let tof1 = valuePipe.tof1
        return this.SubstituteTof1(value,tof1)
      }else if (valuePipe.withStr) {

        let withStr = valuePipe.withStr
        return this.SubstituteSuffix(value,withStr)

      } else if (valuePipe.ellipsis) {

        let ellipsis = valuePipe.ellipsis
        return this.SubstituteEllipsis(value,ellipsis)

      } else if(valuePipe.flow !== undefined) {

        return this.SubstituteFlowStandard(value)

      } else if(valuePipe.number) {

        return this.SubstituteNumber(value)
      
      } else if(valuePipe.chineseNum){
        return this.SubstitueChineseNum(value)
      } else {
        return value
      }
    } catch (err) {
      console.log('Error Found: ' + err)
      return value
    }
  },
  SubStituteHolder(value,placeholderName) {
    if(value)
      return value
    else
      return placeholderName
  },
  SubstituteEnum(value,enumName) {
    let subval = value;
    if(value !== ""){
      /* list[enumName].forEach(attr => {
        if (attr.value === value) {
          subval = attr.description
        }
      }) */
      if(value == "*"){
        return subval = "所有"
      }else{
        var enumUtility = new EnumUtility()
        return enumUtility.GetTitle(enumName,value)  
      }
    } else {
      subval = '---'
    }
    return subval
  },
  SubstituteDate(value, format) {
    if (!value) {
      return "---"
    }
    var dateUtility = new DateUtility()
    return dateUtility.Format(format, value)
  },
  SubstituteByte(value) {
    var unitKB = 1024, unitMB = 1024 * 1024, unitGB = 1024 * 1024 * 1024
    var flow = parseInt(value)
    var flowa = Math.abs(flow)
    if (flowa >= unitGB)
      return Math.round((flow / unitGB)*100)/100 + "GB"
    if (flowa >= unitMB)
      return Math.round((flow / unitMB)*100)/100 + "MB"
    if (flowa >= unitKB)
      return Math.round((flow / unitKB)*100)/100 + "KB"
    return flow + "B"
  },
  SubstituteTof(value,tof) {
    
    let status = tof.split(',')
    let index = parseInt(value)
    return status[index]
  },
  SubstituteTof1(value,tof) {

    let status = tof.split(',')
    let index = parseInt(value)
    return status[index-1]
  },
  SubstituteSuffix(value, withStr) {
    let subval = value
    subval += withStr
    return subval
  },
  SubstituteEllipsis(value, number){
    if(value.length >= number){
      let subval = value.slice(0, number - 1) + '...'
      return subval
    }
    else if(0< value.length < number){
      let subval = value
      // let subval = value.slice(0, number - 1) + '...'
      return subval
    }
    else {
      return '---'
    }
  },
  SubstituteFlowStandard: function (value) {
    let result = value
    if (value == undefined||value=="") {
      return result
    }
    let val = parseFloat(value)
    if (val>=1024){
      val = val / 1024.0
      result = Math.floor(val*100)/100 + "GB"
    }else if (val>0){
      result  = val +"MB" 
    }else{
      result = val + "B"
    }
    return result
  },
  SubstituteNumber(value) {
    if(value === ''){
      return 0
    } else {
      return value
    }
  },
  SubstitueChineseNum(n){
    if (!n) return ;
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return;
    if (n<=0) return ;
    var unit = "京亿万仟佰拾兆万仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
    n += "00";
    var p = n.indexOf('.');
    if (p >= 0)
        n = n.substring(0, p) + n.substr(p+1, 2);
        unit = unit.substr(unit.length - n.length);	
        for (var i=0; i < n.length; i++) str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);	
        return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(兆|万|亿|元)/g, "$1").replace(/(兆|亿)万/g, "$1").replace(/(京|兆)亿/g, "$1").replace(/(京)兆/g, "$1").replace(/(京|兆|亿|仟|佰|拾)(万?)(.)仟/g, "$1$2零$3仟").replace(/^元零?|零分/g, "").replace(/(元|角)$/g, "$1整");
  }

}
