import java.util.HashMap;

class Solution {
  //dynamic programming solution
  public boolean canPartition(int[] nums) {
    int total = 0;
    for (int num : nums) {
      total += num;
    }

    if (total % 2 == 1) {
      return false;
    }

    //we have an even number.  simulate making subsets
    return canPartition(nums, 0, 0, total / 2, new HashMap<String, Boolean>());
  }

  public boolean canPartition(int[] nums, int index, int sum, int target, HashMap<String, Boolean> state) {
    String current = index + "," + sum;
    if (state.containsKey(current)) {
      return state.get(current);
    }
    
    if (sum == target) {
      return true;
    }

    if (sum > target || index >= nums.length) {
      return false;
    }

    boolean foundPartition= canPartition(nums, index + 1, sum + nums[index], target, state) || canPartition(nums, index + 1, sum, target, state);
    state.put(current, foundPartition);

    return foundPartition;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[] nums = {1, 5, 5, 11};
    System.out.println(s.canPartition(nums));
  }
}