class Solution {
  public int maxArea(int[] heights) {
    if (heights.length < 2) {
      return 0;
    }
    
    if (heights.length == 2) {
      return Math.min(heights[0], heights[1]);
    }

    //one pass

    //with a right pointer and left pointer
    int maxArea = 0;
    int low = 0;
    int high = heights.length - 1;

    while (low < high) {
      int height = Math.min(heights[low], heights[high]);
      maxArea = Math.max(maxArea, height * (high - low));

      if (heights[low] < heights[high]) {
        low++;
      } else {
        high--;
      }
    }

    return maxArea;

    //start with n^2 solution
    // int maxArea = 0;
    // for (int i = 0; i < heights.length; i++ ) {
    //   if (heights[i+1] - heights[] )
    //   for (int j = i + 1; j < heights.length; j++) {
    //     int height = Math.min(heights[i], heights[j]);
    //     maxArea = Math.max(maxArea, height * (j - i));
    //   }
    // }

    // return maxArea;
  }

  public static void main(String[] args) {
    Solution s = new Solution();
    int[] heights = {1,2,1};
    System.out.println(s.maxArea(heights));
  }
}