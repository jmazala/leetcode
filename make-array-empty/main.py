# https://leetcode.com/problems/make-array-empty/

from heapq import heapify, heappop
from typing import List

from sortedcontainers import SortedList


class Solution:
    # METHOD 1 - USE A HEAP + SORTEDLIST
    def countOperationsToEmptyArray(self, nums: List[int]) -> int:
        n = len(nums)
        sl = SortedList(list(range(n)))
        heap = [(num, i) for i, num in enumerate(nums)]
        heapify(heap)

        prev = 0
        answer = 0

        while heap:
            _, i = heappop(heap)
            delta = sl.bisect_left(i) - sl.bisect_left(prev)
            answer += delta % len(sl)
            sl.discard(i)
            prev = i

        return answer + n

    # METHOD 2 - JUST USE A SORTEDLIST
    def countOperationsToEmptyArray(self, nums: List[int]) -> int:
        n = len(nums)
        numToIndex = {num: i for i, num in enumerate(nums)}
        positions = SortedList(range(n))

        answer = 0
        i = 0

        for num in sorted(nums):
            i = numToIndex[num]
            j = positions.index(num)
            answer += (j - i) % len(positions)
            positions.pop(j)
            i = j

        return answer + n


s = Solution()
print(s.countOperationsToEmptyArray([3, 4, -1]))  # 5
print(s.countOperationsToEmptyArray([1, 2, 3]))  # 3
