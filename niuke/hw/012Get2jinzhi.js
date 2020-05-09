// 转化为2进制字符：a.toString(2)
function get1Times(int) {
    let _str = Number(int).toString(2)
    return _str.split('').filter(e=>{return e=='1'}).length
}
const _int = readline()
console.log(get1Times(_int))