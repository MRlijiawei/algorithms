/**
图片、canvas/base64、blob、file之间的转化总结（并非并列关系）
canvas转base64和blob有直接的api toDataURL(type, scale)和toBlob(callback参数是blob对象, type, scale) 可以调用，不再写
FileReader的readAsArrayBuffer，readAsDataURL，readAsText，参数都是blob
*/
// export default class ICBF {
class ICBF {
	constructor({}){}
	/*取不包含后缀的文件名，取后缀，取file的type，大小格式化*/

	/*
	* 图片转canvas/base64
	* @params image图片元素;ext要导出的格式，默认png;scale压缩比例，默认1，比例可根据宽高做自适应以免过大时占内存和存储容量过多
	*/
	imgToBase64(image, ext = 'png', scale = 1) {
		let width = image.width,
			height = image.height,
			canvas = document.createElement('canvas')
		canvas.width = width
		canvas.height = height
		let context = canvas.getContext('2d')
		// 背景透明直接导出可能是黑色，可以填充白色导出jpg或透明尝试导出png
		ctx.drawImage(img, 0, 0, width, height)
		// 如果只要画到canvas上到这里就可以了
		let dataURL = canvas.toDataURL(`image/${ext}`, scale)
		// canvas = null // 释放内存
		return dataURL
	}
	/*
	* 给图片的URL，转canvas（待亲自测试）下边有第2种方法，使用XMLHttpRequest和FileReader
	* @params image图片的URL，;ext要导出的格式；scale压缩比例
	*/
	imgUrlToBase64(url, ext = 'png', scale = 1,  callback) {
		let img = new Image,
			canvas = document.createElement('canvas')
		img.crossOrigin = 'Anonymous'
		img.src = url
		img.onload = function () {
			let width = img.width,
				height = img.height
			canvas.width = width
			canvas.height = height
			// 宽高应该可以获取到
			let context = canvas.getContext('2d')
			// 背景透明直接导出可能是黑色，可以填充白色导出jpg或透明尝试导出png
			ctx.drawImage(img, 0, 0, width, height)
			// 如果只要画到canvas上到这里就可以了
			let dataURL = canvas.toDataURL(`image/${ext}`, scale)
			// canvas = null // 释放内存
			callback.call(this, dataURL)// 将base64传给回调
			return dataURL
		}
	}
	/*
	* 图片转Blob
	* @params image图片元素;ext要导出的格式，默认png;scale压缩比例，默认1，比例可根据宽高做自适应以免过大时占内存和存储容量过多
	*/
	imgToBlob(image, ext = 'png', scale = 1, callback) {
		let width = image.width,
			height = image.height,
			canvas = document.createElement('canvas')
		canvas.width = width
		canvas.height = height
		let context = canvas.getContext('2d')
		// 背景透明直接导出可能是黑色，可以填充白色导出jpg或透明尝试导出png
		ctx.drawImage(img, 0, 0, width, height)
		// 如果只要画到canvas上到这里就可以了
		let dataURL = canvas.toBlob(callback, `image/${ext}`, scale)
		// canvas = null // 释放内存
		return dataURL
	}
	/*
	* 给图片的URL，转Blob —— 原理：XMLHttpRequest和FileReader（待测试）
	* @params image图片元素;ext要导出的格式，默认png;scale压缩比例，默认1，比例可根据宽高做自适应以免过大时占内存和存储容量过多
	*/
	imgToBlob(image, ext = 'png', scale = 1, callback) {
		window.URL = window.URL || window.webkitURL
		let xhr = new XMLHttpRequest()
      	xhr.open("get", imgUrl, true)
      	xhr.responseType = "blob"// 主要原理
      	xhr.onload = function () {// (res){if (res.status...)}
      		if (this.status === 200) {
      			let blob = this.response,// 1.转blob —— 这里就是blob了
      				fileRd = new FileReader()
      			fileRd.onloadend = function(e) {
      				let base64 = e.target.result// 2.转base64 —— base64的第二种。不需要base64的可以不写这个onloadend
      			}
      			fileRd.readAsDataURL(blob)// 此时将使用2的base64可以直接下载
      			// document.getElementById('xxx').innerHtml = '<a download href="' + window.URL.createObjectURL(blob) + '" target="_blank">文件下载</a>'download属性是下载的文件名
      			// 	3.供页面下载，手动触发一下这个a的click即可
      			let img = document.createElement("img")
		        img.onload = function (e) {
		            window.URL.revokeObjectURL(img.src) // 清除释放
		        }
		        let src = window.URL.createObjectURL(blob)
		        img.src = src
		        // document.getElementById("xxx").appendChild(img)// 4.页面显示  在显示前可以做很多处理，比如压缩，调整尺寸，调色修图等
      		}
      	
      	}
	}
	/*
	* 给base64，转Blob 和file/img —— 原理：分析base64，然后转成blob，再用Uint8Array生成文件（待测试）
	* @params image图片元素;ext要导出的格式，默认png;scale压缩比例，默认1，比例可根据宽高做自适应以免过大时占内存和存储容量过多
	*/
	base64ToBlobFile (base64, filename = 'file') {
		let arr = base64.split(',')
		let mime = arr[0].match(/:(.*?);/)[1]
		let suffix = mime.split('/')[1]
		let bstr = atob(arr[1])// 
		let n = bstr.length
		let u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		return new File([u8arr], `${filename}.${suffix}`, {type: mime})
		// 文件可用来上传或下载等
		// return new Blob([u8arr], { type: mime })// 这是转blob
	}
	/*
	*其他，1.base64转canvas，只需要用img作为中介（img的src=base64）；
	*2.canvas转blob可以直接toBlob
	*/
}