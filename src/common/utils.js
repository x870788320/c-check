
//单例模式
export const singvGradeInfo = function(fn) {
    let result;
    return function() {
        return result || (result = fn.apply(this, arguments)); //作用是arguments是参数
    }
  }

//判断数据类型
const _toString = Object.prototype.toString;
export const toRawType = value => _toString.call(value).slice(8, -1)


  //获得一个数字数组
export const getNumArr = ( end, start = 1 ) =>  Array.apply(null, { length: (end - start + 1) }).map((m,index)=> String(index + start));

//冻结数据
export const freezeObj = obj => {
    Object.seal(obj)
    Object.freeze(obj)
    Object.keys(obj).map(key => (typeof obj[key] === "object") && freezeObj(Object(obj[key])))
    return obj
}




//日期时间
export const formatNum = n => n.toString()[1] ? n : '0' + n
export const formatDate = (date, type = 'YYYY-MM-DD HH:MM:SS') => {
  if(toRawType(date) === 'Number'){
    date = new Date(date)
  }
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  console.log(type)
  return [year, month, day].map(formatNum).join('-') + ' ' + [hour, minute, second].map(formatNum).join(':')
}


//延时器
let timer = null
export  function recordTime(){
  this.count = 0;
  // this.timer = null; 
}

recordTime.prototype = {
  start(fn, delay = 1000) {
    clearInterval(timer)
    timer = setInterval(fn, delay)
    console.log(timer)
  },
  end(){
    console.log(timer)
    clearInterval(timer)
    timer = null
  },
}

//字母排序
export const orderString = (val, type = 'str') => {
  let arr = toRawType(val) === 'String'? val.split('') : val
  let tar = arr.sort((v1, v2) => (v1.charCodeAt() - v2.charCodeAt()))
  return type === 'str'? tar.join(''): tar
}


export const benchmark = (datas, formdata) => 
  datas.map( (item, index) => {
    formdata.append(`items[${index}][id]`, item.id)
    formdata.append(`items[${index}][correct]`, item.correct)
  })
