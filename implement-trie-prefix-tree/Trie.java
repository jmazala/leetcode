import java.util.HashMap;

class Trie {
  TrieNode root;

  /** Initialize your data structure here. */
  public Trie() {
    root = new TrieNode(new HashMap<Character, TrieNode>(), false);
  }

  /** Inserts a word into the trie. */
  public void insert(String word) {
    TrieNode temp = root;

    for (char c : word.toCharArray()) {
      if (!temp.children.containsKey(c)) {
        temp.children.put(c, new TrieNode(new HashMap<Character, TrieNode>(), false));
      }

      temp = temp.children.get(c);
    }

    temp.isWord = true;
  }

  /** Returns if the word is in the trie. */
  public boolean search(String word) {
    TrieNode temp = root;
    for (char c : word.toCharArray()) {
      if (!temp.children.containsKey(c)) {
        return false;
      }

      temp = temp.children.get(c);
    }

    return temp.isWord;
  }

  /**
   * Returns if there is any word in the trie that starts with the given prefix.
   */
  public boolean startsWith(String prefix) {
    TrieNode temp = root;
    for (char c : prefix.toCharArray()) {
      if (!temp.children.containsKey(c)) {
        return false;
      }

      temp = temp.children.get(c);
    }

    return true;
  }

  public static void main(String[] args) {
    Trie trie = new Trie();
    trie.insert("apple");
    System.out.println(trie.search("apple")); // returns true
    System.out.println(trie.search("app")); // returns false
    System.out.println(trie.startsWith("app")); // returns true
    trie.insert("app");
    System.out.println(trie.search("app")); // returns true
  }
}

/**
 * Your Trie object will be instantiated and called as such: Trie obj = new
 * Trie(); obj.insert(word); boolean param_2 = obj.search(word); boolean param_3
 * = obj.startsWith(prefix);
 */