import java.util.ArrayList;
import java.util.List;

class Solution {
  private static final char[][] MAPPING = { { '0', '0' }, { '1', '1' }, { '6', '9' }, { '8', '8' }, { '9', '6' } };

  public List<String> findStrobogrammatic(int n) {
    List<String> answer = new ArrayList<>();
    if (n == 0) {
      return answer;
    }

    // we need to generate permutations of length n
    // use this array to hold them
    char[] chars = new char[n];
    helper(chars, 0, n - 1, answer);
    return answer;
  }

  private static void helper(char[] chars, int low, int high, List<String> answer) {
    if (low > high) {
      // numbers with leading 0's other than "0" are invalid
      if (chars.length == 1 || chars[0] > '0') {
        answer.add(String.valueOf(chars));
      }

      return;
    }

    for (char[] currentMapping : MAPPING) {
      // for odd length strings, the middle element can only be 0, 1, or 8
      // this will happen when low == high
      if (low == high && currentMapping[0] != currentMapping[1]) {
        continue;
      }

      // flip the chars around to create strobogrammaticism
      // like a palindrome except the chars need to be opposite
      chars[low] = currentMapping[0];
      chars[high] = currentMapping[1];
      helper(chars, low + 1, high - 1, answer);
    }
  }
}