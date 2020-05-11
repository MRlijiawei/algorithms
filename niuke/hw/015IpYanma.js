let res = new Array(7).fill(0)
function posits(inStr) {
    let _ins = inStr.split('~')
    checkIpYm(_ins[0], _ins[1])
}
function checkIpYm(ip, _ym) {
    if (!checkYm(_ym)) {
        res[5]++
        return
    }
    let ips = ip.split('.')
    if (ips.filter(ip=>{
        return isNaN(parseInt(ip))
    }).length > 0) {
        res[5]++
        return
    }
    let ip0 = Number(ips[0])
    if (0<ip0 & ip0<127) {
        if (ip0 == 10) res[6]++
        res[0] ++
    } else if (127<ip0 && ip0<192) {
        res[1] ++
        if (ip0 == 172 && 15<Number(ips[1]) && Number(ips[1])<32) {
            res[6]++
        }
    } else if (191<ip0 && ip0<224) {
        res[2] ++
        if (ip0 == 192 && Number(ips[1])==168) {
            res[6]++
        }
    } else if (223<ip0 && ip0<240) {
        res[3] ++
    } else if (239<ip0 && ip0<256) {
        res[4] ++
    }
}
function checkYm(_ym) {
    const _str = _ym.split('.').map(e => {
        return ('00000000'+Number(e).toString(2)).slice(-8)
    }).join('')
    return _str.indexOf('01') == -1 && _str.indexOf('1') == 0 && _str.indexOf('0') > 0
    // let _res = _ym.split('.').reduce((pre,cur)=>pre+ ('00000000'+parseInt(cur).toString(2)).slice(-8),'');
    // return _res.indexOf('1') > -1 && _res.indexOf('0') > -1  && res.indexOf('01') == -1;
}
const inArr1 = ['10.70.44.68~255.254.255.0',
'1.0.0.1~255.0.0.0',
'192.168.0.2~255.255.255.0',
'19..0.~255.255.255.0']
// while(line=readline()) {
//     posits(line)
// }
let inArr = '206.76.161.30~255.0.0.0 159.70.213.68~255.0.0.0 181.131.118.0~255.255.255.0 80.164.71.44~255.255.255.255 12.208.232.42~255.255.0.0 150.24.121.174~255.0.102.0 131.221.165.68~255.0.0.0 160.126.59.101~255.0.75.0 236.239.205.137~255.255.0.0 89.124.33.74~255.0.0.159 233.174.151.221~255.255.0.0 218.140.130.246~255.255.255.255 13.13.219.143~255.0.0.0 232.95.224.67~255.255.255.255 2.108.39.131~255.0.0.0 161.217.200.192~255.0.0.0 123.170.177.162~255.0.0.0 239.64.91.24~255.0.0.0 241.199.108.210~255.255.255.0 117.0.169.232~255.255.255.255 122.49.165.60~255.255.242.255 71.148.13.251~255.0.0.32 199.22.216.173~255.254.27.0 58.24.55.101~255.132.255.0 68.128.113.136~255.0.0.0 197.234.247.46~255.255.255.0 79.22.71.93~255.255.0.0 250.217.239.76~255.0.8.0 153.96.7.235~255.255.0.0 237.173.48.19~255.0.0.0 140.48.84.23~255.255.255.0 107.222.50.243~255.0.0.0 189.224.126.176~255.255.255.0 111.9.155.102~255.0.0.0 117.4.142.205~255.255.255.255 59.0.177.100~255.255.0.0 60.70.81.248~255.255.255.255 72.85.2.100~255.255.125.0 74.15.130.23~255.0.0.0 37.51.172.97~255.255.255.149 51.58.149.175~255.0.0.0 76.106.99.1~255.255.0.0 198.102.96.87~255.255.0.0 97.170.76.38~255.0.214.0 42.115.213.173~255.255.0.0 95.115.180.128~255.255.0.0 192.240.88.125~255.0.0.47 148.36.118.39~255.0.0.0 237.211.17.109~255.255.255.255 161.230.133.200~255.0.0.0 163.139.243.139~255.0.0.0 249.174.134.36~255.255.255.0 148.64.179.63~255.0.0.0 59.156.109.132~255.0.0.0 42.50.113.7~255.0.0.0 225.95.158.160~255.0.0.0 133.17.112.129~255.0.152.0 212.183.133.49~255.255.0.0 183.12.213.169~255.255.255.255 7.144.20.194~255.255.0.0 106.46.24.252~255.255.255.255 51.181.112.115~255.0.0.0 47.243.149.186~255.255.255.0 174.11.159.234~255.0.0.0 8.83.231.207~255.0.0.0 212.211.51.229~255.0.0.0 6.13.59.212~255.255.119.0 131.151.60.159~255.0.0.0 47.21.57.12~255.0.0.0 136.242.238.159~255.0.0.0 249.200.157.157~255.255.255.0 150.2.21.239~255.0.0.0 26.100.58.90~255.226.0.0 7.167.169.193~255.255.255.0 48.49.16.45~255.132.0.0 67.244.5.142~255.0.189.0 239.170.232.59~255.0.0.0 223.138.166.166~255.0.0.103 199.65.124.179~255.255.0.0 231.121.177.81~255.255.186.193 30.247.220.230~255.255.255.0 227.72.33.192~255.255.255.255 126.189.96.104~255.255.167.255'.split(' ')
let i = 0
while(i<inArr.length) {
    posits(inArr[i])
    i++
}
console.log(res.join(' '))