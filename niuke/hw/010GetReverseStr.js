function reverseStr(str) {
    return str.split('').reverse().join('')
    // 英文语句翻转
    // str.split(' ').reverse().join(' ')
}
const numStr = readline()
console.log(reverseStr(numStr))