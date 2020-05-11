// 遍历字符串
//for (var i in str) {
//       var asc = str.charCodeAt(i)

function validPwd(str) {
    let _returns = 'OK'
    if (str.length < 9 || hasSub(str, 3)) {
        _returns = 'NG'
        return _returns
    }
    // ulFlag--没有英文
    let ulFlag = str.toUpperCase() == str && str.toLowerCase() == str
    // uolFlag--没有英文或全小写、全大写
    let uolFlag = str.toUpperCase() == str || str.toLowerCase() == str
    if (ulFlag) {
        _returns = 'NG'
    } else {
        // 有英文字母
        if (uolFlag) {
            // 全大写或全小写
            if (str.split('').filter(e=>{
                return !isNaN(parseInt(e))
            }).length == 0 || !hasSpecial(str)) {
                // 不包含数字或特殊符号
                 _returns = 'NG'
            }
        } else {
            // 有大小写字母
            if (str.split('').filter(e=>{
                return !isNaN(parseInt(e))
            }).length == 0 && !hasSpecial(str)) {
                // 不包含数字和特殊符号
                 _returns = 'NG'
            }
        }
    }
    return _returns
}
// 特殊符号的asc码（48-57:0~9；65-90和97-122：英文字母）
function hasSpecial(str) {
    for(var i in str) {
        let asc = str.charCodeAt(i)
        if (!(asc >= 48 && asc <= 57 || asc >= 65 && asc <= 90 || asc >= 97 && asc <= 122)) {
            return true;
        }
    }
    return false
}
// 包含指定长度的子串
function hasSub(str, limit) {
    for(var i in str) {
        let sub = str.substr(i,limit)
        if (str.indexOf(sub) != str.lastIndexOf(sub) && sub.length == limit) {
            return true
        }
    }
    return false
}
while(_input = readline()) {
    console.log(validPwd(_input))
}