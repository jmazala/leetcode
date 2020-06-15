import java.util.HashSet;
import java.util.Set;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left
 * = left; this.right = right; } }
 */
class Solution {
  int answer;

  public int minCameraCover(TreeNode root) {
    if (root == null) {
      return 0;
    }

    if (root.left == null && root.right == null) {
      return 1;
    }

    answer = 0;
    Set<TreeNode> covered = new HashSet<>();
    covered.add(null);
    helper(root, null, covered);
    return answer;
  }

  public void helper(TreeNode node, TreeNode parent, Set<TreeNode> covered) {
    if (node == null) {
      return;
    }

    // dfs all the way down the tree
    helper(node.left, node, covered);
    helper(node.right, node, covered);

    // if left has a camera or right has a camera this one doesn't need one. in java
    // we can use a set to track these
    // we're backtracking so we don't check if the parent is covered.
    if ((parent == null && !covered.contains(node)) || !covered.contains(node.left) || !covered.contains(node.right)) {
      covered.add(node);
      covered.add(node.left);
      covered.add(parent);
      covered.add(node.right);
      answer++;
    }
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(4);
    root.left.right.left = new TreeNode(5);
    root.left.right.left.right = new TreeNode(6);

    Solution s = new Solution();

    System.out.println(s.minCameraCover(root));
  }
}