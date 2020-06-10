import java.util.*;

// Definition for a Node.
class Node {
  public int val;
  public Node left;
  public Node right;

  public Node() {
  }

  public Node(int _val) {
    val = _val;
  }

  public Node(int _val, Node _left, Node _right) {
    val = _val;
    left = _left;
    right = _right;
  }

  public String toString() {
    Set<Node> seen = new HashSet<>();
    seen.add(this);

    if (this.right != null && !seen.contains(this.right)) {
      return this.val + " -> " + this.right.toString(seen);
    } else {
      return String.valueOf(this.val);
    }
  }

  public String toString(Set<Node> seen) {
    if (seen.contains(this)) {
      return "";
    }

    seen.add(this);

    if (this.right != null && !seen.contains(this.right)) {
      return this.val + " -> " + this.right.toString(seen);
    } else {
      return String.valueOf(this.val);
    }
  }
};

class Solution {
  Node min = null;
  Node max = null;

  public Node treeToDoublyList(Node root) {
    if (root == null) {
      return null;
    }

    helper(root);
    min.left = max;
    max.right = min;
    return min;
  }

  private void helper(Node node) {
    if (node == null) {
      return;
    }

    helper(node.left);

    if (max == null) {
      min = node;
    } else {
      node.left = max;
      max.right = node;
    }

    max = node;

    helper(node.right);
  }

  public static void main(String[] args) {
    Node root = new Node(2);
    root.left = new Node(1);
    root.right = new Node(3);
    Solution s = new Solution();
    System.out.println(s.treeToDoublyList(root)); // 1 -> 2 -> 3

    Node root2 = new Node(1);
    Solution s2 = new Solution();
    System.out.println(s2.treeToDoublyList(root2)); // 1

    Node root3 = new Node(4);
    root3.right = new Node(5);
    root3.left = new Node(2);
    root3.left.left = new Node(1);
    root3.left.right = new Node(3);

    Solution s3 = new Solution();
    System.out.println(s3.treeToDoublyList(root3)); // 1 -> 2 -> 3 -> 4 -> 5
  }
}