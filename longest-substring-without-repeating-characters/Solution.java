// https://leetcode.com/problems/longest-substring-without-repeating-characters/

import java.util.HashSet;
import java.util.Set;

class LongestSubstringWithoutRepeatingCharacters {
  public int lengthOfLongestSubstring(String s) {
    if (s.length() < 2) {
      return s.length();
    }

    int answer = 0;
    int i = 0;
    int j = 0;
    Set<Character> set = new HashSet<>();

    while (j < s.length()) {
      char c = s.charAt(j);
      if (!set.contains(c)) {
        set.add(c);
        j++;
        answer = Math.max(answer, j - i);
        continue;
      }

      char toRemove = s.charAt(i);
      set.remove(toRemove);
      i++;
    }

    return answer;
  }
}