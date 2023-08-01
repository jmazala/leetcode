# https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/

from typing import List


class Solution:
    # Count # of 1's alongside every number in the array
    # Pick the one with the maximum adjacent ones
    # TIME: O(n)
    # SPACE: O(n)
    def longestSubarray(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return 0

        if len(nums) == 2:
            return 1 if 1 in nums else 0

        left = [0] * len(nums)
        ones = 0

        for i, num in enumerate(nums):
            left[i] = ones
            ones = ones + 1 if num == 1 else 0

        ones = 0
        right = [0] * len(nums)
        for i in range(len(nums) - 1, -1, -1):
            right[i] = ones
            num = nums[i]
            ones = ones + 1 if num == 1 else 0

        total = [left[i] + right[i] for i in range(len(nums))]

        return max(*total)

    # SLIDING WINDOW
    # Find a sliding window with at most 1 '0'.
    # The maximium length is that window - 1
    # TIME: O(n)
    # SPACE: O(1)
    def longestSubarray(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return 0

        if len(nums) == 2:
            return 1 if 1 in nums else 0

        left = 0
        right = 0
        numZeroes = 0
        answer = 0

        while right < len(nums):
            numZeroes += 1 if nums[right] == 0 else 0

            while numZeroes > 1:
                numZeroes -= 1 if nums[left] == 0 else 0
                left += 1

            answer = max(answer, right - left)
            right += 1

        return answer


s = Solution()
print(s.longestSubarray([0, 1, 1, 1, 0, 1, 1, 0, 1]))  # 5
print(s.longestSubarray([1, 1, 0, 1]))  # 3
print(s.longestSubarray([1, 1, 1]))  # 2
print(s.longestSubarray([0, 1]))  # 1
print(s.longestSubarray([1, 0]))  # 1
print(s.longestSubarray([0]))  # 0
print(s.longestSubarray([1]))  # 0
print(s.longestSubarray([0, 0]))  # 0
