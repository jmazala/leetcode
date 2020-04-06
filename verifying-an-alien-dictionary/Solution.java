import java.util.HashMap;
import java.util.Map;

class Solution {
  public boolean isAlienSorted(String[] words, String order) {
    Map<Character, Integer> hash = new HashMap<>();
    for (int i = 0; i < order.length(); i++) {
      hash.put(order.charAt(i), i);
    }

    for (int i = 0; i < words.length - 1; i++) {
      String firstWord = words[i];
      String nextWord = words[i + 1];

      for (int j = 0; i < Math.max(firstWord.length(), nextWord.length()); j++) {
        if (j >= nextWord.length()) {
          return false;
        }

        if (firstWord.charAt(j) == nextWord.charAt(j)) {
          continue;
        }

        if (hash.get(firstWord.charAt(j)) < hash.get(nextWord.charAt(j))) {
          break;
        }

        return false;
      }
    }

    return true;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    String[] words1 = { "hello", "leetcode" };
    System.out.println(s.isAlienSorted(words1, "hlabcdefgijkmnopqrstuvwxyz")); // true
    String[] words2 = { "word", "world", "row" };
    System.out.println(s.isAlienSorted(words2, "worldabcefghijkmnpqstuvxyz")); // false
    String[] words3 = { "apple", "app" };
    System.out.println(s.isAlienSorted(words3, "abcdefghijklmnopqrstuvwxyz")); // false
  }
}