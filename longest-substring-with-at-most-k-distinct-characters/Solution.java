import java.util.*;

class Solution {
  public int lengthOfLongestSubstringKDistinct(String s, int k) {
    if (s.length() == 0 || k == 0) {
      return 0;
    }

    int left = 0;
    int right = 0;
    int answer = 0;

    // only allocate k+1 space
    LinkedHashMap<Character, Integer> hash = new LinkedHashMap<>(k + 1);

    while (right < s.length()) {
      char c = s.charAt(right);

      // LinkedHashMap keeps track of order of keys inserted
      // so we can"t just update the hash. need to delete / re-insert
      if (hash.containsKey(c)) {
        hash.remove(c);
      }

      hash.put(c, right);
      right++;

      if (hash.size() > k) {
        Map.Entry<Character, Integer> firstEntry = hash.entrySet().iterator().next();
        hash.remove(firstEntry.getKey());
        left = firstEntry.getValue() + 1;
      }

      answer = Math.max(answer, right - left);
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();

    System.out.println(s.lengthOfLongestSubstringKDistinct("abcde", 0)); // 0
    System.out.println(s.lengthOfLongestSubstringKDistinct("", 99)); // 0
    System.out.println(s.lengthOfLongestSubstringKDistinct("a", 2)); // 1
    System.out.println(s.lengthOfLongestSubstringKDistinct("abcdea", 1)); // 1
    System.out.println(s.lengthOfLongestSubstringKDistinct("aa", 1)); // 2
    System.out.println(s.lengthOfLongestSubstringKDistinct("aa", 2)); // 2
    System.out.println(s.lengthOfLongestSubstringKDistinct("eceba", 2)); // 3
    System.out.println(s.lengthOfLongestSubstringKDistinct("abaccc", 2)); // 4
  }
}