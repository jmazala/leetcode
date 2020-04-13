import java.util.HashMap;
import java.util.Map;

public class Solution {
  public static int findMaxLength(int[] nums) {
    Map<Integer, Integer> countsAtIndex = new HashMap<>();
    countsAtIndex.put(0, -1); //we're keeping track of indices and we initialize at 0
    int maxLength = 0;
    int count = 0;

    for (int i = 0; i < nums.length; i++) {
      count += (nums[i] == 0 ? -1 : 1);

      if (countsAtIndex.containsKey(count)) {
        maxLength = Math.max(maxLength, i - countsAtIndex.get(count));
      } else {
        countsAtIndex.put(count, i);
      }
    }

    return maxLength;
  }

  public static void main(String[] args) {
    System.out.println(Solution.findMaxLength(new int[] {0, 1, 0, 0, 1, 0, 0, 1, 0, 1})); //6
  }
}