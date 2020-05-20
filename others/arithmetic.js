/*
 * 随机给定一个y行x列的点阵(x>=2, y>=2), 里面每一个点只有●和○两个状态, 可以改变任意位置的点
 * (●改成○, ○改成●), 但是改变的同时, 这个点的上下左右相邻的点也会改变(不是所有的点都存在4个
 * 相邻点, 比如首行的点没有"上", 首列的点没有"左"), 实现一种算法把所有○都变成●, 给出具体的操
 * 作步骤.(1.要求步骤越少越好  2.有的组合没有结果)
 * eg:        改第1个点             改第4个点
 * ●  ○  ●     =>     ○  ●  ●     =>     ●  ●  ●
 * ●  ○  ●            ○  ○  ●            ●  ●  ●
 * 这是一个2*3的点阵, 可以表示为(x=3,y=2,state='101101') state是点阵中从左往右从上往下取出
 * 每个点的状态合起来的一个状态值, ●表示1, ○表示0
 */
(function main() {
  function run(x, y, state) {
    if (state.length < 4) {
      return '没有结果'
    }

    // 展开转矩阵
    function toMat(x, state) {
      const _length = state.length
      const _arr = []
      for (let pos = 0; pos < _length; pos++) {
        if (pos % x === 0) {
          _arr.push([])
        }
        _arr[parseInt(pos / x)].push(state[pos])
      }
      return _arr
    }

    function minFlips(mat) {
      var dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
        [0, 0]
      ]
      var ans = null

      // 反转点的值，同时将上下左右（存在的话）的点值反转
      function convert(mat, m, n, i, j) {
        for (var k = 0; k < 5; ++k) {
          var i0 = i + dirs[k][0],
            j0 = j + dirs[k][1]
          if (i0 >= 0 && i0 < m && j0 >= 0 && j0 < n) {
            mat[i0][j0] ^= 1
          }
        }
      }
      // 深度优先搜索
      function dfs(mat, m, n, pos, flip_oper) {
        if (pos === m * n) {
          var flag = true
          for (var i = 0; i < m; ++i) {
            for (var j = 0; j < n; ++j) {
              if (mat[i][j] != 1) {
                flag = false
              }
            }
          }
          if (flag) {
            if (!ans || ans.length > flip_oper.length)
              ans = flip_oper
          }
          return
        }
        const x = parseInt(pos / n)
        const y = pos % n

        dfs(mat, m, n, pos + 1, [...flip_oper])
        convert(mat, m, n, x, y)

        dfs(mat, m, n, pos + 1, [...flip_oper, pos + 1])
        convert(mat, m, n, x, y)
      }

      var m = mat.length,
        n = mat[0].length
      dfs(mat, m, n, 0, [])
      return (ans != null ? ans.join('') : '没有结果')
    }
    const mat = toMat(x, state)
    return minFlips(mat)
  }
}());


function flatArr(ar) {
	return ar.flat()
}
// flat原理
function flatArr(ar) {
	let arr = []
	ar.forEach(a=>{
		if (Object.prototype.toString.call(a) == '[object Array]') {
			arr = arr.concat(flatArr(a))
		} else {
			arr.push(a)
		}
	})
	return arr
}

// 事件队列 - 结合块级作用域 - 结合定时器
for (var i=0;i<5;i++) {
	// 两个for是事件队列的两个，第一个for会给事件队列插入5个定时任务，for之后执行，此时i是var的，是全局变量，因而i是5
	setTimeout(function () {
		// 块级作用域
		console.log(i)
	})
}// 5,5,5,5,5
for (let i=0;i<5;i++) {
	setTimeout(function () {
		// 块级作用域
		console.log(i)
	})
}// 0,1,2,3,4

// Promise.race, Promise.all