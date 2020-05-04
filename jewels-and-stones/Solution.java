import java.util.*;

class Solution {
  public int numJewelsInStones(String J, String S) {
    if (S.length() == 0 || J.length() == 0) {
      return 0;
    }

    Set<Character> set = new HashSet<>();
    for (char jewel : J.toCharArray()) {
      set.add(jewel);
    }

    int answer = 0;
    for (char stone : S.toCharArray()) {
      if (set.contains(stone)) {
        answer++;
      }
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    String J = "aA";
    String S = "aAAbbbb";
    System.out.println(s.numJewelsInStones(J, S)); // 3
  }
}