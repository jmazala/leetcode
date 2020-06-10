/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode() {} ListNode(int val) { this.val = val; } ListNode(int val,
 * ListNode next) { this.val = val; this.next = next; } }
 */
class Solution {
  public void reorderList(ListNode head) {
    if (head.next == null) {
      return;
    }

    Stack<ListNode> stack = new Stack<>();
    Queue<ListNode> queue = new LinkedList<>();

    ListNode temp = head;
    int count = 0;
    while (temp != null) {
      stack.push(temp);
      queue.add(temp);
      count++;
      temp = temp.next;
    }

    // alternate between removing from the queue popping from the stack
    // since we're getting 2 nodes at a time
    if (count % 2 == 1) {
      count++;
    }

    ListNode previousRight = null;
    for (int i = 0; i < count / 2; i++) {
      ListNode left = queue.remove();
      ListNode right = stack.pop();
      left.next = right;
      right.next = null;

      if (previousRight != null) {
        previousRight.next = left;
      }

      previousRight = right;
    }

    return;
  }
}