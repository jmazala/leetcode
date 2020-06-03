/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode() {} ListNode(int val) { this.val = val; } ListNode(int val,
 * ListNode next) { this.val = val; this.next = next; } }
 */
class Solution {
  public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
    boolean carry = false;
    // for space we could do a linear pass to find the longer one and add in place
    // for time we could just make a new list

    ListNode head = new ListNode(0);
    ListNode temp = head;

    while (l1 != null || l2 != null || carry) {
      int currentSum = carry ? 1 : 0;
      carry = false;

      if (l1 != null) {
        currentSum += l1.val;
        l1 = l1.next;
      }

      if (l2 != null) {
        currentSum += l2.val;
        l2 = l2.next;
      }

      if (currentSum >= 10) {
        carry = true;
        currentSum -= 10;
      }

      temp.val = currentSum;

      if (l1 != null || l2 != null || carry) {
        temp.next = new ListNode(0);
        temp = temp.next;
      }
    }

    return head;
  }

  public static void main(String[] args) {
    ListNode l1 = new ListNode(5);
    ListNode l2 = new ListNode(5);
    Solution s = new Solution();
    System.out.println(s.addTwoNumbers(l1, l2));
  }
}