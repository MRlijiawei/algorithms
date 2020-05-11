function remErrors(erArr) {
    let res = []
    let resObj = {}
    let curIndex = -1
    erArr.forEach(er => {
        let spAr = er.trim().split(' ')
        let name = spAr[0].substr(er.lastIndexOf('\\')+1).slice(-16)
        // 多个空格会被当成多个元素
        let line = spAr[spAr.length - 1]
        if (resObj[spAr[0]]) {
            res[resObj[spAr[0]]].line += ','+line
        } else {
            res.push({
                name,
                line
            })
            curIndex++
            resObj[spAr[0]] = curIndex
        }
    })
    console.log(res)
    return res.slice(-8)
}
let _inArr = ['E:\V1R2\product\fpgadrive.c   1325','C:\gtu\vcy\jk\zwthkipl 636']
// while(_input=readline()) {
//     _inArr.push(_input)
// }
let finalRes = remErrors(_inArr)
finalRes.forEach(re => {
    console.log(re.name + ' ' + re.line + ' ' + re.line.split(',').length)
})

///// 以上的逻辑是从头处理，最后取后8个
///// 以下是从后往前取8个，并再输出这8个的实际从前往后顺序
function remErrors(erArr) {
    let res = []
    let resObj = {}
    let curIndex = -1
    //erArr.forEach(er => {
    for (let i=erArr.length;i>0;i--) {
        let er = erArr[i-1]
        let spAr = er.trim().split(' ')
        let name = spAr[0].substr(er.lastIndexOf('\\')+1).slice(-16)
        // 多个空格会被当成多个元素
        let line = spAr[spAr.length - 1]
        if (resObj[spAr[0]]) {
            // 
            res[resObj[spAr[0]]].line += ','+line
        } else {
            res.push({
                name,
                line,
                fullName: spAr[0]
            })
            curIndex++
            // 避免不同目录同文件名，用包括路径的全名
            resObj[spAr[0]] = curIndex + ''
        }
    }
    //})
    // console.log(res)
    // return res.slice(-8)
    return res.slice(0,8).reverse()
}
let _inArr = []
while(_input=readline()) {
    _inArr.push(_input)
}
///// 这里是直接截取输入的最后8个进行处理，最简单的方法
// _inArr = _inArr.slice(-8)
let finalRes = remErrors(_inArr)
let outStr = []
finalRes.forEach(re => {
    let _line = re.line.split(',')
    outStr.push(re.name+' '+_line[0]+' '+_line.length)
})
console.log(outStr.join(' '))