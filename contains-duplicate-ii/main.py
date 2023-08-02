# https://leetcode.com/problems/contains-duplicate-ii

from typing import List


class Solution:
    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:
        hash = {}

        for j, num in enumerate(nums):
            if num in hash:
                i = hash[num]
                if abs(i - j) <= k:
                    return True

            hash[num] = j

        return False


s = Solution()
print(s.containsNearbyDuplicate([1, 2, 3, 1], 3))  # True
print(s.containsNearbyDuplicate([1, 0, 1, 1], 1))  # True
print(s.containsNearbyDuplicate(nums=[1, 2, 3, 1, 2, 3], k=2))  # False
