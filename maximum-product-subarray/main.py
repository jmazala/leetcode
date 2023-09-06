# https://leetcode.com/problems/maximum-product-subarray/


from typing import List


class Solution:
    # Keep track of the largest running product, and the minimum running product
    # We keep track of minimum, because with another negative number, that could
    # become the new maximum
    def maxProduct(self, nums: List[int]) -> int:
        # This ones tricky because we need to keep track of the lowest product
        # In case we see another negative number, for instance

        if len(nums) == 0:
            return 0

        runningMax = runningMin = answer = nums[0]

        for i in range(1, len(nums)):
            num = nums[i]

            # 0 blows up our running max and min
            if num == 0:
                runningMax = runningMin = 0
            else:
                temp = runningMax  # Hold onto this value as runningMax / runningMin have impact on each other
                runningMax = max(runningMax * num, runningMin * num, num)
                runningMin = min(runningMin * num, temp * num, num)

            answer = max(runningMax, answer)

        return answer


s = Solution()
print(s.maxProduct([-2, 0]))  # 0
print(s.maxProduct([2, 3, -2, 4]))  # 6
print(s.maxProduct([-2, 0, -1]))  # 0
print(s.maxProduct([-100, 2, 5, -55, 0, 100, -99, 2, 55, -2, 0, 999, 4]))  # 2178000
