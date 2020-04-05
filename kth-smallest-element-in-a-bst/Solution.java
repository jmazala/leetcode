import java.util.ArrayList;
import java.util.List;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  List<Integer> values;
  int k;
  //DFS INORDER
  public int kthSmallest(TreeNode root, int k) {
    values = new ArrayList<>();
    this.k = k;
    visit(root);
    return values.get(k-1);
  }

    //recursively go down the tree
    //left, node, right
  public void visit(TreeNode node) {
    if (node == null || values.size() >= k) {
      return;
    }
    
    if (node.left != null && values.size() < k) {
      visit(node.left);
    }

    values.add(node.val);

    if (node.right != null && values.size() < k) {
      visit(node.right);
    }
  }


  //BFS + HEAP
  // public int kthSmallest(TreeNode root, int k) {
  //   if (root == null) {
  //     return -1;
  //   }
    
  //   PriorityQueue<TreeNode> minHeap = new PriorityQueue<>((a, b) -> {
  //     return a.val - b.val;
  //   });

  //   Queue<TreeNode> queue = new LinkedList<>();
  //   queue.add(root);

  //   while (!queue.isEmpty()) {
  //     TreeNode node = queue.remove();
  //     minHeap.add(node);

  //     if (node.left != null) {
  //       queue.add(node.left);
  //     }

  //     if (node.right != null) {
  //       queue.add(node.right);
  //     }
  //   }

  //   int answer = 0;
  //   for (int i = 0; i < k; i++) {
  //     answer = minHeap.remove().val;
  //   }

  //   return answer;
  // }
}