class Solution {
  int maxSequence;

  public int longestConsecutiveSequence(TreeNode root) {
    if (root == null) {
      return 0;
    }

    maxSequence = 0;
    dfs(root, 0, 0);
    return maxSequence;
  }

  public void dfs(TreeNode node, int steps, int desired) {
    if (node == null) {
      return;
    }

    steps = (node.val == desired) ? steps + 1 : 1;
    maxSequence = Math.max(maxSequence, steps);

    dfs(node.left, steps, node.val + 1);
    dfs(node.right, steps, node.val + 1);
  }

  public static void main(String[] args) {
    TreeNode root = new TreeNode(2);
    root.right = new TreeNode(3);
    root.right.left = new TreeNode(2);
    root.right.left.left = new TreeNode(1);
    Solution s = new Solution();
    System.out.println(s.longestConsecutiveSequence(root));

    TreeNode root2 = new TreeNode(1);
    root2.right = new TreeNode(3);
    root2.right.left = new TreeNode(2);
    root2.right.right = new TreeNode(4);
    root2.right.right.right = new TreeNode(5);
    System.out.println(s.longestConsecutiveSequence(root2));
  }
}