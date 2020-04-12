/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function (head) {
  let pointer1 = head;
  let pointer2 = head;

  while (pointer2 && pointer2.next) {
    pointer1 = pointer1.next;
    pointer2 = pointer2.next.next;
  }

  return pointer1;
};