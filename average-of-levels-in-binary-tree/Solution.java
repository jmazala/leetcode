import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  public List<Double> averageOfLevels(TreeNode root) {
    List<Double> answer = new LinkedList<>();

    if (root == null) {
      return answer;
    }

    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    while (!queue.isEmpty()) {
      int numNodes = queue.size();
      double originalSize = queue.size();
      double sum = 0;

      while (numNodes > 0) {
        TreeNode node = queue.remove();
        numNodes--;
        sum += node.val;

        if (node.left != null) {
          queue.add(node.left);
        }

        if (node.right != null) {
          queue.add(node.right);
        }
      }

      answer.add(sum / originalSize);
    }

    return answer;
  }
}