import java.util.*;

class Solution {
  List<List<Integer>> answer;
  Map<Integer, List<Integer>> map;
  Set<TreeNode> visited;

  public List<List<Integer>> verticalTraversal(TreeNode root) {
    map = new TreeMap<>();
    visited = new HashSet<>();

    dfs(root, 0);
    answer = new LinkedList<>();

    // TREEMAP AUTOMATICALLY SORTS BY KEYS TO ITERATE THROUGH
    for (Map.Entry<Integer, List<Integer>> entry : map.entrySet()) {
      answer.add(entry.getValue());
    }

    return answer;
  }

  public void dfs(TreeNode node, int horizontalLevel) {
    if (node == null) {
      return;
    }

    if (!visited.contains(node)) {
      visited.add(node);
      if (!map.containsKey(horizontalLevel)) {
        map.put(horizontalLevel, new ArrayList<>());
      }

      map.get(horizontalLevel).add(node.val);
    }

    dfs(node.left, horizontalLevel - 1);
    dfs(node.right, horizontalLevel + 1);
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    TreeNode root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);
    System.out.println(s.verticalTraversal(root)); // [ [ 9 ], [ 3, 15 ], [ 20 ], [ 7 ] ]

    TreeNode root2 = new TreeNode(1);
    root2.left = new TreeNode(2);
    root2.left.left = new TreeNode(4);
    root2.left.right = new TreeNode(5);
    root2.right = new TreeNode(3);
    root2.right.left = new TreeNode(6);
    root2.right.left.right = new TreeNode(8);
    root2.right.right = new TreeNode(7);
    root2.right.right.right = new TreeNode(9);
    System.out.println(s.verticalTraversal(root2)); // [ [ 4 ], [ 2 ], [ 1, 5, 6 ], [ 3, 8 ], [ 7 ], [ 9 ] ]
  }
}