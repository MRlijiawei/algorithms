var _str = readline()
var _char = readline()
function getTimes(str, char) {
    str = str.toLowerCase()
    char = char.toLowerCase()
    let times = 0
    for(let i = 0; i < str.length; i++) {
        if (str[i] === char) {
            times ++
        }
    }
    return times
}
console.log(getTimes(_str, _char))