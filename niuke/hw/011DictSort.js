const _str = 'abcdefghijklmnopqrstuvwxyz'
const _strArr = _str.split('')
let _indexObj = {}
_strArr.forEach((e,index)=>{
    _indexObj[e] = index + 1
})
function transCharToNum(char) {
    let num = 0
    for(let i=0;i<char.length;i++) {
        num += 1/Math.pow(_indexObj[char[i].toLowerCase()],i+1)
    }
    return num
}
function sortDict(a, b) {
    return transCharToNum(b) - transCharToNum(a)
}
// 以上为字典排序逻辑，这里实际用不到
const times = readline()
let inputArr = []
for (let j=0;j<times;j++) {
    inputArr.push(readline())
}
// console.log(inputArr.sort(sortDict).join('\n'))
// sort实际会按照字母进行排序
console.log(inputArr.sort().join('\n'))