import java.util.Random;

class Solution {
  private int[] original;
  private int[] nums;
  private Random r;

  public Solution(int[] nums) {
    this.original = nums.clone();
    this.nums = nums;
    this.r = new Random();
  }

  /** Resets the array to its original configuration and return it. */
  public int[] reset() {
    this.nums = this.original.clone();
    return this.nums;
  }

  /** Returns a random shuffling of the array. */
  public int[] shuffle() {
    // go through the array and swap each one with a random other index
    for (int i = 0; i < this.nums.length; i++) {
      this.swap(i, r.nextInt(this.nums.length - i) + i);
    }

    return this.nums;
  }

  private void swap(int i, int j) {
    int temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
  }
}

/**
 * Your Solution object will be instantiated and called as such: Solution obj =
 * new Solution(nums); int[] param_1 = obj.reset(); int[] param_2 =
 * obj.shuffle();
 */