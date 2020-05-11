let cTotal = 0,
    bTotal = 0
function changeBeer(bNum) {
    let cNum = parseInt(bNum/3)
    let nNum = bNum - 2*cNum
    cTotal += cNum
    bTotal = nNum
    if (bTotal > 2) {
        changeBeer(bTotal)
    }
    if (bTotal == 2) {
        cTotal ++
        bTotal = 0
    }
}
while (_in = readline()) {
    if (_in == 0) {
        break
    }
    cTotal = 0
    bTotal = Number(_in)
    changeBeer(bTotal)
    console.log(cTotal)
}