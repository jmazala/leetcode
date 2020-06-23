import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//https://leetcode.com/problems/minimum-window-subsequence/solution/
class Solution {
  public String minWindow(String s, String t) {
    // if a minimum window starts at i, S[i] = T[0]
    // next occurrence of T[1] for a larger i in S continues it
    // and so forth and so forth

    // We can precompute this in linear time so each guess is O(T)

    // precompute for each i and letter, next[i][letter] is the index
    // of the first occurrence of letter in S[i:] or -1 otherwise

    // then we'll maintain a set of minimum windows for T[:j] as j increases.
    // take the best window at the end;

    int n = s.length();

    int[] last = new int[26];
    Arrays.fill(last, -1);

    int[][] next = new int[n][26]; // index of next character for each current character

    // start at the end of S
    for (int i = n - 1; i >= 0; i--) {
      char charS = s.charAt(i);
      last[charS - 'a'] = i;

      for (int k = 0; k < 26; k++) {
        next[i][k] = last[k];
      }
    }

    List<int[]> windows = new ArrayList<>();

    for (int i = 0; i < n; i++) {
      char charS = s.charAt(i);
      if (charS == t.charAt(0)) {
        windows.add(new int[] { i, i });
      }
    }

    for (int j = 1; j < t.length(); j++) {
      int letterIndex = t.charAt(j) - 'a';
      for (int[] window : windows) {
        if (window[1] < n - 1 && next[window[1] + 1][letterIndex] >= 0) {
          window[1] = next[window[1] + 1][letterIndex];
        } else {
          window[0] = -1;
          window[1] = -1;
          break;
        }
      }
    }

    int[] ans = { -1, s.length() };
    for (int[] window : windows) {
      if (window[0] == -1) {
        break;
      }

      if (window[1] - window[0] < ans[1] - ans[0]) {
        ans = window;
      }
    }

    return ans[0] >= 0 ? s.substring(ans[0], ans[1] + 1) : "";

  }
}