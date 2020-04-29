/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left
 * = left; this.right = right; } }
 */
class Solution {
  int maxPathSum;

  public int maxPathSum(TreeNode root) {
    maxPathSum = Integer.MIN_VALUE;
    helper(root);
    return maxPathSum;
  }

  public int helper(TreeNode node) {
    if (node == null) {
      return 0;
    }

    int left = Math.max(0, helper(node.left));
    int right = Math.max(0, helper(node.right));
    maxPathSum = Math.max(maxPathSum, left + right + node.val);
    return node.val + Math.max(left, right);
  }
}