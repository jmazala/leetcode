import java.util.HashSet;
import java.util.Set;

class Solution {
  public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int i = 0;
    int j = 0;
    int answer = 0;

    while (i < s.length() && j < s.length()) {
      // keep extending sliding window
      if (!set.contains(s.charAt(j))) {
        set.add(s.charAt(j));
        j++;
        answer = Math.max(answer, j - i);
      } else {
        // must have hit where i is
        set.remove(s.charAt(i));
        i++;
      }
    }

    return answer;
  }
}