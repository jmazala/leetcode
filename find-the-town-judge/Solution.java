import java.util.*;

class Solution {
  // as a graph
  public int findJudge(int N, int[][] trust) {
    int[] count = new int[N + 1];
    for (int[] cur : trust) {
      count[cur[0]]--;
      count[cur[1]]++;
    }

    for (int i = 1; i <= N; i++) {
      if (count[i] == N - 1) {
        return i;
      }
    }

    return -1;
  }

  // with a stack
  // public int findJudge(int N, int[][] trust) {
  // boolean[][] trustFlags = new boolean[N + 1][N + 1];
  // for (int[] cur : trust) {
  // trustFlags[cur[0]][cur[1]] = true;
  // }

  // Stack<Integer> stack = new Stack<>();
  // for (int i = 1; i <= N; i++) {
  // stack.add(i);
  // }

  // while (stack.size() > 1) {
  // int a = stack.pop();
  // int b = stack.pop();

  // boolean aTrustsB = trustFlags[a][b];
  // boolean bTrustsA = trustFlags[b][a];

  // if (aTrustsB && !bTrustsA) { // b is a candidate
  // stack.push(b);
  // } else if (bTrustsA && !aTrustsB) { // a is a candidate
  // stack.push(a);
  // }
  // }

  // if (stack.isEmpty()) {
  // return -1;
  // }

  // // last one on the stack is the candidate
  // int candidate = stack.pop();
  // for (int i = 1; i <= N; i++) {
  // if (i == candidate) {
  // continue;
  // }

  // if (trustFlags[candidate][i] || !trustFlags[i][candidate]) {
  // return -1;
  // }
  // }

  // return candidate;
  // }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.findJudge(3, new int[][] { { 1, 3 }, { 2, 3 }, { 3, 1 } }));
  }
}