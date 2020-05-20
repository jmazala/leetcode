/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode() {} ListNode(int val) { this.val = val; } ListNode(int val,
 * ListNode next) { this.val = val; this.next = next; } }
 */
class Solution {
  // MERGE SORT
  public ListNode sortList(ListNode head) {
    if (head == null || head.next == null) {
      return head;
    }

    // divide list into 2 halves
    ListNode middle = getMiddle(head);
    ListNode nextToMiddle = middle.next;
    middle.next = null;

    // sort them
    ListNode left = sortList(head);
    ListNode right = sortList(nextToMiddle);

    // merge them
    return sortedMerge(left, right);
  }

  private ListNode getMiddle(ListNode head) {
    ListNode fast = head;
    ListNode slow = head;

    while (fast.next != null && fast.next.next != null) {
      slow = slow.next;
      fast = fast.next.next;
    }

    return slow;
  }

  private ListNode sortedMerge(ListNode a, ListNode b) {
    if (a == null) {
      return b;
    }

    if (b == null) {
      return a;
    }

    ListNode result = null;

    if (a.val <= b.val) {
      result = a;
      result.next = sortedMerge(a.next, b);
    } else {
      result = b;
      result.next = sortedMerge(a, b.next);
    }

    return result;
  }
}