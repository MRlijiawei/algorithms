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

/*13.阶乘*/
function factorical(num) {
	if (num <=1) {
		return 1
	} else {
		return num * arguments.callee(num - 1)
		//return num * factorical(num - 1)一般使用上边写法，消除紧密耦合，且在将方法赋值给别的变量时不需要再关心原方法名
	}
}

/*14.范围取随机数，数组中随机取（也可指定下标范围）*/
// 包括首尾的随机数
function selectFrom(lo, up) {
	var choice = up - lo + 1
	return Math.floor(Math.random() * choice + lo)
}
// 使用：
selectFrom(3, 8)
// 用于数组
var arr = []
arr[selectFrom(0, arr.length - 1)]

/*15.检验字符串是否以某字符（串）开头*/
// 绑定到String原型上
String.prototype.startWith = function (txt) {
	return this.indexOf(txt) === 0
}
// 'Hello world'.startWith('Hello')//true

/*16.取url参数*/
/*
 * 取url参数
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
        return unescape(r[2]);
    }else if(q != null){
        return unescape(q[2]);
    }else{
        return null;
    }
}

/*17.能力检测*/
/*
 * 检测是否是某对象的方法。如：isHostMethod(xhr, 'open')
 */
function isHostMethod(object, property) {
	var t = typeof object[property]
	return t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknown'//IE中xhr.open返回unknown
}

/*18.节点元素转数组*/
/*
 * 将html节点转化为真正的Array数组
 */
function convertToArray(nodes) {
	var array = null
	try{
		array = Array.prototype.slice.call(nodes, 0)//非IE
	} catch(ex) {
		array = new Array()
		for (var i=0,len = nodes.length;i<len;i++) {
			array.push(nodes[i])
		}
	}
	return array
}

/*19.动态脚本和样式*/
/*
 * 动态插入JS和css
 */
function loadScript(url) {
	var script = document.createElement('script')
	script.type = 'text/javascript'
	script.src = url
	document.body.appendChild(script)
}
// 判断是否加载完成？

function loadScriptString(code) {
	var script = document.createElement('script')
	script.type = 'text/javascript'
	try {
		script.appendChild(document.createTextNode(code))
	} catch (ex) {
		script.text = code//兼容IE
	}
	document.body.appendChild(script)
}

function loadStyles(url) {
	var link = document.createElement('link')
	link.rel = 'stylesheet'
	link.type = 'text/css'
	link.href = url
	document.getElementsByTagName('head')[0].appendChild(link)
}
// css是异步加载的，不需要关系什么时候加载完成的问题
function loadStyleString(css) {
	var style = document.createElement('style')
	style.type = 'text/css'
	try {
		style.appendChild(document.createTextNode(css))
	} catch (ex) {
		style.styleSheet.cssText = css// 兼容IE。另外，ie中重复设置一个style的属性或设置为空时容易崩溃
	}
	document.getElementsByTagName('head')[0].appendChild(style)
}

/*19.matchSelector兼容性封装*/
/*
 * 
 */
function matchesSelector(ele, selector) {
	if (ele.matchesSelector) {
		return ele.matchesSelector(selector)
	} else if (ele.msMatchesSelector) {
		return ele.msMatchesSelector(selector)
	} else if (ele.mozMatchesSelector) {
		return ele.mozMatchesSelector(selector)
	} else if (ele.webkitMatchesSelector) {
		return ele.webkitMatchesSelector(selector)
	} else {
		throw new Error('xxx')
	}
}
/*20.插入样式*/
/*删除是deleteRule和removeRule，参数是index
 * 
 */
function insertRule(sheet, selectorText, cssText, position) {
	if (sheet.insertRule){
		sheet.insertRule(selectorText+'{'+cssText+'}',position)
	} else if (sheet.addRule) {
		sheet.addRule(selectorText, cssText, position)
	}
}

//数组去重、排序