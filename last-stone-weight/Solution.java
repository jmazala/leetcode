import java.util.PriorityQueue;

class Solution {
  // [2,7,4,1,8,1]
  public static int lastStoneWeight(int[] stones) {
    if (stones.length == 0) {
      return 0;
    }

    if (stones.length == 1) {
      return 1;
    }

    if (stones.length == 2) {
      return Math.abs(stones[0] - stones[1]);
    }

    // put all the stones into a heap so we can grab the heaviest ones

    PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

    for (int stone : stones) {
      maxHeap.add(stone);
    }

    // maxHeap: [1]

    // while you can, choose the 2 heaviest stones and smash them together
    while (maxHeap.size() >= 2) {
      int y = maxHeap.remove(); // 1
      int x = maxHeap.remove(); // 1

      // if x === y destroy both
      if (x == y) {
        continue;
      }

      // if x != y put stone (y-x) back into the heap
      maxHeap.add(y - x);
    }

    // if there's 1 stone left return it else 0
    return maxHeap.isEmpty() ? 0 : maxHeap.peek();
  }

  public static void main(String[] args) {
    System.out.println(Solution.lastStoneWeight(new int[] { 2, 7, 4, 1, 8, 1 })); // 1

  }
}
