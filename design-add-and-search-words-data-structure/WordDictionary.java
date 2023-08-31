import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;

class WordDictionary {
  static class TrieNode {
    Map<Character, TrieNode> children;
    boolean isWord;

    public TrieNode() {
      this.children = new HashMap<>();
      this.isWord = false;
    }

    public TrieNode(Map<Character, TrieNode> children, boolean isWord) {
      this.children = children;
      this.isWord = isWord;
    }

    public void addWord(String word) {
      TrieNode temp = this;

      for (char c : word.toCharArray()) {
        if (!temp.children.containsKey(c)) {
          temp.children.put(c, new TrieNode());
        }

        temp = temp.children.get(c);
      }

      temp.isWord = true;
    }

    public boolean containsWord(String word) {
      TrieNode temp = this;

      for (char c : word.toCharArray()) {
        temp = temp.children.get(c);
        if (temp == null) {
          return false;
        }
      }

      return temp.isWord;
    }
  }

  TrieNode trie;

  /** Initialize your data structure here. */
  public WordDictionary() {
    this.trie = new TrieNode();
  }

  /** Adds a word into the data structure. */
  public void addWord(String word) {
    this.trie.addWord(word);
  }

  /**
   * Returns if the word is in the data structure. A word could contain the dot
   * character '.' to represent any one letter.
   */
  public boolean search(String word) {
    Queue<TrieNode> searchNodes = new LinkedList<>();
    TrieNode searchNode = this.trie;
    searchNodes.add(searchNode);

    for (char c : word.toCharArray()) {
      int numNodes = searchNodes.size();
      if (numNodes == 0) {
        return false;
      }

      for (int i = 0; i < numNodes; i++) {
        TrieNode current = searchNodes.remove();
        if (c == '.') {
          searchNodes.addAll(current.children.values());
        } else {
          if (current.children.containsKey(c)) {
            searchNodes.add(current.children.get(c));
          }
        }
      }
    }

    for (TrieNode finalNode : searchNodes) {
      if (finalNode.isWord) {
        return true;
      }
    }

    return false;
  }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary obj = new WordDictionary(); obj.addWord(word); boolean param_2
 * = obj.search(word);
 */