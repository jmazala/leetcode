import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  // iterative
  public List<Integer> inorderTraversal(TreeNode root) {
    List<Integer> answer = new ArrayList<>();
    Stack<TreeNode> stack = new Stack<>();

    TreeNode current = root;
    while (current != null || !stack.isEmpty()) {
      while (current != null) {
        stack.push(current);
        current = current.left;
      }

      current = stack.pop();
      answer.add(current.val);
      current = current.right;
    }

    return answer;
  }

  // recursive
  // public List<Integer> inorderTraversal(TreeNode root) {
  //   List<Integer> answer = new ArrayList<>();
  //   if (root == null) {
  //     return answer;
  //   }

  //   answer.addAll(inorderTraversal(root.left));
  //   answer.add(root.val);
  //   answer.addAll(inorderTraversal(root.right));
  //   return answer;
  // }
}