/**
 * 反转字符串
 * @param str string字符串 
 * @return string字符串
 */
 function reverseStr( str ) {
    return str.split("").reverse().join("")
}
module.exports = {
    reverseStr
};