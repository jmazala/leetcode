
//https://leetcode.com/problems/frog-jump/
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

class Solution {
  public boolean canCross(int[] stones) {
    if (stones == null || stones.length < 2 || stones[0] != 0 || stones[1] != 1) {
      return false;
    }

    int maxStone = stones[stones.length - 1];
    Map<Integer, HashSet<Integer>> hash = new HashMap<>();

    for (int stone : stones) {
      hash.put(stone, new HashSet<Integer>());
    }

    hash.get(0).add(1);

    // first index is the square, returns an array of how many different places you
    // can go from there
    for (int currentStone : stones) {
      for (int numSteps : hash.get(currentStone)) {
        if (numSteps < 1) { // can't move 0 or negative steps
          continue;
        }

        int nextStone = currentStone + numSteps;
        if (nextStone == maxStone) {
          return true;
        }

        if (!hash.containsKey(nextStone)) {
          continue;
        }

        hash.get(nextStone).add(numSteps - 1);
        hash.get(nextStone).add(numSteps);
        hash.get(nextStone).add(numSteps + 1);
      }
    }

    // at step 0 k=0 we can go:
    // (k-1) = -1 steps to hell (nope)
    // (k) 0 steps to 0
    // (k+1) 1 step to 1

    // return hash.get(stones[stones.length - 1]).size() > 0;
    return false;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.canCross(new int[] { 0, 1, 3, 5, 6, 8, 12, 17 })); // true
    System.out.println(s.canCross(new int[] { 0, 1, 2, 3, 4, 8, 9, 11 })); // false
  }
}