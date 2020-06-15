import java.util.ArrayList;
import java.util.List;

class Solution {
  public List<List<Integer>> subsets(int[] nums) {
    // return value
    List<List<Integer>> subsets = new ArrayList<>();
    for (int k = 0; k <= nums.length; k++) {
      helper(0, k, nums, new ArrayList<>(), subsets);
    }
    return subsets;
  }

  /**
   * helper function for recursion.
   * 
   * @param i       - starting index for nums array
   * @param k       - size of the subset to generate
   * @param subsets - to be returned in outer function
   */
  public void helper(int i, int k, int[] nums, List<Integer> current, List<List<Integer>> subsets) {
    if (current.size() == k) {
      subsets.add(new ArrayList<>(current));
      return;
    }

    for (; i < nums.length; i++) {
      current.add(nums[i]);
      helper(i + 1, k, nums, current, subsets);
      current.remove(current.size() - 1);
    }
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    System.out.println(s.subsets(new int[] { 1, 2, 3 }));
  }
}

/*
 * SOLUTION 2 class Solution { public List<List<Integer>> subsets(int[] nums) {
 * // return value List<List<Integer>> subsets = new ArrayList<>();
 * generateSubsets(0, nums, new ArrayList<>(), subsets); // recursive function
 * to do the work
 * 
 * // return the return value return subsets; }
 * 
 * public void generateSubsets(int i, int[] nums, List<Integer> current,
 * List<List<Integer>> subsets) { // at any iteration of the recursive function
 * just add whatever our current // subset is subsets.add(new
 * ArrayList<>(current));
 * 
 * // walk through the remainder of numbers simulating using that number, or //
 * skipping it for (; i < nums.length; i++) { // first just take the number
 * current.add(nums[i]); generateSubsets(i + 1, nums, current, subsets);
 * current.remove(current.size() - 1); } } }
 * 
 * // runtime is 2^n where n is length of numbers. at every iteration we take
 * it, // or don't take it
 */