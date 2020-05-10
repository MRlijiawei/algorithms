const firstIn = readline()
const allMoney = Number(firstIn.split(' ')[0])
const allNum = Number(firstIn.split(' ')[1])
let priceArr = [],
    impArr = [],
    mainArr = []
for (let i=0;i<allNum;i++) {
    const _input = readline()
    priceArr.push(_input.split(' ')[0])
    impArr.push(_input.split(' ')[1])
    mainArr.push(_input.split(' ')[2])
}
function getTotalImp(buyArr) {
    let totalImp = 0
    let totalMoney = 0
    buyArr.forEach((e, index) => {
        if (e == 1) {
            if (totalMoney + Number(priceArr[index]) <= allMoney) {
                totalImp += Number(impArr[index]) * Number(priceArr[index])
                totalMoney += Number(priceArr[index])
            }
        }
    })
    return totalImp
}
function checkValid(ar) {
    let flag = true
    ar.forEach((a,ind)=>{
        if (a==1) {
            if (mainArr[ind]>0 && ar[mainArr[ind]-1] != 1) {
                flag = false
            }
        }
    })
    return flag
}
let allBuys = []
let allImps = []
for (let j=0;j<allNum;j++) {
    for (let m=0;m<allNum;m++) {
    
    } 
}
for (let j=0;j<Math.pow(2,allNum);j++) {
    let singleBuy = new Array(allNum).fill(0),
        jStr = j.toString(2),
        strLen = jStr.length
    for (m=0;m<strLen;m++) {
        singleBuy[allNum-1-m] = Number(jStr[strLen-1-m])
    }
    if (checkValid(singleBuy)) {
        allBuys.push(singleBuy)
        allImps.push(getTotalImp(singleBuy))
    }
}
console.log(allImps.sort()[allImps.length-1])