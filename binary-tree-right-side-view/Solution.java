import java.util.*;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  public List<Integer> rightSideView(TreeNode root) {
    List<Integer> answer = new ArrayList<>();
    if (root == null) {
      return answer;
    }

    // BFS the tree and for each level add the last element to the list
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    while (!queue.isEmpty()) {
      int numNodes = queue.size();

      while (numNodes > 0) {
        TreeNode current = queue.remove();
        numNodes--;

        if (numNodes == 0) {
          answer.add(current.val);
        }

        if (current.left != null) {
          queue.add(current.left);
        }

        if (current.right != null) {
          queue.add(current.right);
        }
      }

    }

    return answer;
  }
}