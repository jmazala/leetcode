# https://leetcode.com/problems/two-sum/

from collections import defaultdict
from typing import List


class Solution:
    # METHOD 1 - Brute Force
    # TIME: O(n^2) assuming only the last pair meets target
    # 2083ms / 17.2mb
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i, num in enumerate(nums):
            for j in range(i + 1, len(nums)):
                if num + nums[j] == target:
                    return [i, j]

        return []  # won't happen

    # METHOD 2 - Hash (2 pass)
    # TIME: O(n) for hash, O(n) for loop
    # SPACE: O(n) for hash
    # 72ms / 18.4MB
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hash = defaultdict(list)
        for i, num in enumerate(nums):
            hash[num].append(i)

        for i, num in enumerate(nums):
            if target - num not in hash:
                continue

            for j in hash[target - num]:
                if i != j:
                    return [i, j]

    # METHOD 3 - Hash (1 pass)
    # TIME: O(n) for single loop
    # SPACE: O(n) for hash
    # 61ms / 17.6MB
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        hash = {}
        for i, num in enumerate(nums):
            if target - num in hash:
                return [i, hash[target - num]]

            hash[num] = i


s = Solution()
print(s.twoSum([2, 7, 11, 15], 9))  # [0, 1]
