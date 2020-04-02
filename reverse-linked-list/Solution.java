import java.util.Stack;

/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode(int x) { val = x; } }
 */
class Solution {
  // ITERATIVELY
  // public ListNode reverseList(ListNode head) {
  // if (head == null || head.next == null) {
  // return null;
  // }

  // ListNode current = head;
  // ListNode previous = null;

  // while (current != null) {
  // ListNode nextTemp = current.next;
  // current.next = previous;
  // previous = current;
  // current = nextTemp;
  // }
  // return previous;
  // }

  // RECURSIVELY
  // public ListNode reverseList(ListNode head) {
  // if (head == null || head.next == null) {
  // return null;
  // }

  // ListNode p = reverseList(head.next);
  // head.next.next = head;
  // head.next = null;
  // return p;
  // }

  // WITH A STACK
  public ListNode reverseList(ListNode head) {
    if (head == null || head.next == null) {
      return head;
    }

    // traverse entire list and put it into the stack.
    // stack now contains the list in reverse.
    // pop everything out put it into a new list
    Stack<ListNode> stack = new Stack<>();

    while (head != null) {
      stack.push(head);
      head = head.next;
    }

    head = stack.pop();
    ListNode temp = head;
    while (!stack.isEmpty()) {
      temp.next = stack.pop();
      temp = temp.next;
    }

    temp.next = null;
    return head;
  }
}