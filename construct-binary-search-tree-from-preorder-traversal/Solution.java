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
    if (preorder.length == 1) {
      return root;
    }

    int rightTreeIndex = 1;

    while (rightTreeIndex < preorder.length && preorder[rightTreeIndex] < root.val) {
      rightTreeIndex++;
    }

    root.left = bstFromPreorder(Arrays.copyOfRange(preorder, 1, rightTreeIndex));
    root.right = bstFromPreorder(Arrays.copyOfRange(preorder, rightTreeIndex, preorder.length));
    return root;
  }
}