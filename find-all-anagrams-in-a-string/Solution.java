import java.util.ArrayList;
import java.util.List;

class Solution {
  public List<Integer> findAnagrams(String s, String p) {
    List<Integer> answer = new ArrayList<>();

    if (s.length() == 0 || p.length() == 0 || s.length() < p.length()) {
      return answer;
    }

    int[] counts = new int[26];

    for (char c : p.toCharArray()) {
      counts[c - 'a']++;
    }

    int left = 0;
    int right = 0;
    int charsUsed = 0;

    // start sliding window
    while (right < s.length()) {
      char chRight = s.charAt(right);
      if (counts[chRight - 'a'] > 0) {
        charsUsed++;
      }

      counts[chRight - 'a']--;
      right++;

      if (charsUsed == p.length()) {
        answer.add(left);
      }

      int windowSize = right - left;
      if (windowSize < p.length()) {
        continue;
      }

      char chLeft = s.charAt(left);
      if (counts[chLeft - 'a'] >= 0) {
        charsUsed--;
      }

      counts[chLeft - 'a']++;
      left++;
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.findAnagrams("cbaebabacd", "abc")); // [0, 6]
  }
}