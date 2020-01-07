/**
* 斐波那契数列
*/
// 1.正常定义性写法——递归
function fb(n) {
	if (n < 2) {
		return 1
	} else {
		return fb(n - 1) + fb(n - 2)
	}
}
// 思路清晰，但执行时由于重复运算太多，非常慢，50就会有分钟级的时间需求

// 2.迭代
function fb(n) {
	var a = 0,b = 1,
		sum = 0
	for (var i=1;i<=n;i++) {
		sum = a + b
		a = b
		b = sum
	}
	return sum
}

// 3.闭包
const fb = function(){
    var mem = [0,1];
    var f = function(n){
        var res = mem[n];
        if(typeof res !== 'number'){
            mem[n] = f(n-1) + f(n-2);
            res = mem[n];
        }
        return res;
    }
    return f;
}()
// 2和3都会规避掉重复的计算，速度很快

// 4.递归并去掉重复计算
function fb(n){
  function fb_(n,a,b){
    if(n==0)  return a
    else return fb_(n-1,b,a+b)
   }
   return fb_(n,0,1)
}
// 可以简化为以下
function fb_(n,a=0,b=1){
    if(n==0)  return a
    else return fb_(n-1,b,a+b)
}
// 4避免重复计算采用把前两位作为参数传下去

// 5.使用记忆函数，将1优化
function memozi(fn){
  var r = {}
  return function(n){
    if(r[n] == null){
      r[n] = fn(n)
      return r[n]
    }else{
        return r[n]
    }
  }
}
var fb = memozi(function(n){
    if (n < 2) {
		return 1
	} else {
		return fb(n - 1) + fb(n - 2)
	}
})

// 6.使用惰性序列
function fb(n) {
	// 空序列
	var _empty = {"@placeholder@":"@@"}
	var _end = _empty
	// 序对构造 惰性序列的值只有在需要用到的时候才进行求值 这里用function来代表
	function pair(a,fn){
	  return {
	    left:a,
	    right:fn,
	    rightCache:null
	  }
	}
	function isFunction(p){
	  return Object.prototype.toString.call(p) == "[object Function]"
	}
	function left(p){
	  return p.left
	}
	function right(p){
	  if(isEmpty(p.right)){
	    return p.right
	  }else if(isFunction(p.right)){
	    if(p.rightCache != null){
	      return p.rightCache
	    }else{
	      p.rightCache = p.right(p)
	      return p.rightCache
	    }
	  }else{
	    throw "序列的第二个参数必须是一个函数"
	  }
	}
	function isEmpty(seq){
	  return seq == _empty
	}
	function isArrEmpty(arr){
	  return arr.length == 0
	}

	function toArray(seq){
	  if(isEmpty(seq)){
	    return []
	  }else{
	    return [left(seq)].concat(toArray(right(seq)))
	  }
	}
	function toSeq(arr){
	  if(isArrEmpty(arr)){
	    return _end
	  }else{
	    return pair(arr[0],p=>toSeq(arr.slice(1)))
	  }
	}
	function map(fn,seq){
	  if(isEmpty(seq)){
	    return _end
	  }else{
	    return pair(fn(left(seq)),p=>map(fn,right(seq)))
	  }
	}
	function take(n,seq){
	  if(isEmpty(seq)){
	    return _end
	  }else if(n==0){
	    return _end
	  }else{
	    return pair(left(seq),p=>take(n-1,right(seq)))
	  }
	}

	function zip(fn,seq1,seq2){
	  if(isEmpty(seq1)){
	    return _end
	  }else if(isEmpty(seq2)){
	    return _end
	  }else{
	    var l1 = left(seq1)
	    var l2 = left(seq2)
	    return pair(fn(l1,l2),p=>zip(fn,right(seq1),right(seq2)))
	  }
	}

	var fibonacci = pair(1,p=>pair(1,p1=>zip((a,b)=>a+b,p,p1)))
	// 如果上边一行的第一个1改成0，这里就需要使用n+1
	return toArray(take(n,fibonacci))
}

/**
*阶乘
*/
// 1.递归
function factorial(num){
    if(num <= 1) {
         return 1;      
    }else{
          return num * factorial(num-1);   
    }
}
// 2.用arguments的属性callee指向拥有这个对象的函数
function factorial(num){
    if(num <= 1) {
         return 1;      
    }else{
          return num * arguments.callee(num-1);   
    }
}