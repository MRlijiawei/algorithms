/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead)
{
    let cur = pHead
    let pre = null
    while (cur != null) {
        let cnext = cur.next
        cur.next = pre
        pre = cur
        cur = cnext
    }
    return pre// ???不懂，到底入参是什么实例
}