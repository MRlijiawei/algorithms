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
// 浅拷贝一个对象
Object.create(
  Object.getPrototypeOf(obj), 
  Object.getOwnPropertyDescriptors(obj) 
)

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

/*20.跨浏览器的事件处理程序*/
/*跨浏览器的事件处理程序
 * 
 */
var EventUtil = {
	addHandler: function(ele, type, handler) {
		if (ele.addEventListener) {
			ele.addEventListener(type, handler, false)
		} else if (ele.attachEvent) {
			element.attachEvent('on'+type, handler)
		} else {
			element['on'+type] = handler
		}
	},
	removeHandler: function(ele, type, handler) {
		if (ele.removeEventListener) {
			ele.removeEventListener(type, handler, false)
		} else if (ele.detachEvent) {
			element.detachEvent('on'+type, handler)
		} else {
			element['on'+type] = null
		}
	},
	getEvent: function(event) {
		return event ? event : window.event
	},
	// 下边几个event入参是上边getEvent获取到的event
	getTarget: function(event) {
		return event.target || event.srcElement
	},
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault()
		} else {
			event.returnValue = false
		}
	},
	stopPropagation: function(event) {
		if (event.stopPropagation) {
			event.stopPrppagation()
		} else {
			event.cancelBubble = true
		}
	},
	getRelatedTarget: function(event) {
		if (event.relatedTarget) {
			return event.relatedTarget
		} else if (event.toElement) {
			return event.toElement
		} else if (event.fromElement) {
			return event.fromElement
		} else {
			return null
		}
	},
	// 按下的是哪个键的区分
	getButton: function(event) {
		if (document.implementation.hasFeature('MouseEvents', '2.0')) {
			return event.button
		} else {
			switch (event.button) {
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0
				case 2:
				case 6:
					return 2
				case 4:
					return 1
			}
		}
	},
	// 滚轮滚动
	getWheelDelta: function(event) {
		if (event.wheelDelta) {
			return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta)
		} else {
			return -event.detail * 40
		}
	},
	// 剪贴板
	getClipbordData: function(event, type='text') {
		var clipbordData = event.clipbordData || window.clipbordData
		return clipbordData.getData(type)
	},
	setClipbordData: function(event, value) {
		if (event.clipbordData) {
			// 返回的值是成功失败的布尔值
			return event.clipbordData.setData('text/plain', value)
		} else if (window.clipbordData) {
			return window.clipbordData.setData('text', value)
		}
	}
}

/*21.获取文本框选择的文本；选择问吧*/
function getSelectedText(textbox) {
	if (typeof textbox.selectionStart == 'number') {
		return textbox.value.substring(textbox.selectionStart, textbox.selectionEnd)
	} else if (document.selection) {
		// IE8及以前
		return document.selection.createRange().text
	}
}
function selectText(textbox, start, end) {
	if (textbox.setSelectionRange) {
		textbox.setSelectionRange(start, end)
	} else if (textbox.createTextRange) {
		var range = textbox.createTextRange()
		range.collapse(true)
		range.moveStart('character', start)
		range.moveEnd('character', end - start)
		range.select()
	}
	textbox.focus()
}

/*22.表单输入框自动切换焦点*/
(function() {
	function tabForward(event) {
		event = EventUtil.getEvent(event)
		var target = EventUtil.getTarget(event)
		if (target.value.length === target.maxlength) {
			var form = target.form
			for (var i=0, len = form.elements.length; i < len; i++) {
				if (form.elements[i] === target) {
					if (form.elements[i+1]) {
						form.elements[i+1].focus()
					}
					return
				}
			}
		}
	}

	var textbox1 = document.getElementById('xxx')
	var textbox2 = document.getElementById('xxx')

	EventUtil.addHandler(textbox1, 'keyup', tabForward)
	EventUtil.addHandler(textbox2, 'keyup', tabForward)
})()

/*22.图像转黑白*/
function getBWImg(image) {
	var canvas = document.createElement('canvas')
	canvas.width = image.width
	canvas.height = image.height
	var context = canvas.getContext('2d')
	context.drawImage(image, 0, 0)
	var imageData = context.getImageData(0,0,image.width,image.height)
	var data = imageData.data
	var average
	for(var i=0,len = data.length;i<len;i+=4) {
		average = Math.floor((data[i]+data[i+1]+data[i+2])/3)
		data[i] = average
		data[i+1] = average
		data[i+2] = average
	}
	imageData.data = data
	context.putImageData(imageData,0,0)
	// 宽高应该需要设置一下再转base64
	image.src = canvas.toDataURL('image/png')
	canvas.remove()
}

/*23.跨域请求封装*/
function createCORSRequest(method, url) {
	var xhr = new XMLHttpRequest()
	if ('withCredentails' in xhr) {
		xhr.open(method, url, true)
	} else if (typeof XDomainRequest != 'undefined') {
		xhr = new XDomainRequest()
		xhr.open(method, url)
	} else {
		xhr = null
	}
}

/**
24.自定义事件
**/
function EventTarget() {
	this.handlers = {}
}
EventTarget.prototype = {
	contructor: EventTarget,
	addHandler: function(type, handler) {
		if (typeof this.handlers[type] === 'undefined') {
			this.handlers[type] = []
		}
		this.handlers[type].push(handler)
	},
	// 触发
	fire: function(event) {
		if (!event.target) {
			event.target = this
		}
		if (this.handlers[event.type] instanceof Array) {
			var handlers = this.handlers[event.type]
			for (var i=0, len=handlers.length; i<len; i++) {
				handlers[i](event)
			}
		}
	},
	removeHandler: function(type, handler) {
		if (this.handlers[type] instanceof Array) {
			var handlers = this.handlers[type]
			for (var i=0, len=handlers.length; i<len; i++) {
				if (handlers[i] === handler) {
					break
				}
			}
			handlers.splice(i, 1)
		}
	}
}

/**
25.结合自定义事件的拖拽封装
class:draggable {position:absolute}
**/
var DragDrop = function() {
	// 在自定义事件的基础上
	var dragdrop = new EventTarget(),
		dragging = null,
		diffx = 0,
		diffy = 0
	function handleEvent(event) {
		event = EventUtil.getEvent(event)
		var target = EventUtil.getTarget(event)
		switch (event.type) {
			case 'mousedown':
				if (target.className.indexOf('draggable') > -1) {
					dragging = target
					diffx = event.clientX - target.offsetLeft
					diffy = event.clientY - target.offsetTop
					dragdrop.fire({type: 'dragstart', target: dragging, x: event.clientX, y: event.clientY})
				}
				break
			case 'mousemove':
				if (dragging !== null) {
					// 指定位置
					dragging.style.left = (event.clientX - diffx) + 'px'
					dragging.style.top = (event.clientY - diffy) + 'px'
					// 触发自定义事件
					dragdrop.fire({type: 'drag', target: dragging, x: event.clientX, y: event.clientY})
				}
				break
			case 'mouseup':
				dragdrop.fire({type: 'dragend', target: dragging, x: event.clientX, y: event.clientY})
				dragging = null
				break
		}
	}
	// 公共接口
	dragdrop.enable = function() {
		EventUtil.addHandler(document, 'mousedown', handleEvent)
		EventUtil.addHandler(document, 'mousemove', handleEvent)
		EventUtil.addHandler(document, 'mouseup', handleEvent)
	}
	dragdrop.disable = function() {
		EventUtil.removeHandler(document, 'mousedown', handleEvent)
		EventUtil.removeHandler(document, 'mousemove', handleEvent)
		EventUtil.removeHandler(document, 'mouseup', handleEvent)
	}
	return dragdrop
}
/**
26.cookie，子cookie
子cookie通过&连接
**/
var CookieUtil = {
	get: function(name) {
		var cookieName = encodeURIComponent(name) + '=',
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null
		if (cookieStart > -1) {
			var cookieEnd = document.cookie.indexOf(';', cookieStart)
			if (cookieEnd === -1) {
				cookie = document.cookie.length
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd))
		}
		return cookieValue
	},
	set: function(name, value, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value)
		if (expires instanceof date) {
			cookieText += '; expires=' + expires.toGMTString()
		}
		if (path) {
			cookieText += '; path=' + path
		}
		if (domain) {
			cookieText += '; domain=' + domain
		}
		if (secure) {
			cookieText += '; secure'
		}
		document.cookie = cookieText
	},
	unset: function(name, path, domain, secure) {
		this.set(name, '', new Date(0), path, domain, secure)
	}
}

var SubCookieUtil = {
	get: function(name, subName) {
		var subCookies = this.getAll(name)
		if (subCookies) {
			return subCookies[subName]
		} else {
			return null
		}
	},
	getAll: function(name) {
		var cookieName = encodeURIComponent(name) + '=',
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null,
			cookieEnd,
			subCookies,
			i,
			parts,
			result = {}

		if (cookieStart > -1) {
			cookieEnd = document.cookie.indexOf(';', cookieStart)
			if (cookieEnd == -1) {
				cookieEnd = document.cookie.length
			}
			cookieValue = document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
			if (cookieValue.length > 0) {
				subCookies = cookieValue.split('&')
				for (i=0,len=subCookies.length;i<len;i++) {
					parts = subCookies[i].split('=')
					result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1])
				}
				return result
			}
		}
		return null
	},
	set: function(name, subName, value, expires, path, domain, secure) {
		var subCookies = this.getAll(name) || {}
		subCookies[subName] = value
		this.setAll(name, subCookies, expires, path, domain, secure)
	},
	setAll: function(name, subCookies, expires, path, domain, secure) {
		var cookieText = encodeURIComponent(name) + '=',
			subCookiesParts = new Array(),
			subName
		for (subName in subCookies) {
			if (subName.length > 0 && subCookies.hasOwnProperty(subName)) {
				subCookiesParts.push(encodeURIComponent(subName) + '=' + encodeURIComponent(subCookies[subName]))
			}
		}
		if (subCookiesParts.length > 0) {
			cookieText += subCookiesParts.join('&')
			if (expires instanceof date) {
				cookieText += '; expires=' + expires.toGMTString()
			}
			if (path) {
				cookieText += '; path=' + path
			}
			if (domain) {
				cookieText += '; domain=' + domain
			}
			if (secure) {
				cookieText += '; secure'
			}
		} else {
			cookieText += '; expires=' + new Date(0).toGMTString()
		}
		document.cookie = cookieText
	},
	unset: function(name, subName, path, domain, secure) {
		var subCookies = this.getAll(name)
		if (subCookies) {
			delete subCookies[subName]
			this.setAll(name, subCookies, null, path, domain, secure)
		}
	},
	unsetAll: function(name, path, domain, secure) {
		this.setAll(name, null, new Date(0), path, domain, secure)
	}
}

/**
27.Duff装置--展开循环，将循环变少以降低空间复杂度，提高效率
先假设数组长度大于1
此方法适用于大数据集，否则数据量小的时候反而会损失性能
*/
function duffArr(arr, dowhat) {
	var iterations = Math.ceil(arr.length / 8)
	var startAt = arr.length % 8
	var i = 0
	do {
		switch (startAt) {
			case 0: dowhat(arr[i++])
			case 7: dowhat(arr[i++])
			case 6: dowhat(arr[i++])
			case 5: dowhat(arr[i++])
			case 4: dowhat(arr[i++])
			case 3: dowhat(arr[i++])
			case 2: dowhat(arr[i++])
			case 1: dowhat(arr[i++])
		}
		startAt = 0
	} while (--iterations > 0)
}
// 更快的duff装置技术
function duffArr2(arr, dowhat) {
	var iterations = Math.ceil(arr.length / 8)
	var leftover = arr.length % 8
	var i = 0
	if (leftover > 0) {
		do {
			dowhat(arr[i++])
		} while (--leftover > 0)
	}
	do {
		dowhat(arr[i++])
		dowhat(arr[i++])
		dowhat(arr[i++])
		dowhat(arr[i++])
		dowhat(arr[i++])
		dowhat(arr[i++])
		dowhat(arr[i++])
		dowhat(arr[i++])
	} while (--iterations > 0)
}

/**
28.平滑动画
*/
(function() {
	function draw(timestamp) {
		// 计算两次重绘时间间隔
		var drawStart = (timestamp || Date.now()),
			diff = drawStart - startTime

		// 使用diff确定下一次重绘时间（，及一些绘制操作）

		startTime = drawStart
		requestAnimationFrame(draw)
	}
	var requestAnimationFrame = window.requestAnimationFrame ||
								window.mozRequestionAnimationFrame || 
								window.webkitRequestionAnimationFrame || 
								window.msRequestionAnimationFrame,
		startTime = window.mozAnimationStartTime || Date.now()
	requestAnimationFrame(draw)
})()

/**
	29.取随机颜色
*/
var getRandomColor = function(){
  return '#'+Math.floor(Math.random()*16777215).toString(16); 
}

/**
	30.数组常见方法封装 -- TODO 将各类方法按类别重新封装然后合成一个easyTool插件
*/
var ArrayUtil = {
	// 降维打击，扁平化，ES10新增，Array.flat(n)，n表示维度，数字或Infinity无限大
	flat: function(arr, n) {
		if (arr.flat) {
			return arr.flat(n)
		} else {
			// 原理
			function flatten(arr) {
				while (arr.some(item=>Array.isArray(item0))) {
					// 基于ES6
					arr = [].concat(...arr)
				}
				return arr
			}
			return flatten(arr)
		}
	},
	// 去重
	disRepeat: function(arr) {
		if (Array.from) {
			return Array.from(new Set(arr)) // [...new Set(arr)]效果相同。均是基于ES6
		} else {
			// 原理
			Array.prototype.distinct = function() {
				let arr = this,
					result = [],
					i,
					j,
					len = arr.length
				for (i=0;i<len;i++) {
					for (j=i+1;j<length;j++) {
						if (arr[i] === arr[j]) {
							j = ++i
						}
					}
					result.push(arr[i])
				}
				return result
			}// [1,2,3,3].distinct()// [1,2,3]
			return arr.distinct()
		}
	},
	// 排序
	sort: function(arr, f) {
		// sort默认升序，参数是函数。f表示是否降序
		if (f) {
			return arr.sort((a,b) => b-a)// 降序
		} else {
			return arr.sort()
		}
		// 排序原理：
		// 冒泡排序:
		Arry.prototype.bubleSort = function() {
			let arr = this,
				len = arr.length,
				outer,
				inner
			for (outer = len;outer>=2;outer--) {
				for (inner = 0;inner<=outer-1;inner++) {
					if ((arr[inner] > arr[inner+1] && !f)||(arr[inner] < arr[inner+1] && f)) {
						[arr[inner], arr[inner+1]] = [arr[inner+1], arr[inner]]
					}
				}
			}
			return arr
		}// [1,3,2].bubleSort()
		// 选择排序：
		Array.prototype.selectSort = function() {
			let arr = this,
				len = arr.length,
				i,
				j
			for (i = 0; i < len-1; i++) {
				for (j = i+1; j < len; j++) {
					if ((arr[i] > arr[j] && !f)||(arr[i] < arr[j] && f)) {
						[arr[i], arr[j]] = [arr[j], arr[i]]
					}
				}
			}
			return arr
		}
	},
	// 最大、小值
	getMax: function(arr) {
		// return Math.max(...arr) // ES6
		return Math.max.apply(this, arr)
		// return arr.reduce((prev, cur, curIndex, ar)=>{return Math.max(prev, cur)}, 0)// ES5
		// 原理：先排序再取值。Min同理
	},
	// 求和
	getSum: function(arr) {
		if (arr.reduce) {
			return arr.reduce((prev, cur) => { return prev + cur }, 0)
		} else {
			function sum(arr) {
				let len = arr.length
				if (len === 0) {
					return 0
				} else if (len === 1) {
					return arr[0]
				} else {
					// 递归
					return arr[0] + sum(arr.slice(1))
				}
			}
			return sum(arr)
		}
	},
	// 合并
	// arr1.concat(arr2)
	// [...arr1,...arr2]
	// 或前边9的push apply
	// 原理：arr2.map(item=>{arr1.push(item)})
	// 判断是否包含
	includeEl: function(arr, el) {
		return arr.indexOf(el) > -1
		// return arr.includes(el)
		// return arr.find(i=>i===el)
		// return arr.findIndex(i=>i===el)均为ES6
		// 原理：arr.some(i=>{return i=== el})
	},
	// 类数组结构截取（有length属性但不是数组的数据类型）
	// Array.prototype.slice.call(arguments)
	// Array.prototype.slice.apply(arguments)
	// Array.from(arguments)
	// [...arguments]
	// slice原理：从start到end的for循环push到result

	// 给每一项设置值
	// arr.fill(0)// ES6
	// arr.map(() => 0)

	// arr.every(xxx)// ES5
	// arr.some(xxx)// ES5
	// arr.filter(xxx)// ES5

	// 对象数组转化
	// Object.keys(obj)// 对象转数组，取key
	// Object.values(obj)// 对象转数组，取value
	// Object.entries(obj)// 对象转二维数组，每个元素是长度为2的键和值的数组
	// Object.fromEntries(arr)// 数组转对象，ES10，谷歌暂未实现，与上变的过程相反
}

/**
 *31.模块化示例
 */
 // circle.js
const {PI} = Math
export const area = (r) => PI * r ** 2
export const circumference = (r) => PI * r * 2

// index.js
import {area} = './circle.js'
console.log(`圆形面积:${area(2)}`)

/**
 *31.迭代器生成器示例
 */
// stage1
function *makeRangeIterator(start = 0, end = Infinity, step = 1) {
    for (let i = start; i < end; i += step) {
        yield i;
    }
}// 实测*贴着function和贴着方法名没有区别;yield起着类似return的效果
var a = makeRangeIterator(1,10,2)
a.next() // {value: 1, done: false}
a.next() // {value: 3, done: false}

// stage2
function *createIterator(items){
    for (let i = 0; i< items.length; i++){
        yield items[i]
    }
}
let iterator = createIterator([1,2,3])
console.log(iterator.next()); // { value:1, done: false }

// stage3
function *createIterator(){
    yield 1
    yield 2
    yield 3
}
let iterator = createIterator()

console.log(iterator.next().value) //1

/**
 *32.Proxy/Reflect示例
 */
// Proxy/Reflect示例 -- TODO -- 详细了解https://www.cnblogs.com/huansky/p/5687299.html
const observe = (data, callback) => {
      return new Proxy(data, {
            get(target, key) {
                return Reflect.get(target, key)
            },
            set(target, key, value, proxy) {
                  callback(key, value);
                  target[key] = value;
                    return Reflect.set(target, key, value, proxy)
            }
      })
}

const FooBar = { open: false };
const FooBarObserver = observe(FooBar, (property, value) => {
  property === 'open' && value 
          ? console.log('FooBar is open!!!') 
          : console.log('keep waiting');
});
console.log(FooBarObserver.open) // false
FooBarObserver.open = true // FooBar is open!!!

/**
 *33.处理图片数据（初步）
 */
async function myFetch(url) {
      let response = await fetch(url)
      let myBlob = await response.blob()

      let objectURL = URL.createObjectURL(myBlob)
      let image = document.createElement('img')
      image.src = objectURL
      document.body.appendChild(image)
}
// myFetch('coffee.jpg')

/**
 *34.数据加密
 *@ str-目标字符串
 *@ len-要保留的长度
 */
function encryStr(str, len, aimFlag = '*') {
	const lastDigits = str.slice(-len)
	const maskedNumber = lastDigits.padStart(str.length, aimFlag)
	return maskedNumber
}


// StringUtil,match,search,(charAt,indexOf)