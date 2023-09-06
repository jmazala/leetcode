# https://leetcode.com/problems/longest-increasing-subsequence/


from bisect import bisect_left
from typing import List


class Solution:
    # METHOD 1 - DP + COMPARE BACKWARDS
    # TIME: O(n^2)
    # SPACE: O(n)
    def lengthOfLIS(self, nums: List[int]) -> int:
        subsequences = [1] * len(nums)
        length = 1

        for i, num in enumerate(nums):
            for j in range(i):
                if nums[j] < num:
                    subsequences[i] = max(subsequences[i], subsequences[j] + 1)
                    length = max(length, subsequences[i])

        return length

    # METHOD 2 - INTELLIGENTLY BUILD
    # TIME: O(n^2)
    # SPACE: O(n)
    #   Still more efficient than above solution on average
    def lengthOfLIS(self, nums: List[int]) -> int:
        sub = [nums[0]]
        for i in range(1, len(nums)):
            num = nums[i]
            if num > sub[-1]:
                sub.append(num)
            else:
                # Find the first element in sub that is >= num
                j = 0
                while num > sub[j]:
                    j += 1
                sub[j] = num

        return len(sub)

    # METHOD 3 - BINARY SEARCH IMPROVEMENT
    # TIME: O(n log n)
    # SPACE: O(n)
    def lengthOfLIS(self, nums: List[int]) -> int:
        sub = []
        for num in nums:
            i = bisect_left(sub, num)

            if i == len(sub):
                sub.append(num)
            else:
                sub[i] = num

        return len(sub)


s = Solution()
print(s.lengthOfLIS(nums=[10, 9, 2, 5, 3, 7, 101, 18]))  # 4
print(s.lengthOfLIS(nums=[0, 1, 0, 3, 2, 3]))  # 4
print(s.lengthOfLIS(nums=[7, 7, 7, 7, 7, 7, 7]))  # 1
