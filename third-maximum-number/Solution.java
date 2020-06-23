import java.util.PriorityQueue;
import java.util.TreeSet;

class Solution {
  // we can use a minheap or a treeset for this
  // the key to which data structure to choose is that we don't
  // want to deal with duplicates when finding a kth-maximum
  // that's why a treeset is a little better, but not by much
  // minHeap contains is O(log n) and treeset contains is O(1)

  // USING A MINHEAP + INT (52.58% speed, 45.79% memory)
  // public int thirdMax(int[] nums) {
  // PriorityQueue<Integer> minHeap = new PriorityQueue<>();
  // int max = Integer.MIN_VALUE;

  // for (int num : nums) {
  // max = Math.max(max, num);
  // if (minHeap.contains(num)) {
  // continue;
  // }

  // minHeap.add(num);
  // if (minHeap.size() > 3) {
  // minHeap.remove();
  // }
  // }

  // if (minHeap.size() == 3) {
  // return minHeap.remove();
  // }

  // return max;
  // }

  // USING A TREESET (52.58% speed, 93.77% space)
  public int thirdMax(int[] nums) {
    // use a treeset because it sorts keys
    TreeSet<Integer> treeSet = new TreeSet<>();

    for (int num : nums) {
      treeSet.add(num);
      if (treeSet.size() > 3) {
        treeSet.remove(treeSet.first());
      }
    }

    if (treeSet.size() == 3) {
      return treeSet.first();
    }

    return treeSet.last();
  }
}