import java.util.HashSet;

class Solution {
  public int numJewelsInStones(String J, String S) {
    HashSet<Character> hash = new HashSet<>();
    for (Character c : J.toCharArray()) {
      hash.add(c);
    }

    int count = 0;
    for (Character c : S.toCharArray()) {
      if (hash.contains(c)) {
        count++;
      }
    }

    return count;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    String J = "aA";
    String S = "aAAbbbb";
    System.out.println(s.numJewelsInStones(J, S));
  }
}