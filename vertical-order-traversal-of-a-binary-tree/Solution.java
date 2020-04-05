import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * Definition for a binary tree node. public class TreeNode { int val; TreeNode
 * left; TreeNode right; TreeNode(int x) { val = x; } }
 */
class Solution {
  TreeMap<Integer, TreeMap<Integer, ArrayList<Integer>>> seen;

  public List<List<Integer>> verticalTraversal(TreeNode root) {
    seen = new TreeMap<Integer, TreeMap<Integer, ArrayList<Integer>>>();
    dfs(root, 0, 0);

    List<List<Integer>> answer = new ArrayList<>();

    for (Map.Entry<Integer, TreeMap<Integer, ArrayList<Integer>>> currentX : seen.entrySet()) {
      ArrayList<Integer> subAnswer = new ArrayList<>();
      TreeMap<Integer, ArrayList<Integer>> yMap = currentX.getValue();

      for (Map.Entry<Integer, ArrayList<Integer>> currentY : yMap.entrySet()) {
        Collections.sort(currentY.getValue());
        for (Integer node : currentY.getValue()) {
          subAnswer.add(node);
        }
      }

      answer.add(subAnswer);
    }

    return answer;
  }

  public void dfs(TreeNode node, int x, int y) {
    if (node == null) {
      return;
    }
    
    if (!seen.containsKey(x)) {
      seen.put(x, new TreeMap<Integer, ArrayList<Integer>>());
    }

    if (!seen.get(x).containsKey(y)) {
      seen.get(x).put(y, new ArrayList<Integer>());
    }

    seen.get(x).get(y).add(node.val);

    dfs(node.left, x - 1, y + 1);
    dfs(node.right, x + 1, y + 1);
  }
}