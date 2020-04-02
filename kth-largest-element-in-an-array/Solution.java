import java.util.PriorityQueue;

class Solution {
  // //using max heap
  // public int findKthLargest(int[] nums, int k) {
  // // sorting is O(n log n). heap is O(n)
  // PriorityQueue<Integer> maxHeap = new PriorityQueue<Integer>((a, b) -> {
  // return b - a;
  // });

  // for (int num : nums) {
  // maxHeap.add(num);
  // }

  // int answer = 0;
  // for (int i = 0; i < k; i++) {
  // answer = maxHeap.remove();
  // }

  // return answer;
  // }

  // using min heap
  public int findKthLargest(int[] nums, int k) {
    // sorting is O(n log n). heap is O(n)
    PriorityQueue<Integer> minHeap = new PriorityQueue<Integer>();

    for (int num : nums) {
      minHeap.add(num);
      if (minHeap.size() > k) {
        minHeap.remove();
      }
    }

    return minHeap.remove();
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[] nums = { 3, 2, 1, 5, 6, 4 };
    System.out.println(s.findKthLargest(nums, 2));
    int[] nums2 = { 3, 2, 3, 1, 2, 4, 5, 5, 6 };
    System.out.println(s.findKthLargest(nums2, 4));
  }
}