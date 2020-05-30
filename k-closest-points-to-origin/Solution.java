import java.util.*;

class Solution {
  public int[][] kClosest(int[][] points, int K) {
    if (points == null || points.length == 0) {
      return new int[][] {};
    }

    if (points.length == 1) {
      return points;
    }

    // each point [a, b] is sqrt(a^2 + b^2) away from origin
    PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a, b) -> {
      return (int) (Math.pow(b[0], 2) + Math.pow(b[1], 2)) - (int) (Math.pow(a[0], 2) + Math.pow(a[1], 2));
    });

    // put them all in the queue
    for (int[] point : points) {
      maxHeap.add(point);
      if (maxHeap.size() > K) {
        maxHeap.remove();
      }
    }

    // return K elements
    int[][] answer = new int[K][2];
    for (int i = 0; i < K; i++) {
      answer[i] = maxHeap.remove();
    }

    return answer;
  }

  public static void main(String[] args) {
    int[][] points = { { 1, 3 }, { -2, 2 } };
    int K = 1;
    Solution s = new Solution();
    System.out.println(Arrays.deepToString(s.kClosest(points, K)));
  }
}