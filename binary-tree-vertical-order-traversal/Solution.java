import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.TreeMap;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode() {} TreeNode(int val) { this.val = val; }
 * TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left
 * = left; this.right = right; } }
 */
class Solution {
  class QueueItem {
    TreeNode node;
    int column;

    public QueueItem(TreeNode node, int column) {
      this.node = node;
      this.column = column;
    }
  }

  public List<List<Integer>> verticalOrder(TreeNode root) {
    List<List<Integer>> answer = new ArrayList<>();
    if (root == null) {
      return answer;
    }

    if (root.left == null && root.right == null) {
      answer.add(new ArrayList<>());
      answer.get(0).add(root.val);
      return answer;
    }

    Map<Integer, List<Integer>> hash = new TreeMap<>();

    Queue<QueueItem> queue = new LinkedList<>();
    queue.add(new QueueItem(root, 0));

    while (!queue.isEmpty()) {
      QueueItem item = queue.remove();
      TreeNode current = item.node;
      int column = item.column;

      if (!hash.containsKey(column)) {
        hash.put(column, new ArrayList<>());
      }

      hash.get(column).add(current.val);

      if (current.left != null) {
        queue.add(new QueueItem(current.left, column - 1));
      }

      if (current.right != null) {
        queue.add(new QueueItem(current.right, column + 1));
      }
    }

    answer.addAll(hash.values());
    return answer;
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    Solution s = new Solution();

    // [ [ 9 ], [ 3, 15 ], [ 20 ], [ 7 ] ]
    System.out.println(s.verticalOrder(root));

    TreeNode root2 = new TreeNode(1);
    root2.left = new TreeNode(2);
    root2.left.left = new TreeNode(4);
    root2.left.right = new TreeNode(5);
    root2.right = new TreeNode(3);
    root2.right.left = new TreeNode(6);
    root2.right.left.right = new TreeNode(8);
    root2.right.right = new TreeNode(7);
    root2.right.right.right = new TreeNode(9);

    // [ [ 4 ], [ 2 ], [ 1, 5, 6 ], [ 3, 8 ], [ 7 ], [ 9 ] ]
    System.out.println(s.verticalOrder(root2));
  }
}