/**
 * 
 * @param arr int整型一维数组 the array
 * @return int整型
 */
 function maxLength( arr ) {
    var newArr = {};
    var l=0, r=0, maxLen=0;
    while(l<arr.length&& r<arr.length){//寻找每次的无重复字串
         if(!newArr[arr[r]]){ //结束索引对应的值不在map中 或者 与子串中之前的值没有重复
             newArr[arr[r]]=1;//结束索引对应的值放入map中，1代表出现了1次
             r++;//开始索引r的无重复字串往后移动
         }else{//结束索引对应的值在map中 或者与子串中之前的值有重复
             newArr[arr[l]]=0; //开始索引为l 的无重复字串已找到，此时把该值出现的次数改为0
             l++; //从新的开始索引处往后寻找无重复字串
         }
        maxLen = Math.max(maxLen,(r-l));//更新最大长度
    }
    return maxLen;
}
module.exports = {
    maxLength : maxLength
};