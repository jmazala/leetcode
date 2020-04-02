class Solution {
  public List<List<Integer>> subsets(int[] nums) {
    //return value
    List<List<Integer>> subsets = new ArrayList<>();
    generateSubsets(0, nums, new ArrayList<>(), subsets);
    //recursive function to do the work

    //return the return value
    return subsets;
  }

  public void generateSubsets(int index, int[] nums, List<Integer> current, List<List<Integer>> subsets) {
    //at any iteration of the recursive function just add whatever our current subset is
    subsets.add(new ArrayList<>(current));

    //walk through the remainder of numbers simulating using that number, or skipping it
    for (int i = index; i < nums.length; i++) {
      //first just take the number
      current.add(nums[i]);
      generateSubsets(index + 1, nums, current, subsets);
      current.pop();
    }
  }
}

//runtime is 2^n where n is length of numbers.  at every iteration we take it, or don't take it