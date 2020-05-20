import java.util.ArrayList;
import java.util.List;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  
  // DFS INORDER O(k) time, O(k) space
  public int kthSmallest(TreeNode root, int k) {
    List<Integer> values = new ArrayList<>(k);
    visit(root, k, values);
    return values.get(k - 1);
  }

  // recursively go down the tree
  // left, node, right
  public void visit(TreeNode node, int k, List<Integer> values) {
    if (node == null || values.size() == k) {
      return;
    }

    visit(node.left, k, values);
    values.add(node.val);
    if (values.size() == k) {
      return;
    }

    visit(node.right, k, values);
  }

  // BFS + HEAP O(n) time and O(n) space
  // public int kthSmallest(TreeNode root, int k) {
  // if (root == null) {
  // return -1;
  // }

  // PriorityQueue<TreeNode> minHeap = new PriorityQueue<>((a, b) -> {
  // return a.val - b.val;
  // });

  // Queue<TreeNode> queue = new LinkedList<>();
  // queue.add(root);

  // while (!queue.isEmpty()) {
  // TreeNode node = queue.remove();
  // minHeap.add(node);

  // if (node.left != null) {
  // queue.add(node.left);
  // }

  // if (node.right != null) {
  // queue.add(node.right);
  // }
  // }

  // int answer = 0;
  // for (int i = 0; i < k; i++) {
  // answer = minHeap.remove().val;
  // }

  // return answer;
  // }
}