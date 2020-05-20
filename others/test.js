function setData(data) {
	data.value = 2
	data = {value:3}
	data.value = 4
}
var data = {value:1}
setData(data)// data.value = 2

let m=0
function aa(n) {
	return n = n+1
}
m=aa(m)
function aa(n) {
	return n = n+2
}
m=aa(m)// m=4

function a() {
	let name = 'a'
	return function() {
		return name
	}
}