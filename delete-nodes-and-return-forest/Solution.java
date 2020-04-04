import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  List<TreeNode> answer;
  Set<Integer> delete;
  int[] to_delete;

  public List<TreeNode> delNodes(TreeNode root, int[] to_delete) {
    answer = new ArrayList<>();
    delete = new HashSet<>();
    for (int i : to_delete) {
      delete.add(i);
    }

    helper(root);
    if (!delete.contains(root.val)) {
      answer.add(root);
    }

    return answer;
  }

  public TreeNode helper(TreeNode node) {
    if (node == null) {
      return null;
    }

    node.left = helper(node.left);
    node.right = helper(node.right);

    // long java way of saying supposed to delete this. lol
    if (delete.contains(node.val)) {
      if (node.left != null) {
        answer.add(node.left);
      }

      if (node.right != null) {
        answer.add(node.right);
      }

      return null;
    }

    return node;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(7);
    Solution s = new Solution();
    int[] to_delete = { 3, 5 };
    System.out.println(s.delNodes(root, to_delete));
  }
}