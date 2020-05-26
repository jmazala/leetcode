import java.util.*;

class Solution {
  // USING DP TOP DOWN
  public int maxUncrossedLines(int[] A, int[] B) {
    // use DP for this problem
    // 2 pointers a and b
    int[][] dp = new int[A.length + 1][B.length + 1];
    for (int a = 1; a <= A.length; a++) {
      int curA = A[a - 1];
      for (int b = 1; b <= B.length; b++) {
        int curB = B[b - 1];

        // if A[a] == B[b], add 1 and increment both pointers
        if (curA == curB) {
          dp[a][b] = dp[a - 1][b - 1] + 1;
        } else {
          // otherwise try decrementing a by 1 and also b by 1
          dp[a][b] = Math.max(dp[a][b - 1], dp[a - 1][b]);
        }
      }
    }

    return dp[A.length][B.length];
  }

  // USING DP BOTTOM UP
  // public int maxUncrossedLines(int[] A, int[] B) {
  //   int[][] dp = new int[A.length + 1][B.length + 1];

  //   for (int a = A.length - 1; a >= 0; a--) {
  //     for (int b = B.length - 1; b >= 0; b--) {
  //       if (A[a] == B[b]) {
  //         dp[a][b] = dp[a + 1][b + 1] + 1;
  //       } else {
  //         dp[a][b] = Math.max(dp[a + 1][b], dp[a][b + 1]);
  //       }
  //     }
  //   }

  //   return dp[0][0];
  // }

  // USING RECURSION + MEMOIZATION
  // public int maxUncrossedLines(int[] A, int[] B) {
  // int[][] memo = new int[A.length][B.length];
  // for (int[] row : memo) {
  // Arrays.fill(row, -1);
  // }

  // return helper(A, B, 0, 0, memo);
  // }

  // private int helper(int[] A, int[] B, int a, int b, int[][] memo) {
  // if (a == A.length || b == B.length) {
  // return 0;
  // }

  // if (memo[a][b] > -1) {
  // return memo[a][b];
  // }

  // if (A[a] == B[b]) {
  // memo[a][b] = 1 + helper(A, B, a + 1, b + 1, memo);

  // } else {
  // memo[a][b] = Math.max(helper(A, B, a + 1, b, memo), helper(A, B, a, b + 1,
  // memo));
  // }

  // return memo[a][b];
  // }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[] A = { 1, 4, 2 };
    int[] B = { 1, 2, 4 };
    System.out.println(s.maxUncrossedLines(A, B)); // 2

    // this case has multiple sets of twos. lines could be drawn in multiple ways
    // need to store multiple tuples
    // then recursively try taking either of them
    A = new int[] { 2, 5, 1, 2, 5 };
    B = new int[] { 10, 5, 2, 1, 5, 2 };

    System.out.println(s.maxUncrossedLines(A, B)); // 3
  }
}