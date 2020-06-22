import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.PriorityQueue;

class Solution {
  // DP DOUBLE SLIDING WINDOW (WAY FASTER. EXPLAIN HEAP SOLUTION FIRST)
  public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;

    if (n * k == 0) {
      return new int[0];
    }

    if (k == 1) {
      return nums;
    }
    /*
     * The idea is to split an input array into blocks of k elements. The last block
     * could contain less elements if n % k != 0.
     */

    int[] left = new int[n];
    left[0] = nums[0];

    int[] right = new int[n];
    right[n - 1] = nums[n - 1];

    for (int i = 1; i < n; i++) {
      // build from left to right
      if (i % k == 0) { // this is the start of a block
        left[i] = nums[i];
      } else {
        left[i] = Math.max(nums[i], left[i - 1]);
      }

      // build from right to left
      int j = n - 1 - i;
      if ((j + 1) % k == 0) { // this is the end of a block
        right[j] = nums[j];
      } else {
        right[j] = Math.max(nums[j], right[j + 1]);
      }
    }

    int[] answer = new int[n - k + 1];
    for (int i = 0; i < answer.length; i++) {
      answer[i] = Math.max(left[i + k - 1], right[i]);
    }

    return answer;
  }

  // USING A HEAP
  // class HeapItem {
  // int pos;
  // int value;

  // public HeapItem(int pos, int value) {
  // this.pos = pos;
  // this.value = value;
  // }
  // }

  // public int[] maxSlidingWindow(int[] nums, int k) {
  // int n = nums.length;

  // if (n * k == 0) {
  // return new int[0];
  // }

  // if (k == 1) {
  // return nums;
  // }

  // List<Integer> maxes = new ArrayList<>();
  // // first set up your heap
  // // SPACE: O(n)
  // PriorityQueue<HeapItem> maxHeap = new PriorityQueue<>((a, b) -> b.value -
  // a.value);

  // int left = 0;
  // int right = 0;

  // while (right < nums.length) { // TIME: O(n)
  // maxHeap.add(new HeapItem(right, nums[right])); // TIME: O(log n)
  // right++;

  // // haven't built sliding window yet
  // if (maxHeap.size() < k) {
  // continue;
  // }

  // maxes.add(maxHeap.peek().value); // TIME: O(1)
  // left++;

  // while (maxHeap.peek().pos < left) {
  // maxHeap.remove(); // TIME: O(log n)
  // }
  // }

  // int[] answer = new int[maxes.size()];
  // for (int i = 0; i < maxes.size(); i++) {
  // answer[i] = maxes.get(i);
  // }

  // return answer;
  // }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(Arrays.toString(s.maxSlidingWindow(new int[] {}, 9))); // []
    System.out.println(Arrays.toString(s.maxSlidingWindow(new int[] { 1 }, 0))); // []
    System.out.println(Arrays.toString(s.maxSlidingWindow(new int[] { 1 }, 1))); // [1]
    System.out.println(Arrays.toString(s.maxSlidingWindow(new int[] { 1, 3, -1, -3, 5, 3, 6, 7 }, 3))); // [3,3,5,5,6,7]
    System.out.println(Arrays.toString(s.maxSlidingWindow(new int[] { 9, 10, 9, -7, -4, -8, 2, -6 }, 5))); // [10,10,9,2]
  }
}