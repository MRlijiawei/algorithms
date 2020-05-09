const num = readline() + ''
function getRvsSetNum(numStr) {
    let newStr = ''
    for (var j=numStr.length;j>0;j--) {
        if (newStr.indexOf(numStr[j-1]) == -1) {
            newStr += numStr[j-1]
        }
    }
    return newStr
}
console.log(getRvsSetNum(num))