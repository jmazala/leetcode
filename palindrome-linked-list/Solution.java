import java.util.Stack;

/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode(int x) { val = x; } }
 */
class Solution {

  // we could get the length of the list O(n) time O(1) space
  // reverse the 2nd half of the list O(n/2) time O(1) space
  // compare the 2 half lists O(n/2) time O(1) space
  // SPACE: O(1)
  // TIME: O(2n) = O(n)
  public static boolean isPalindrome(ListNode head) {
    if (head == null) {
      return true;
    }

    int length = Solution.getLength(head);
    ListNode lastHalf = head;
    for (int i = 0; i < length / 2; i++) {
      lastHalf = lastHalf.next;
    }

    // // skip middle element for odd length list
    if (length % 2 == 1) {
      lastHalf = lastHalf.next;
    }

    lastHalf = Solution.reverseList(lastHalf);

    while (lastHalf != null) {
      if (lastHalf.val != head.val) {
        return false;
      }

      lastHalf = lastHalf.next;
      head = head.next;
    }

    return true;
  }

  private static ListNode reverseList(ListNode node) {
    ListNode prev = null;
    ListNode curr = node;
    ListNode next = curr;

    while (curr != null) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }

    return prev;
  }

  // we could get the length of the list O(n) time O(1) space
  // push half to a stack, O(n/2) time O(n/2) space
  // and compare with the 2nd half O(n/2) time O(1) space
  // SPACE: O(n/2)
  // TIME: O(n) to get length + O(n) to compare = O(2n) = O(n)
  // public static boolean isPalindrome(ListNode head) {
  // int length = Solution.getLength(head);
  // Stack<Integer> stack = new Stack<>();

  // for (int i = 0; i < length / 2; i++) {
  // stack.push(head.val);
  // head = head.next;
  // }

  // // skip middle element for odd length list
  // if (length % 2 == 1) {
  // head = head.next;
  // }

  // for (int i = 0; i < length / 2; i++) {
  // if (head.val != stack.pop()) {
  // return false;
  // }

  // head = head.next;
  // }

  // return true;
  // }

  private static int getLength(ListNode head) {
    int length = 0;
    while (head != null) {
      length++;
      head = head.next;
    }

    return length;
  }

  public static void main(String[] args) {
    // ZERO (TRUE)
    System.out.println(Solution.isPalindrome(null)); // true

    // 1, 2, 3, 2, 1 / TRUE WITH ODD LENGTH
    ListNode ln0 = new ListNode(1);
    ln0.next = new ListNode(2);
    ln0.next.next = new ListNode(3);
    ln0.next.next.next = new ListNode(2);
    ln0.next.next.next.next = new ListNode(1);
    System.out.println(Solution.isPalindrome(ln0)); // true

    // 1,2,2,1 / TRUE WITH EVEN LENGTH
    ListNode ln3 = new ListNode(1);
    ln3.next = new ListNode(2);
    ln3.next.next = new ListNode(2);
    ln3.next.next.next = new ListNode(1);
    System.out.println(Solution.isPalindrome(ln3)); // true

    // 1, 2 / FALSE WITH EVEN LENGTH
    ListNode ln2 = new ListNode(1);
    ln2.next = new ListNode(2);
    System.out.println(Solution.isPalindrome(ln2)); // false

    // 1,2,2,1,3 / FALSE WITH ODD LENGTH
    ListNode ln4 = new ListNode(1);
    ln4.next = new ListNode(2);
    ln4.next.next = new ListNode(2);
    ln4.next.next.next = new ListNode(1);
    ln4.next.next.next.next = new ListNode(3);
    System.out.println(Solution.isPalindrome(ln4)); // false
  }
}