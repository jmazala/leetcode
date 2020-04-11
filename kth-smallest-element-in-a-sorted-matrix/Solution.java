import java.util.HashSet;
import java.util.Set;
import java.util.PriorityQueue;

class HeapItem {
  int val;
  int i;
  int j;

  public HeapItem(int val, int i, int j) {
    this.val = val;
    this.i = i;
    this.j = j;
  }
}

class Solution {
  // optimized O(n). don't see every node.
  //this isn't better in every case though.  hash and heap add overhead
  public static int kthSmallest(int[][] matrix, int k) {
    int n = matrix.length;
    int answer = 0;
    PriorityQueue<HeapItem> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);
    Set<Integer> seen = new HashSet<>();
    minHeap.add(new HeapItem(matrix[0][0], 0, 0)); // 1st smallest

    while (k > 0) {
      HeapItem item = minHeap.remove();
      int i = item.i;
      int j = item.j;
      int hashKey = n * i + j;

      if (seen.contains(hashKey)) {
        continue;
      }

      answer = item.val;
      k--;

      seen.add(n * i + j);
      // since they're sorted the next smallest is either right 1 or down 1
      if (i < n - 1) {
        minHeap.add(new HeapItem(matrix[i + 1][j], i + 1, j));
      }

      if (j < n - 1) {
        minHeap.add(new HeapItem(matrix[i][j + 1], i, j + 1));
      }
    }

    return answer;
  }

  // O(n) but sees every node
  // public static int kthSmallest(int[][] matrix, int k) {
  // PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

  // for (int i = 0; i < matrix.length; i++) {
  // for (int j = 0; j < matrix.length; j++) {
  // maxHeap.add(matrix[i][j]);

  // if (maxHeap.size() > k) {
  // maxHeap.remove();
  // }
  // }
  // }

  // return maxHeap.remove();
  // }

  public static void main(String[] args) {
    // System.out.println(Solution.kthSmallest(new int[][] { { 1, 5, 9 }, { 10, 11,
    // 13 }, { 12, 13, 15 } }, 8)); // 13
    System.out.println(Solution.kthSmallest(new int[][] { { 1, 3, 5 }, { 6, 7, 12 }, { 11, 14, 14 } }, 6));
  }
}