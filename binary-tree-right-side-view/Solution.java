import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  public List<Integer> rightSideView(TreeNode root) {
    List<Integer> result = new ArrayList<Integer>();
    if (root == null) {
      return result;
    }

    if (root.left == null && root.right == null) {
      result.add(root.val);
      return result;
    }

    // use BFS to traverse the tree and store the last element at each depth
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);
    while (!queue.isEmpty()) {
      int numNodes = queue.size();
      int last = -1; // dummy val it doesn't matter

      while (numNodes > 0) {
        TreeNode node = queue.remove();
        numNodes--;
        last = node.val;

        if (node.left != null) {
          queue.add(node.left);
        }

        if (node.right != null) {
          queue.add(node.right);
        }
      }

      result.add(last);
    }

    return result;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.left.right = new TreeNode(5);
    root.right = new TreeNode(3);
    root.right.right = new TreeNode(4);

    Solution s = new Solution();
    System.out.println(s.rightSideView(root));
  }
}