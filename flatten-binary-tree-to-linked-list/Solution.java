import java.util.*;

public class Solution {

  // WITH A STACK
  public void flatten(TreeNode root) {
    if (root == null) {
      return;
    }

    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);

    while (!stack.isEmpty()) {
      TreeNode current = stack.pop();

      if (current.right != null) {
        stack.push(current.right);
      }

      if (current.left != null) {
        stack.push(current.left);
      }

      current.left = null;

      if (!stack.isEmpty()) {
        current.right = stack.peek();
      }
    }
  }

  // WITH TAILS
  // private TreeNode flattenTree(TreeNode root) {
  // if (root == null) {
  // return root;
  // }

  // // BASE CASE: LEAF NODE
  // if (root.left == null && root.right == null) {
  // return root;
  // }

  // // flatten the left subtree
  // TreeNode leftTail = flattenTree(root.left);
  // TreeNode rightTail = flattenTree(root.right);

  // if (leftTail != null) {
  // leftTail.right = root.right;
  // root.right = root.left;
  // root.left = null;
  // }

  // // We need to return the "rightmost" node after we are
  // // done wiring the new connections.
  // return rightTail == null ? leftTail : rightTail;
  // }

  // public void flatten(TreeNode root) {
  // this.flattenTree(root);
  // }
}