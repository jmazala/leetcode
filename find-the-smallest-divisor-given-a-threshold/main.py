# https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/

from math import ceil
from typing import List


class Solution:
    def smallestDivisor(self, nums: List[int], threshold: int) -> int:
        low = 1
        high = max(nums)

        while low < high:
            mid = (low + high) // 2
            result = sum([ceil(x / mid) for x in nums])

            if result <= threshold:
                high = mid
            else:
                low = mid + 1

        return high


s = Solution()
print(s.smallestDivisor([2, 3, 5, 7, 11], 11))  # 3
print(s.smallestDivisor([1, 2, 5, 9], 6))  # 5
print(s.smallestDivisor([44, 22, 33, 11, 1], 5))  # 44
