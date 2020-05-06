class Solution {
  public int majorityElement(int[] nums) {
    Map<Integer, Integer> hash = new HashMap<>();

    for (int num : nums) {
      int count = hash.getOrDefault(num, 0) + 1;
      if (count > nums.length / 2) {
        return num;
      }

      hash.put(num, count);
    }

    return -1; // placeholder
  }
}