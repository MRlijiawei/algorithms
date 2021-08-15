// 假设链表中每一个节点的值都在 0 - 9 之间，那么链表整体就可以代表一个整数。
// 给定两个这种链表，请生成代表两个整数相加值的结果链表。
// 例如：链表 1 为 9->3->7，链表 2 为 6->3，最后生成新的结果链表为 1->0->0->0。

// 超时——TODO
/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

/**
 * 
 * @param head1 ListNode类 
 * @param head2 ListNode类 
 * @return ListNode类
 */
 function addInList( head1 ,  head2 ) {
    var arr1 = [],
        arr2 = [],
        // sumArr = [],
        sum = 0,
        deg = 0,
        len = 0
    while(head1 != null || head2 != null) {
        if (head1 != null) {
            arr1.unshift(head1.val)
            head1 = head1.next
        }
        if (head2 != null) {
            arr2.unshift(head2.val)
            head2 = head2.next
        }
        len++
    }
    var p,p1=null
    for (var i=0;i<len;i++) {
        var _sum = (+(arr1[i]||0))+(+(arr2[i]||0))+deg
        // sumArr.push(_sum%10)
        deg = Math.floor(_sum/10)
        p=new ListNode(_sum%10)
        p.next = p1
        p1 = p
    }
    if (deg > 0) {
        // sumArr.push(deg)
        p=new ListNode(deg)
        p.next = p1
    }
//     for (var j=0;j<sumArr.length;j++) {
//         p=new ListNode(sumArr[j])
//         p.next = p1
//         p1 = p
//     }
    return p
}
module.exports = {
    addInList : addInList
};