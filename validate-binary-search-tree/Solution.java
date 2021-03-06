/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  public boolean isValidBST(TreeNode root) {
    return helper(root, null, null);
  }

  public boolean helper(TreeNode node, Integer lower, Integer upper) {
    if (node == null) {
      return true;
    }

    int val = node.val;

    if ((lower != null && val <= lower) || (upper != null && val >= upper)) {
      return false;
    }

    return helper(node.left, lower, val) && helper(node.right, val, upper);
  }
}