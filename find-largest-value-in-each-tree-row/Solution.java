import java.util.*;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left
 * = left; this.right = right; } }
 */
class Solution {
  // using DFS
  public List<Integer> largestValues(TreeNode root) {
    List<Integer> answer = new ArrayList<>();
    dfs(root, 0, answer);

    return answer;
  }

  private void dfs(TreeNode node, int depth, List<Integer> answer) {
    if (node == null) {
      return;
    }

    if (answer.size() <= depth) {
      answer.add(Integer.MIN_VALUE);
    }

    int largestValue = Math.max(answer.get(depth), node.val);
    answer.set(depth, largestValue);
    dfs(node.left, depth + 1, answer);
    dfs(node.right, depth + 1, answer);
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(3);
    root.right = new TreeNode(2);
    root.right.right = new TreeNode(9);
    root.left.left = new TreeNode(5);
    root.left.right = new TreeNode(3);
    Solution s = new Solution();
    System.out.println(s.largestValues(root)); // [1, 3, 9]
  }
}