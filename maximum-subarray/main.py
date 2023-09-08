# https://leetcode.com/problems/maximum-subarray/


from typing import List


class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        sum = nums[0]
        answer = sum

        for num in nums[1:]:
            sum = max(sum + num, num)
            answer = max(answer, sum)

        return answer


s = Solution()
print(s.maxSubArray(nums=[-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6.
