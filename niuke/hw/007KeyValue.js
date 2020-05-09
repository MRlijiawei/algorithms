const _num = readline()
let oldObj = {}
for (let i=0;i<_num;i++) {
    let keyVal = readline()
    if (oldObj[keyVal.split(' ')[0]]) {
        oldObj[keyVal.split(' ')[0]] += Number(keyVal.split(' ')[1])
    } else {
        oldObj[keyVal.split(' ')[0]] = Number(keyVal.split(' ')[1])
    }
}
const keys = Object.keys(oldObj)
for (let j=0;j<keys.length;j++) {
    console.log(keys[j] + ' ' + oldObj[keys[j]])
}
// for in=> 对象：返回对象枚举的value；数组：返回index