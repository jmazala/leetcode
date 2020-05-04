import java.util.*;

class Solution {
  public boolean canConstruct(String ransomNote, String magazine) {
    if (ransomNote.length() == 0) {
      return true;
    }

    if (ransomNote.length() > magazine.length()) {
      return false;
    }

    Map<Character, Integer> letterCounts = new HashMap<>();
    for (char c : magazine.toCharArray()) {
      letterCounts.put(c, letterCounts.getOrDefault(c, 0) + 1);
    }

    for (char c : ransomNote.toCharArray()) {
      int count = letterCounts.getOrDefault(c, 0);
      if (count < 1) {
        return false;
      }

      letterCounts.put(c, count - 1);
    }

    return true;
  }
}