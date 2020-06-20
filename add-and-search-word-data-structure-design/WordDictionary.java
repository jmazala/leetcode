import java.util.LinkedList;
import java.util.Queue;

class WordDictionary {
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

  public static void main(String[] args) {
    WordDictionary wd = new WordDictionary();
    wd.addWord("bad");
    wd.addWord("dad");
    wd.addWord("mad");
    System.out.println(wd.search(".")); // false
    System.out.println(wd.search("pad.")); // false
    System.out.println(wd.search("pad")); // false
    System.out.println(wd.search("...")); // false
    System.out.println(wd.search("bad")); // true
    System.out.println(wd.search(".ad")); // true
    System.out.println(wd.search("b..")); // true

  }
}

/**
 * Your WordDictionary object will be instantiated and called as such:
 * WordDictionary obj = new WordDictionary(); obj.addWord(word); boolean param_2
 * = obj.search(word);
 */