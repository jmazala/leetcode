import java.util.Map;

public class TrieNode {
  Map<Character, TrieNode> children;
  boolean isWord;

  public TrieNode(Map<Character, TrieNode> children, boolean isWord) {
    this.children = children;
    this.isWord = isWord;
  }
}