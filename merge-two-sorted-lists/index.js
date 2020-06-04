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
var mergeTwoLists = function (l1, l2) {
  if (!l1 && !l2) {
    return null;
  }

  let head = new ListNode();
  let temp = head;

  while (l1 || l2) {
    if (!l1) {
      temp.val = l2.val;
      l2 = l2.next;
    } else if (!l2) {
      temp.val = l1.val;
      l1 = l1.next;
    } else if (l1.val <= l2.val) {
      temp.val = l1.val;
      l1 = l1.next;
    } else {
      temp.val = l2.val;
      l2 = l2.next;
    }

    if (l1 || l2) {
      temp.next = new ListNode();
      temp = temp.next;
    }
  }

  return head;

  //     let head;
  //     let answer;

  //     if (!l1 && !l2) {
  //         return null;
  //     }

  //     if (!l1) {
  //         head = new ListNode(l2.val);
  //         l2 = l2.next;
  //     } else if (!l2) {
  //         head = new ListNode(l1.val);
  //         l1 = l1.next;
  //     }else if (l1.val < l2.val) {
  //         head = new ListNode(l1.val);
  //         l1 = l1.next;
  //     } else {
  //         head = new ListNode(l2.val);
  //         l2 = l2.next;
  //     }

  //     answer = head;

  //     while(l1 || l2) {
  //         if (!l1) {
  //             head.next = new ListNode(l2.val);
  //             l2 = l2.next;
  //         } else if (!l2) {
  //             head.next = new ListNode(l1.val);
  //             l1 = l1.next;
  //         } else if (l1.val < l2.val) {
  //             head.next = new ListNode(l1.val);
  //             l1 = l1.next;
  //         } else {
  //             head.next = new ListNode(l2.val);
  //             l2 = l2.next;
  //         }

  //         head = head.next;
  //     }

  //     return answer;

};