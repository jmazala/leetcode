from typing import List

class Solution:
  def productExceptSelf(self, nums: List[int]) -> List[int]:
    dp = [1] * len(nums)

    #apply left product
    for i in range(1, len(nums)):
      dp[i] = dp[i-1] * nums[i-1]
    
    #apply right product
    multiplier = 1
    for i in range(len(nums) - 1, -1, -1):
      dp[i] *= multiplier
      multiplier *= nums[i]
    
    return dp

s = Solution()
print (s.productExceptSelf([1,2,3,4])) #[24,12,8,6]