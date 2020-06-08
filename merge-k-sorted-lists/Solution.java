import java.util.*;

/**
 * Definition for singly-linked list. public class ListNode { int val; ListNode
 * next; ListNode() {} ListNode(int val) { this.val = val; } ListNode(int val,
 * ListNode next) { this.val = val; this.next = next; } }
 */
class Solution {
  public ListNode mergeKLists(ListNode[] lists) {
    ListNode dummyHead = new ListNode();
    PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);

    for (ListNode node : lists) {
      if (node != null) {
        minHeap.add(node);
      }
    }

    ListNode temp = dummyHead;

    while (!minHeap.isEmpty()) {
      ListNode node = minHeap.remove();
      temp.next = new ListNode(node.val);
      temp = temp.next;
      node = node.next;
      if (node != null) {
        minHeap.add(node);
      }
    }

    return dummyHead.next;
  }
}