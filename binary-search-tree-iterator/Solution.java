import java.util.Stack;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left
 * = left; this.right = right; } }
 */
class BSTIterator {
  Stack<TreeNode> stack;

  public BSTIterator(TreeNode root) {
    this.stack = new Stack<>();
    this.populateStack(root);
  }

  private void populateStack(TreeNode root) {
    while (root != null) {
      stack.push(root);
      root = root.left;
    }
  }

  /** @return the next smallest number */
  public int next() {
    TreeNode node = stack.pop();

    if (node.right != null) {
      populateStack(node.right);
    }

    return node.val;
  }

  /** @return whether we have a next smallest number */
  public boolean hasNext() {
    return !this.stack.isEmpty();
  }
}

/**
 * Your BSTIterator object will be instantiated and called as such: BSTIterator
 * obj = new BSTIterator(root); int param_1 = obj.next(); boolean param_2 =
 * obj.hasNext();
 */