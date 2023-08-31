# https://leetcode.com/problems/house-robber/

from typing import List


class Solution:
    # METHOD 1 - DP
    # TIME: O(N)
    # SPACE: O(N)
    # 38ms / 16.2MB
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 0:
            return 0

        if len(nums) == 1:
            return nums[0]

        dp = [0] * len(nums)
        dp[0] = nums[0]
        dp[1] = max(nums[0], nums[1])

        for i in range(2, len(nums)):
            dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])

        return dp[-1]

    # METHOD 2 - 2 POINTERS
    # TIME: O(N)
    # SPACE: O(1)
    # 41ms / 16.2MB (WHAT?)
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 0:
            return 0

        if len(nums) == 1:
            return nums[0]

        t1 = 0
        t2 = 0

        for num in nums:
            temp = t1
            t1 = max(t2 + num, t1)
            t2 = temp

        return t1


s = Solution()
print(s.rob([1, 2, 3, 1]))  # 4
print(s.rob([2, 7, 9, 3, 1]))  # 12
