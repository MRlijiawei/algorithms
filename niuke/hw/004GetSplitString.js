function splitBy8(str) {
    let arr = []
    const times = Math.ceil(str.length/8)
    const needNum = times * 8 - str.length
    for(let i=0;i<times;i++) {
        let _subStr = str.substr(i*8, 8)
        arr.push(_subStr)
    }
    for (let j=0;j<needNum;j++) {
        arr[times-1] += '0'
    }
    return arr
}
let str1 = readline()
let str2 = readline()
let arrs = splitBy8(str1).concat(splitBy8(str2))
for (let m=0;m<arrs.length;m++) {
    console.log(arrs[m])
}