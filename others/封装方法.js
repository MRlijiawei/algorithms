/**
*1. a中是否包含b，及其位置
*/
function searchL(a, b) {
	return {
		"contain": a.search(b) !== -1,
		//同indexOf
		"position": a.search(b)
	}
}

/**
* 2.批量push
*let a = [];
*push(a, 1, 2, 3);
*/
function pushL(array, ...items) {
	items.forEach(function(item) {
		array.push(item);
	});
}
//或数组合并
Array.prototype.push.apply(arr1, arr2)

/**
* 3.时间日期转化
*/
function dateFormatter(value, flag) {
	if (value) {
		var date = new Date(value);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		if(flag) {
			return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
		} else {
			return y + '-' + m + '-' + d;
		}
	} else {
		return value;
	}
}

/**
* 4.求数组中的最大值
*/
var max=Math.max.apply(null, array)

/**
* 5.jQuery如何扩展自定义方法
*/
(jQuery.fn.myMethod=function () {
       alert('myMethod');
})
// 或
(function ($) {
        $.fn.extend({
             myMethod : function () {
                  alert('myMethod');
             }
        })
})(jQuery)

/**
 * 6.对象数组按照某属性排序（升序）
 */
export function orderObjArr (property) {
  return function (obj1, obj2) {
    return obj1[property] - obj2[property]
  }
}
/**
 * 7.对象数组按照某属性排序（降序）
 */
export function orderObjArrMinus (property) {
  return function (obj1, obj2) {
    return obj2[property] - obj1[property]
  }
}
// 使用
objArr.sort(orderObjArrMinus(property))

/**
 * 8.深拷贝
 */
 // 1,简单结构，使用concat，slice、JSON.parse,stringify等可以产生新的内存空间的方法
 // 2.对象--字符--对象，不适用于方法
 var new_arr = JSON.parse(JSON.stringify(arr))
 // 3.递归深拷贝
 var deepCopy = function(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是一个对象
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    // 遍历obj,并且判断是obj的属性才拷贝
    if (obj.hasOwnProperty(key)) {
      // 判断属性值的类型，如果是对象递归调用深拷贝
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

/**
 * 9.合并多个数组，判断条件propt不相等，非必填
 也可以把数组push在一起形成多维数组，然后join再split，见12
 */
function combineArr(propt, arrs) {
  const newArr = []
  arrs.forEach(e => {
    e.forEach(el => {
      if (newArr.filter(na => {
        return propt ? na[propt] === el[propt] : na === el
      }).length === 0) {
        newArr.push(el)
      }
    })
  })
  return newArr
}
//方法2
var arr1=new Array("1","2","3");
var arr2=new Array("4","5","6");
console.debug(Array.prototype.push.apply(arr1,arr2))

/**
 * 10.判断变量类型
 */
 function getType(variable) {
 	// [object xxxxxx]
 	let theType = Object.prototype.toString.call(variable)
 	return theType.substring(8, theType.length - 1)
 }

 /*
	11.颜色反转
	算法原理：0xFFFFFF-oldColor 格式化成16进制
 */
function colorReverse(oldColor){
	var oldColor="0x"+OldColorValue.replace(/#/g,"");
	var str="000000"+(0xFFFFFF-oldColor).toString(16);
	// 不带#
	return str.substring(str.length-6,str.length);
}

/**
	12.多维数组取最大值
*/
function getMax() {
	// 不限定参数个数写法，可以传入任意多个任意数组
	const a = Array.apply([],arguments).join(",").split(",")
	return Math.max.apply(null, a)
}
//var a = [1,2,3,[5,6],[1,4,8]];
//var ta = a.join(",").split(",");//降维，转化为一维数组
//console.log(Math.max.apply(null, ta));//最大值。当然也可以用最基本的for循环

/* 13.数组求和*/
function sumArray(arr) {
	return arr.reduce(function(a,b,c,d){return a+b})
}

//数组去重、排序
