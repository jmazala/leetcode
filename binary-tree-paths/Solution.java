import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  List<String> answer;

  public List<String> binaryTreePaths(TreeNode root) {
    this.answer = new ArrayList<String>();
    helper(root, "");

    return answer;
  }

  public void helper(TreeNode node, String prefix) {
    if (node == null) {
      return;
    }

    prefix += node.val;

    if (node.left == null && node.right == null) {
      answer.add(prefix);
    }

    prefix += "->";

    if (node.left != null) {
      helper(node.left, prefix);
    }

    if (node.right != null) {
      helper(node.right, prefix);
    }
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.right = new TreeNode(5);
    root.right = new TreeNode(3);

    Solution s = new Solution();
    System.out.println(Arrays.toString(s.binaryTreePaths(root).toArray()));
  }
}