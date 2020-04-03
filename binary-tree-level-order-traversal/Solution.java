import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> answer = new ArrayList<>();
    if (root == null) {
      return answer;
    }

    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    while (!queue.isEmpty()) {
      int numNodes = queue.size();
      List<Integer> levelAnswer = new ArrayList<>();
      while (numNodes > 0) {
        TreeNode node = queue.remove();
        numNodes--;
        levelAnswer.add(node.val);

        if (node.left != null) {
          queue.add(node.left);
        }

        if (node.right != null) {
          queue.add(node.right);
        }
      }

      answer.add(levelAnswer);
    }

    return answer;
  }
}