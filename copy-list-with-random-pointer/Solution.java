import java.util.*;

// Definition for a Node.
class Node {
  int val;
  Node next;
  Node random;

  public Node(int val) {
    this.val = val;
    this.next = null;
    this.random = null;
  }
}

class Solution {
  public Node copyRandomList(Node head) {
    Map<Node, Node> clones = new HashMap<>();
    clones.put(null, null);

    Node temp = head;

    while (temp != null) {
      if (!clones.containsKey(temp)) {
        clones.put(temp, new Node(temp.val));
      }

      // NEXT POINTER
      if (!clones.containsKey(temp.next)) {
        clones.put(temp.next, new Node(temp.next.val));
      }

      clones.get(temp).next = clones.get(temp.next);

      // RANDOM POINTER
      if (!clones.containsKey(temp.random)) {
        clones.put(temp.random, new Node(temp.random.val));
      }
      clones.get(temp).random = clones.get(temp.random);
      temp = temp.next;
    }

    return clones.get(head);
  }
}