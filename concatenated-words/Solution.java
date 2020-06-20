import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {
  public static List<String> findAllConcatenatedWordsInADict(String[] words) {
    // put all words in a tree
    List<String> answer = new ArrayList<>();

    Set<String> set = new HashSet<>();
    Arrays.sort(words, (a, b) -> a.length() - b.length());

    for (String word : words) {
      if (isConcatenatedWord(word, set)) {
        answer.add(word);
      }

      set.add(word);
    }

    return answer;
  }

  private static boolean isConcatenatedWord(String word, Set<String> words) {
    if (words.isEmpty()) {
      return false;
    }

    boolean[] dp = new boolean[word.length() + 1];
    dp[0] = true;
    for (int end = 1; end <= word.length(); end++) {
      for (int start = 0; start < end; start++) {
        if (!dp[start]) {
          continue;
        }

        if (words.contains(word.substring(start, end))) {
          dp[end] = true;
          break;
        }
      }
    }

    return dp[word.length()];
  }

  public static void main(String[] args) {
    // ["catsdogcats","dogcatsdog","ratcatdogcat"]
    System.out.println(Solution.findAllConcatenatedWordsInADict(
        new String[] { "cat", "cats", "catsdogcats", "dog", "dogcatsdog", "hippopotamuses", "rat", "ratcatdogcat" }));
  }
}