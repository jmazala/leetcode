/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode() {} ListNode(int val) { this.val = val; } ListNode(int val,
 * ListNode next) { this.val = val; this.next = next; } }
 */
class Solution {

  //MERGESORT ALGORITHM
  public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
    if (l1 == null && l2 == null) {
      return null;
    }

    if (l1 == null) {
      return l2;
    }

    if (l2 == null) {
      return l1;
    }

    ListNode result = null;

    if (l1.val <= l2.val) {
      result = l1;
      result.next = mergeTwoLists(l1.next, l2);
    } else {
      result = l2;
      result.next = mergeTwoLists(l1, l2.next);
    }

    return result;
  }

  //JUST SOMETHING I WROTE
  // public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
  // if (l1 == null && l2 == null) {
  // return null;
  // }

  // ListNode head = new ListNode();
  // ListNode temp = head;

  // while (l1 != null || l2 != null) {
  // if (l1 == null) {
  // temp.val = l2.val;
  // l2 = l2.next;
  // } else if (l2 == null) {
  // temp.val = l1.val;
  // l1 = l1.next;
  // } else if (l1.val <= l2.val) {
  // temp.val = l1.val;
  // l1 = l1.next;
  // } else {
  // temp.val = l2.val;
  // l2 = l2.next;
  // }

  // if (l1 != null || l2 != null) {
  // temp.next = new ListNode();
  // temp = temp.next;
  // }
  // }

  // return head;
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