import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

class Solution {
  private static final int[][] DIRECTIONS = { { -1, 0 }, { 1, 0 }, { 0, -1 }, { 0, 1 } };
  static final char PLACEHOLDER = '!';

  public List<String> findWords(char[][] board, String[] words) {
    List<String> answer = new LinkedList<>();
    if (board == null || board.length == 0 || words == null || words.length == 0) {
      return answer;
    }

    // build a trie out of the words array to help us navigate the word search
    TrieNode trie = buildTree(words);
    int longestWordLength = 0;
    for (String word : words) {
      longestWordLength = Math.max(longestWordLength, word.length());
    }

    Set<String> found = new HashSet<>();

    // for every char in the board, see if we can start a word from there
    for (int i = 0; i < board.length; i++) {
      for (int j = 0; j < board[0].length; j++) {
        char c = board[i][j];
        if (trie.children.containsKey(c)) {
          // if we can start a word from there, dfs the array with the help of the trie
          dfs(board, longestWordLength, c, i, j, new StringBuilder(), trie.children.get(c), found);
        }
      }
    }

    answer.addAll(found);
    return answer;
  }

  public void dfs(char[][] board, int longestWordLength, char current, int i, int j, StringBuilder builder,
      TrieNode node, Set<String> found) {
    builder.append(current);
    board[i][j] = PLACEHOLDER; // temp placeholder so we don't visit the same node twice

    if (node.isWord) {
      found.add(builder.toString());
      // don't return here as a word could be a prefix of another word
    }

    if (builder.length() < longestWordLength) {
      for (int[] direction : DIRECTIONS) {
        int nextI = i + direction[0];
        int nextJ = j + direction[1];

        if (nextI < 0 || nextI >= board.length || nextJ < 0 || nextJ >= board[0].length) {
          continue;
        }

        char nextChar = board[nextI][nextJ];
        TrieNode nextNode = node.children.get(nextChar);
        if (nextNode != null) {
          dfs(board, longestWordLength, nextChar, nextI, nextJ, builder, nextNode, found);
        }
      }
    }

    builder.deleteCharAt(builder.length() - 1);
    board[i][j] = current; // put the placeholder back for future DFS
  }

  public TrieNode buildTree(String[] words) {
    TrieNode trie = new TrieNode();

    for (String word : words) {
      trie.addWord(word);
    }

    return trie;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    char[][] board = { { 'o', 'a', 'a', 'n' }, { 'e', 't', 'a', 'e' }, { 'i', 'h', 'k', 'r' }, { 'i', 'f', 'l', 'v' } };
    String[] words = { "oath", "pea", "eat", "rain" };
    System.out.println(s.findWords(board, words)); // [oath, eat]

    char[][] board2 = { { 'a', 'b' }, { 'c', 'd' } };
    String[] words2 = { "ab", "cb", "ad", "bd", "ac", "ca", "da", "bc", "db", "adcb", "dabc", "abb", "acb" };
    System.out.println(s.findWords(board2, words2)); // [ab, ac, bd, ca, db]
  }
}