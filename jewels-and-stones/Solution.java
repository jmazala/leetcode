import java.util.*;

class Solution {
  public int numJewelsInStones(String j, String s) {
    if (s.length() == 0 || j.length() == 0) {
      return 0;
    }

    Set<Character> set = new HashSet<>();
    for (char jewel : j.toCharArray()) {
      set.add(jewel);
    }

    int answer = 0;
    for (char stone : s.toCharArray()) {
      if (set.contains(stone)) {
        answer++;
      }
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.numJewelsInStones("aA", "aAAbbbb")); // 3
  }
}