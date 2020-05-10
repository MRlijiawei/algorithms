const firstIn = readline()
const allMoney = Number(firstIn.split(' ')[0])
const allMoneyLen = allMoney / 10
const allNum = Number(firstIn.split(' ')[1])
let goods = [],
    _num=1
while(_num<=allNum){
    const _input = readline().split(' ').map(val=>parseInt(val))
    if (_input[2]===0) {
        goods[_num] = [{price:_input[0]/10, weight: _input[1]*_input[0]/10}]
    } else {
        let add = goods[_input[2]].map(e => {
            return {
                price: _input[0]/10+e.price,
                weight: e.weight + _input[1]*_input[0]/10
            }
        })
        goods[_input[2]] = [...goods[_input[2]],...add]
    }
    _num++;
}
console.log(choose(goods))
function choose(goods){
    var res=new Array(allMoneyLen+1).fill(0);
    for(var i=1;i<goods.length;i++){
        for(var j=allMoneyLen;j>=0;j--){
            if(goods[i]){
                goods[i].forEach(val=>{
                    if(val.price<=j){
                        res[j]=Math.max(res[j],res[j-val.price]+val.weight);
                    }
                })
            }
        }
    }
    return res[allMoneyLen]*10;
}