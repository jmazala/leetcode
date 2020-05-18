import java.util.*;

class Solution {
  // USING SLIDING WINDOW
  public boolean checkInclusion(String s1, String s2) {
    if (s2.length() < s1.length()) {
      return false;
    }

    if (s1.length() == 0) {
      return true;
    }

    /*
     * char counts hash of size s1.length() s1 char counts is permanent s2 char
     * counts is adjusted at every index
     */
    int[] s1CharCounts = new int[26];
    int[] s2CharCounts = new int[26];
    for (int i = 0; i < s1.length(); i++) {
      s1CharCounts[s1.charAt(i) - 'a']++;
      s2CharCounts[s2.charAt(i) - 'a']++;
    }

    for (int i = 0; i < s2.length() - s1.length(); i++) {
      if (arraysMatch(s1CharCounts, s2CharCounts)) {
        return true;
      }

      /*
       * instead of recreating the s2CharCounts from the substring just adjust by the
       * character lost and gained
       */
      char nextS2CharInWindow = s2.charAt(i + s1.length());
      char droppingFromS2Window = s2.charAt(i);
      s2CharCounts[nextS2CharInWindow - 'a']++;
      s2CharCounts[droppingFromS2Window - 'a']--;
    }

    return arraysMatch(s1CharCounts, s2CharCounts);
  }

  private boolean arraysMatch(int[] s1CharCounts, int[] s2CharCounts) {
    for (int i = 1; i < s1CharCounts.length; i++) {
      if (s1CharCounts[i] != s2CharCounts[i]) {
        return false;
      }
    }

    return true;
  }

  // USING AN ARRAY INSTEAD OF A HASHMAP, NO SLIDING WINDOW (18th %ile speed)
  // public boolean checkInclusion(String s1, String s2) {
  // if (s2.length() < s1.length()) {
  // return false;
  // }

  // if (s1.length() == 0) {
  // return true;
  // }

  // // turn s1 into a char count hash
  // int[] s1CharCounts = new int[26];
  // for (char c : s1.toCharArray()) {
  // s1CharCounts[c - 'a']++;
  // }

  // // loop through each index at s2 and check for a permutation there
  // for (int i = 0; i <= s2.length() - s1.length(); i++) {
  // if (hasPermutation(s1CharCounts.clone(), s2, i, s1.length())) {
  // return true;
  // }
  // }

  // return false;
  // }

  // private boolean hasPermutation(int[] s1CharCounts, String s2, int start, int
  // charsRemaining) {
  // for (int i = start; i < s2.length(); i++) {
  // char c = s2.charAt(i);
  // int numOfThisCharLeft = s1CharCounts[c - 'a'];
  // if (numOfThisCharLeft == 0) {
  // return false;
  // }

  // charsRemaining--;
  // if (charsRemaining == 0) {
  // return true;
  // }

  // s1CharCounts[c - 'a']--;
  // }

  // return false;
  // }

  // USING A HASHMAP, NO SLIDING WINDOW (9th %ile speed)
  // public boolean checkInclusion(String s1, String s2) {
  // if (s2.length() < s1.length()) {
  // return false;
  // }

  // if (s1.length() == 0) {
  // return true;
  // }

  // // turn s1 into a char count hash
  // Map<Character, Integer> s1CharCounts = new HashMap<>();
  // for (char c : s1.toCharArray()) {
  // s1CharCounts.put(c, s1CharCounts.getOrDefault(c, 0) + 1);
  // }

  // // loop through each index at s2 and check for a permutation there
  // for (int i = 0; i < s2.length(); i++) {
  // if (hasPermutation(new HashMap<>(s1CharCounts), s2, i, s1.length())) {
  // return true;
  // }
  // }

  // return false;
  // }

  // private boolean hasPermutation(Map<Character, Integer> s1CharCounts, String
  // s2, int start, int charsRemaining) {
  // if (charsRemaining > s2.length() - start) {
  // return false;
  // }

  // for (int i = start; i < s2.length(); i++) {
  // if (charsRemaining == 0) {
  // return true;
  // }

  // char c = s2.charAt(i);
  // int numOfThisCharLeft = s1CharCounts.getOrDefault(c, 0);
  // if (numOfThisCharLeft > 0) {
  // charsRemaining--;
  // s1CharCounts.put(c, numOfThisCharLeft - 1);
  // } else {
  // return false;
  // }
  // }

  // return charsRemaining == 0;
  // }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.checkInclusion("ab", "eidbaooo")); // true
    System.out.println(s.checkInclusion("ab", "eidboaoo")); // false
    System.out.println(s.checkInclusion("adc", "dcda")); // true
  }
}