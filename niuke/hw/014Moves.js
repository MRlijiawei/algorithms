function getValidMove(str) {
    let moves = str.split(';')
    return moves.filter(e => {
        return indexASDW(e)
    })
}
function indexASDW(str) {
    if (!(1 < str < 4)) {
        return false
    }
    const _str = 'ASDW'
    return _str.indexOf(str[0]) > -1 && !isNaN(str.substr(1))
}
function getMoves(moves) {
    let x = 0,
        y = 0
    moves.forEach(e=>{
        let far = Number(e.substr(1))
        switch(e[0]) {
            case 'A':
                x -= far
                break
            case 'D':
                x += far
                break
            case 'S':
                y -= far
                break
            case 'W':
                y += far
                break
            default:
                break
        }
    })
    return x+','+y
}
while (line = readline()) {
    console.log(getMoves(getValidMove(line)))
}