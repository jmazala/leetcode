/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  public int rangeSumBST(TreeNode root, int L, int R) {
    if (root == null) {
      return 0;
    }

    int answer = 0;
    if (root.val >= L && root.val <= R) {
      answer += root.val;
    }

    if (L < root.val) {
      answer += rangeSumBST(root.left, L, R);
    }

    if (root.val < R) {
      answer += rangeSumBST(root.right, L, R);
    }

    return answer;
  }
}