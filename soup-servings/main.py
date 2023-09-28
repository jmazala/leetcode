# https://leetcode.com/problems/soup-servings/description/

from functools import cache
from math import ceil

A_FIRST = 0
EQUAL = 1
B_FIRST = 2

OPTIONS = [(4, 0), (3, 1), (2, 2), (1, 3)]
MAX = 4800


class Solution:
    def soupServings(self, n: int) -> float:
        if n >= MAX:
            return 1

        result = self.helper(ceil(n / 25), ceil(n / 25))
        return result[A_FIRST] + 0.5 * result[EQUAL]

    @cache
    def helper(self, a, b) -> dict[int, float]:
        hash = {A_FIRST: 0.0, B_FIRST: 0.0, EQUAL: 0.0}

        for aSub, bSub in OPTIONS:
            aRemaining = max(0, a - aSub)
            bRemaining = max(0, b - bSub)

            if aRemaining == 0 and bRemaining == 0:
                hash[EQUAL] += 0.25
            elif aRemaining == 0:
                hash[A_FIRST] += 0.25
            elif bRemaining == 0:
                hash[B_FIRST] += 0.25
            else:
                next = self.helper(aRemaining, bRemaining)
                hash[EQUAL] += 0.25 * next[EQUAL]
                hash[A_FIRST] += 0.25 * next[A_FIRST]
                hash[B_FIRST] += 0.25 * next[B_FIRST]

        return hash


s = Solution()
print(s.soupServings(50))  # .62500
print(s.soupServings(100))  # .71875
print(s.soupServings(800))  # 0.961617625085637
