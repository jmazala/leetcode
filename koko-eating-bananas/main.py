# https://leetcode.com/problems/koko-eating-bananas

from math import ceil
from typing import List


class Solution:
    def minEatingSpeed(self, piles: List[int], h: int) -> int:
        low = ceil(min(piles) / h)
        high = max(piles)

        if len(piles) == h:
            return high

        while low < high:
            mid = (low + high) // 2
            hours = sum([ceil(pile / mid) for pile in piles])

            if hours <= h:
                high = mid
            else:
                low = mid + 1

        return low
