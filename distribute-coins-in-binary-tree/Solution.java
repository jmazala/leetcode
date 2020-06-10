/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left
 * = left; this.right = right; } }
 */
class Solution {
  int transfers;

  public int distributeCoins(TreeNode root) {
    transfers = 0;
    dfs(root);
    return transfers;
  }

  private int dfs(TreeNode node) {
    // base case. no node = no transfers
    if (node == null) {
      return 0;
    }

    int left = dfs(node.left);
    int right = dfs(node.right);
    transfers += Math.abs(dfs(node.left)) + Math.abs(dfs(node.right));

    // we include left and right here because
    // we may need to continue passing coins up
    return node.val + left + right - 1;
  }
}