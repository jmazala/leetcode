import java.util.*;

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
      char cRight = s.charAt(right);
      if (counts[cRight - 'a'] > 0) {
        charsUsed++;
      }

      counts[cRight - 'a']--;
      right++;

      if (charsUsed == p.length()) {
        answer.add(left);
      }

      int windowSize = right - left;
      if (windowSize < p.length()) {
        continue;
      }

      char cLeft = s.charAt(left);
      if (counts[cLeft - 'a'] >= 0) {
        charsUsed--;
      }

      counts[cLeft - 'a']++;
      left++;
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.findAnagrams("cbaebabacd", "abc")); // [0, 6]
  }
}