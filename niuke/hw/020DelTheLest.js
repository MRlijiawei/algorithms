// 删除出现次数最少的字母
function getCharAndTimes(str) {
    let times = [],
        chars = []
    for (let i in str) {
        if (chars.indexOf(str[i]) == -1) {
            chars.push(str[i])
            times.push(1)
        } else {
            times[chars.indexOf(str[i])]++
        }
    }
    // 取数组中最小值
    let min = Math.min.apply(null, times)
    let delChar = chars.filter((e,index)=>{
        return min == times[index]
    })
    return str.split('').filter(e=>{
        return delChar.indexOf(e) == -1
    }).join('')
}
while(_in=readline()) {
    console.log(getCharAndTimes(_in))
}