import java.util.PriorityQueue;

class Solution {
  public int lastStoneWeight(int[] stones) {
    PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> {
      return a - b;
    });

    for (int stone : stones) {
      maxHeap.add(stone);
    }

    // Each turn, we choose the two heaviest rocks and smash them together.  Suppose the stones have weights x and y with x <= y.  The result of this smash is:
    while (maxHeap.size() >= 2) {
      int y = maxHeap.remove();
      int x = maxHeap.remove();

      // If x == y, both stones are totally destroyed;
      if (x == y) {
        continue;
      }

      // If x != y, the stone of weight x is totally destroyed, and the stone of weight y has new weight y-x.
      y -= x;
      maxHeap.add(y);
    }
    
    // At the end, there is at most 1 stone left.  Return the weight of this stone (or 0 if there are no stones left.)
    if (maxHeap.isEmpty()) {
      return 0;
    }

    return maxHeap.remove();
  }
}