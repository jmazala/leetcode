import java.util.Map;
import java.util.TreeMap;

class Solution {
  TrieNode root;
  String longestWord;

  public String longestWord(String[] words) {
    longestWord = "";

    if (words == null || words.length == 0) {
      return longestWord;
    }

    // build the tree. use a TreeMap so children char nodes are sorted automatically
    // :)
    root = new TrieNode(new TreeMap<>(), false);
    buildTrie(words);
    // dfs in lexographical order
    dfs(root, "");
    return longestWord;
  }

  private void dfs(TrieNode node, String prefix) {
    if (node.isWord) {
      if (prefix.length() > longestWord.length()) {
        longestWord = prefix;
      }
    }

    for (Map.Entry<Character, TrieNode> entry : node.children.entrySet()) {
      if (entry.getValue().isWord) {
        dfs(entry.getValue(), prefix + entry.getKey());
      }
    }
  }

  private void buildTrie(String[] words) {
    TrieNode current = root;

    for (String word : words) {
      current = root;

      for (Character c : word.toCharArray()) {
        if (!current.children.containsKey(c)) {
          current.children.put(c, new TrieNode(new TreeMap<>(), false));
        }

        current = current.children.get(c);
      }

      current.isWord = true;
    }
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.longestWord(new String[] { "w", "wo", "wor", "worl", "world", "worlm", "worlz" })); // world
    System.out.println(s.longestWord(new String[] { "a", "banana", "app", "appl", "ap", "applk", "apply", "apple" })); // apple
  }
}