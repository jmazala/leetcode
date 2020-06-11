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

      if (firstWord.length() > nextWord.length() && firstWord.startsWith(nextWord)) {
        return false;
      }

      for (int j = 0; j < Math.min(firstWord.length(), nextWord.length()); j++) {
        int firstIndex = hash.get(firstWord.charAt(j));
        int secondIndex = hash.get(nextWord.charAt(j));

        if (firstIndex > secondIndex) {
          return false;
        }

        if (firstIndex < secondIndex) {
          break;
        }
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