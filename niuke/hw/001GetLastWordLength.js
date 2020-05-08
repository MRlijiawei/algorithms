var str=readline()
var getLastWordLength = (word) => {
    if (typeof word !== 'string') {
        new Error('Not a string')
        return false
    }
    const index = word.lastIndexOf(' ')
    return index > -1 ? (word.length - 1 - index) : word.length
}
console.log(getLastWordLength(str))