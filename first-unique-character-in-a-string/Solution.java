import java.util.Map;

class Solution {
  public int firstUniqChar(String s) {
    // return the index of the first unique character
    Map<Character, Integer> hash = new HashMap<>();
    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      hash.put(c, hash.getOrDefault(c, 0) + 1);
    }

    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      if (hash.get(c) == 1) {
        return i;
      }
    }

    return -1;
  }
}