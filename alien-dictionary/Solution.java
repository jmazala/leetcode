import java.util.*;

class Solution {
  public String alienOrder(String[] words) {
    // Step 0: Create data structures and find all unique letters.
    Map<Character, List<Character>> adjList = new HashMap<>();
    Map<Character, Integer> counts = new HashMap<>();
    for (String word : words) {
      for (char c : word.toCharArray()) {
        adjList.put(c, new ArrayList<>());
        counts.put(c, 0);
      }
    }

    // Step 1: Find all edges.
    for (int i = 0; i < words.length - 1; i++) {
      String word1 = words[i];
      String word2 = words[i + 1];

      // Check that word2 is not a prefix of word1.
      // this means invalid ordering
      if (word1.length() > word2.length() && word1.startsWith(word2)) {
        return "";
      }

      for (int j = 0; j < Math.min(word1.length(), word2.length()); j++) {
        if (word1.charAt(j) != word2.charAt(j)) {
          // word1"s char is lexigraphically before word2"s char
          adjList.get(word1.charAt(j)).add(word2.charAt(j));
          counts.put(word2.charAt(j), counts.get(word2.charAt(j)) + 1);
          break;
        }
      }
    }

    // Step 2: Breadth-first search.
    StringBuilder builder = new StringBuilder();
    Queue<Character> queue = new LinkedList<>();
    for (Map.Entry<Character, Integer> entry : counts.entrySet()) {
      if (entry.getValue() == 0) {
        queue.add(entry.getKey());
      }
    }

    while (!queue.isEmpty()) {
      Character current = queue.remove();
      builder.append(current);

      for (Character neighbor : adjList.get(current)) {
        counts.put(neighbor, counts.get(neighbor) - 1);
        if (counts.get(neighbor) == 0) {
          queue.add(neighbor);
        }
      }
    }

    if (builder.length() < counts.size()) {
      return ""; // we didn't cover all characters
    }

    return builder.toString();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.alienOrder(new String[] { "z", "x", "z" })); // ""
    System.out.println(s.alienOrder(new String[] { "wrt", "wrf", "er", "ett", "rftt" })); // "wertf"
    System.out.println(s.alienOrder(new String[] { "z", "x" })); // "zx"
  }
}