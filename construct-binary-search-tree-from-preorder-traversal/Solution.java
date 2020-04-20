import java.util.Arrays;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  public static TreeNode bstFromPreorder(int[] preorder) {
    if (preorder == null || preorder.length == 0) {
      return null;
    }

    TreeNode root = new TreeNode(preorder[0]);

    int rightTreeIndex = 1;

    while (rightTreeIndex < preorder.length && preorder[rightTreeIndex] < root.val) {
      rightTreeIndex++;
    }

    int[] leftSubtree = Arrays.copyOfRange(preorder, 1, rightTreeIndex);
    int[] rightSubtree = Arrays.copyOfRange(preorder, rightTreeIndex, preorder.length);
    root.left = bstFromPreorder(leftSubtree);
    root.right = bstFromPreorder(rightSubtree);

    return root;
  }

  public static void main(String[] args) {
    TreeNode tree = bstFromPreorder(new int[] { 8, 5, 1, 7, 10, 12 });
    System.out.println(tree);
  }
}