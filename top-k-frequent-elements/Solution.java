import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.PriorityQueue;

class Solution {
  public List<Integer> topKFrequent(int[] nums, int k) {
    List<Integer> answer = new LinkedList<>();
    if (nums == null || nums.length == 0 || k == 0) {
      return answer;
    }

    // put them all into a cash with counts
    Map<Integer, Integer> hash = new HashMap<>();
    for (int num : nums) {
      hash.put(num, hash.getOrDefault(num, 0) + 1);
    }

    // put them all into a heap sorted by hash count
    PriorityQueue<Integer> minHeap = new PriorityQueue<>((a, b) -> {
      return hash.get(a) - hash.get(b);
    });

    for (int num : hash.keySet()) {
      minHeap.add(num);
      if (minHeap.size() > k) {
        minHeap.remove();
      }
    }

    for (int i = 0; i < k; i++) {
      answer.add(minHeap.remove());
    }

    return answer;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.topKFrequent(new int[] { 1, 1, 1, 2, 2, 3 }, 2));
  }
}