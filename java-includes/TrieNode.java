import java.util.Map;

public class TrieNode {
  Map<Character, TrieNode> children;
  boolean isWord;

  public TrieNode(Map<Character, TrieNode> children, boolean isWord) {
    this.children = children;
    this.isWord = isWord;
  }

  public boolean containsWord(String word) {
    TrieNode temp = this;

    for (char c : word.toCharArray()) {
      temp = temp.children.getOrDefault(c, null);
      if (temp == null) {
        return false;
      }
    }

    return temp.isWord;
  }
}