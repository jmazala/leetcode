import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {
  public static int[][] intervalIntersection(int[][] arrA, int[][] arrB) {
    int a = 0;
    int b = 0;

    List<int[]> intervals = new ArrayList<>();

    while (a < arrA.length && b < arrB.length) {
      int minA = arrA[a][0];
      int maxA = arrA[a][1];
      int minB = arrB[b][0];
      int maxB = arrB[b][1];

      if (minB > maxA) { // b is too far
        a++;
        continue;
      }

      if (minA > maxB) { // a is too far
        b++;
        continue;
      }

      // they intersect
      intervals.add(new int[] { Math.max(minA, minB), Math.min(maxA, maxB) });

      if (maxB == maxA) {
        a++;
        b++;
      } else if (maxB > maxA) {
        a++;
      } else {
        b++;
      }
    }

    int[][] answer = new int[intervals.size()][2];

    for (int i = 0; i < intervals.size(); i++) {
      answer[i] = intervals.get(i);
    }

    return answer;
  }

  public static void main(String[] args) {
    int[][] arrA = { { 0, 2 }, { 5, 10 }, { 13, 23 }, { 24, 25 } };
    int[][] arrB = { { 1, 5 }, { 8, 12 }, { 15, 24 }, { 25, 26 } };
    // [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
    System.out.println(Arrays.deepToString(Solution.intervalIntersection(arrA, arrB)));
  }
}