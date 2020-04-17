import java.util.LinkedList;
import java.util.Queue;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  public boolean isSubtree(TreeNode s, TreeNode t) {
    if (s == null || t == null) {
      return false;
    }

    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(s);

    while (!queue.isEmpty()) {
      TreeNode node = queue.remove();
      if (node == null) {
        continue;
      }

      if (node.val == t.val) {
        boolean match = dfsMatch(node, t);
        if (match) {
          return true;
        }
      }

      queue.add(node.left);
      queue.add(node.right);
    }

    return false;
  }

  public boolean dfsMatch(TreeNode root1, TreeNode root2) {
    if (root1 == null && root2 == null) {
      return true;
    }

    if (root1 == null && root2 != null || root1 != null && root2 == null || root1.val != root2.val) {
      return false;
    }

    return dfsMatch(root1.left, root2.left) && dfsMatch(root1.right, root2.right);
  }
}