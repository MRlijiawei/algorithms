// 按手机9宫键盘加密解密：charCodeAt--String.fromCharCode实现字符与asc码互转
function getPwd(opwd) {
    let pwd = ''
    for (let i in opwd) {
        let asc = opwd.charCodeAt(i),
            ochar = ''
        // 数字
        if (48<=asc&&asc<=57) {
            ochar=opwd[i]
        } else
            // 大写
            if (65<=asc&&asc<=90) {
                if (asc == 90) {
                    ochar = 'a'
                }
                ochar=String.fromCharCode(asc+1).toLowerCase()
            } else
            // 小写
            if (97<=asc&&asc<=122) {
                if (97<=asc&&asc<=111) {
                    ochar = parseInt((asc-91)/3)
                } else {
                    if (112<=asc&&asc<=115) {
                        ochar = 7
                    } else
                    if (116<=asc&&asc<=118) {
                        ochar = 8
                    } else {
                        ochar = 9
                    }
                }
            } else {
                ochar=opwd[i]
            }
        pwd += ochar
    }
    return pwd
}
while (_in = readline()) {
    console.log(getPwd(_in))
}