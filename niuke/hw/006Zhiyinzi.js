function getResult(longNum) {
    let curSub = 2,
        curNum = longNum,
        subArr = []
    // while(curNum%curSub == 0) {
    while(curNum > curSub) {
        if (curNum%curSub == 0) {
            subArr.push(curSub + ' ')
            curNum = curNum / curSub
        } else {
            curSub ++
        }
    }
    subArr.push(curNum)
    return subArr.join('') + ' '
}
const inputNum = readline()
console.log(getResult(inputNum))