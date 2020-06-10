import java.util.*;

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
    Solution s = new Solution();
    Node root = s.new Node(2);
    root.left = s.new Node(1);
    root.right = s.new Node(3);

    System.out.println(s.treeToDoublyList(root)); // 1 -> 2 -> 3

    Solution s2 = new Solution();
    Node root2 = s2.new Node(1);
    System.out.println(s2.treeToDoublyList(root2)); // 1

    Solution s3 = new Solution();

    Node root3 = s3.new Node(4);
    root3.right = s3.new Node(5);
    root3.left = s3.new Node(2);
    root3.left.left = s3.new Node(1);
    root3.left.right = s3.new Node(3);
    System.out.println(s3.treeToDoublyList(root3)); // 1 -> 2 -> 3 -> 4 -> 5
  }

  // Definition for a Node.
  private class Node {
    public int val;
    public Node left;
    public Node right;

    public Node(int val) {
      this.val = val;
    }

    public String toString() {
      Set<Node> seen = new HashSet<>();
      seen.add(this);

      if (this.right != null && !seen.contains(this.right)) {
        return this.val + " -> " + this.right.toString(seen);
      }

      return String.valueOf(this.val);
    }

    public String toString(Set<Node> seen) {
      seen.add(this);

      if (this.right != null && !seen.contains(this.right)) {
        return this.val + " -> " + this.right.toString(seen);
      }

      return String.valueOf(this.val);
    }
  }
}