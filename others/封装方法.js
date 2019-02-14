/**
* a中是否包含b，及其位置
*/
function searchL(a, b) {
	return {
		"contain": a.search(b) !== -1,
		//同indexOf
		"position": a.search(b)
	}
}

/**
* 批量push
*let a = [];
*push(a, 1, 2, 3);
*/
function pushL(array, ...items)) {
	items.forEach(function(item) {
		array.push(item);
	});
}