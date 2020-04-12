/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  public int diameterOfBinaryTree(TreeNode root) {
    if (root == null) {
      return 0;
    }

    int leftHeight = height(root.left);
    int rightHeight = height(root.right);
    int leftDiameter = diameterOfBinaryTree(root.left);
    int rightDiameter = diameterOfBinaryTree(root.right);

    return Math.max(leftHeight + rightHeight, Math.max(leftDiameter, rightDiameter));
  }

  public int height(TreeNode root) {
    if (root == null) {
      return 0;
    }

    return 1 + Math.max(height(root.left), height(root.right));
  }
}