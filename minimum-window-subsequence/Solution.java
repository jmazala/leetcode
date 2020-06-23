
//https://leetcode.com/problems/minimum-window-subsequence/solution/
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
  public String minWindow(String s, String t) {
    int n = s.length();
    int[] last = new int[26];
    int[][] nxt = new int[n][26];
    Arrays.fill(last, -1);

    for (int i = n - 1; i >= 0; --i) {
      last[s.charAt(i) - 'a'] = i;
      for (int k = 0; k < 26; ++k) {
        nxt[i][k] = last[k];
      }
    }

    List<int[]> windows = new ArrayList<>();
    for (int i = 0; i < n; ++i) {
      if (s.charAt(i) == t.charAt(0)) {
        windows.add(new int[] { i, i });
      }
    }
    for (int j = 1; j < t.length(); ++j) {
      int letterIndex = t.charAt(j) - 'a';
      for (int[] window : windows) {
        if (window[1] < n - 1 && nxt[window[1] + 1][letterIndex] >= 0) {
          window[1] = nxt[window[1] + 1][letterIndex];
        } else {
          window[0] = window[1] = -1;
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