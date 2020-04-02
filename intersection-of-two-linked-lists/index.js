/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
  return this;
}

/**
* @param {ListNode} headA
* @param {ListNode} headB
* @return {ListNode}
*/
var getIntersectionNode = function (headA, headB) {
  let lengthA = 0;
  let lengthB = 0;
  let nodeNumber = 0;

  let temp = headA;
  while (temp) {
    lengthA++;
    temp.node = nodeNumber++;
    temp = temp.next;
  }

  temp = headB;
  while (temp) {
    if (temp.node === undefined) {
      temp.node = nodeNumber++;
    }
    lengthB++;
    temp = temp.next;
  }

  while (lengthA && lengthB && headA && headB) {
    if (lengthA === lengthB) {
      while (headA && headB && headA.node !== headB.node) {
        headA = headA.next;
        headB = headB.next;
      }

      return headA;
    }

    if (lengthA > lengthB) {
      headA = headA.next;
      lengthA--;
    } else {
      headB = headB.next;
      lengthB--;
    }
  }

  return null;
};
intNode = new ListNode(8);
headA = new ListNode(4);
headA.next = new ListNode(1);
headA.next.next = intNode;
intNode.next = new ListNode(4);
intNode.next.next = new ListNode(5);
headB = new ListNode(5);
headB.next = new ListNode(0);
headB.next.next = new ListNode(1);
headB.next.next.next = intNode;

console.log(getIntersectionNode(headA, headB));