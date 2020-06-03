/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  let carry = 0;
  const head = new ListNode();
  let temp = head;

  while (l1 || l2 || carry) {
    temp.val = carry;
    carry = 0;

    if (l1) {
      temp.val += l1.val;
      l1 = l1.next;
    }

    if (l2) {
      temp.val += l2.val;
      l2 = l2.next;
    }

    if (temp.val >= 10) {
      carry = 1;
      temp.val -= 10;
    }

    if (l1 || l2 || carry) {
      temp.next = new ListNode();
      temp = temp.next;
    }
  }

  return head;
};