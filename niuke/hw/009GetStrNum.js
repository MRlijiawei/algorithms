function getNum(str) {
    return [...new Set(str.split(''))].length
}
const str = readline()
console.log(getNum(str))