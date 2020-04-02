https://leetcode.com/problems/maximum-subarray/

var maxSubArray = function(nums) {
  if (nums.length === 0) {
    return 0;
  }
  
  if (nums.length === 1) {
    return [nums[0]];
  }
  
  const dp = Array(nums.length);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1], nums[0] + nums[1]);
  
  for (let i = 2; i < dp.length; i++) {
    dp[i] = Math.max(nums[i] + dp[i-1], nums[i]);
    // console.log(`dp[${i}]=${dp[i]}`);
    // console.log(dp);
  }
  
  return dp[dp.length - 1];
};

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));