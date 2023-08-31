# https://leetcode.com/problems/house-robber-ii/


from typing import List


class Solution:
    # def rob(self, nums: List[int]) -> int:
    #     if len(nums) == 0:
    #         return 0

    #     if len(nums) == 1:
    #         return nums[0]

    #     if len(nums) == 2:
    #         return max(nums[0], nums[1])

    #     dpStartAtZero = [0] * len(nums)
    #     dpStartAtZero[0] = nums[0]
    #     dpStartAtZero[1] = nums[1]

    #     for i in range(2, len(nums)):
    #         dpStartAtZero[i] = max(dpStartAtZero[i - 1], dpStartAtZero[i - 2] + nums[i])

    #     dpStartAtOne = [0] * len(nums)
    #     dpStartAtOne[0] = nums[1]
    #     dpStartAtOne[1] = nums[2]

    #     for i in range(2, len(nums) - 1):
    #         dpStartAtOne[i] = max(
    #             dpStartAtOne[i - 1], dpStartAtOne[i - 2] + nums[i + 1]
    #         )

    #     dpStartAtOne[len(nums) - 1] = max(
    #         dpStartAtOne[len(nums) - 2], dpStartAtOne[len(nums) - 3] + nums[0]
    #     )

    #     return max(dpStartAtZero[-1], dpStartAtOne[-1])
    def rob(self, nums: List[int]) -> int:
        if len(nums) == 0:
            return 0

        if len(nums) == 1:
            return nums[0]

        return max(self.robSubArray(nums[:-1]), self.robSubArray(nums[1:]))

    def robSubArray(self, nums: List[int]) -> int:
        t1 = 0
        t2 = 0

        for num in nums:
            temp = t1
            t1 = max(num + t2, t1)
            t2 = temp

        return t1


s = Solution()
print(s.rob([2, 7, 9, 3, 1]))  # 12
print(s.rob([2, 3, 2]))  # 3
