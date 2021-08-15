// 设计LRU(最近最少使用)缓存结构，该结构在构造时确定大小，假设大小为K，并有如下两个功能
// 1. set(key, value)：将记录(key, value)插入该结构
// 2. get(key)：返回key对应的value值

// 提示:
// 1.某个key的set或get操作一旦发生，认为这个key的记录成了最常使用的，然后都会刷新缓存。
// 2.当缓存的大小超过K时，移除最不经常使用的记录。
// 3.输入一个二维数组与K，二维数组每一维有2个或者3个数字，第1个数字为opt，第2，3个数字为key，value
//    若opt=1，接下来两个整数key, value，表示set(key, value)
//    若opt=2，接下来一个整数key，表示get(key)，若key未出现过或已被移除，则返回-1
//    对于每个opt=2，输出一个答案
// 4.为了方便区分缓存里key与value，下面说明的缓存里key用""号包裹

// 进阶:你是否可以在O(1)的时间复杂度完成set和get操作

// 数据量大时超时了！——TODO
/**
 * lru design
 * @param operators int整型二维数组 the ops
 * @param k int整型 the k
 * @return int整型一维数组
 */
 function LRU( operators ,  k ) {
    this._map = {}
    this._ind = 0
    this.out = []
    this.set = function(_k,v) {
        if (!this.checkSize()) {
            this.delLeast()
        }
        this._map[_k] = {val: v, ind: this._ind}
        this._ind++
    }
    this.get = function(_k) {
        if (this._map[_k]) {
            this._map[_k].ind = this._ind
            this._ind++
            return this._map[_k].val
        } else {
            return -1
        }
    }
    this.checkSize = function() {
        return Object.keys(this._map) <= k
    }
    this.delLeast = function() {
        var least = Object.values(this._map).sort((a1, a2) => {
            return a2.ind - a1.ind
        })
        delete(this._map[least[0].val])
    }
    this.opStep = function(op) {
        switch(op[0]) {
            case 1:
                this.set(op[1], op[2]);
                break;
            case 2:
                this.out.push(this.get(op[1]));
                break;
            default:
                break;
        }
    }
    operators.forEach(e => {
        this.opStep(e)
    })
    return this.out
}
module.exports = {
    LRU : LRU
};