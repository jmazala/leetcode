/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode() {} ListNode(int val) { this.val = val; } ListNode(int val,
 * ListNode next) { this.val = val; this.next = next; } }
 */
class Solution {

  //ITERATIVE ALGORITHM
  public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    ListNode dummyHead = new ListNode();
    ListNode tail = dummyHead;

    while (true) {
      if (l1 == null) {
        tail.next = l2;
        break;
      }

      if (l2 == null) {
        tail.next = l1;
        break;
      }

      if (l1.val <= l2.val) {
        tail.next = l1;
        l1 = l1.next;
      } else {
        tail.next = l2;
        l2 = l2.next;
      }
      
      tail = tail.next;
    }

    return dummyHead.next;
  }

  //MERGESORT ALGORITHM
  // public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
  //   if (l1 == null && l2 == null) {
  //     return null;
  //   }

  //   if (l1 == null) {
  //     return l2;
  //   }

  //   if (l2 == null) {
  //     return l1;
  //   }

  //   ListNode result = null;

  //   if (l1.val <= l2.val) {
  //     result = l1;
  //     result.next = mergeTwoLists(l1.next, l2);
  //   } else {
  //     result = l2;
  //     result.next = mergeTwoLists(l1, l2.next);
  //   }

  //   return result;
  // }

  public static void main(String[] args) {
    ListNode l1 = new ListNode(1);
    l1.next = new ListNode(2);
    l1.next.next = new ListNode(3);

    ListNode l2 = new ListNode(1);
    l2.next = new ListNode(3);
    l2.next.next = new ListNode(4);

    System.out.println(Solution.mergeTwoLists(l1, l2));
  }
}