# https://leetcode.com/problems/maximum-length-of-pair-chain/

import heapq
from typing import List


class HeapItem:
    def __init__(self, item: tuple):
        self.item = item

    def __lt__(self, another):
        return self.item[0] - another.item[0] < 0


class MaxHeap:
    def __init__(self):
        self._data = []

    def push(self, value: HeapItem) -> None:
        heapq.heappush(self._data, value)

    def pop(self) -> int:
        return heapq.heappop(self._data)

    def peek(self) -> int:
        return self._data[0]

    def __len__(self) -> int:
        return len(self._data)


class Solution:
    # SOLUTION 1 - USE A HEAP
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        pairs.sort(key=lambda x: x[0])
        longestChainLength = 0
        maxHeap = MaxHeap()

        for [start, end] in pairs:
            while len(maxHeap) > 0 and start > maxHeap.peek()[0]:
                item = maxHeap.pop()
                longestChainLength = max(longestChainLength, item[1])

            heapItem = (end, longestChainLength + 1)
            maxHeap.push(heapItem)

        while len(maxHeap) > 0:
            longestChainLength = max(longestChainLength, maxHeap.pop()[1])

        return longestChainLength

    # SOLUTION 2 - GREEDY
    def findLongestChain(self, pairs: List[List[int]]) -> int:
        # Sort by ending element
        pairs.sort(key=lambda x: x[1])

        # greedily choose every time
        end = float("-inf")
        length = 0

        for [linkStart, linkEnd] in pairs:
            if linkStart <= end:
                continue

            end = linkEnd
            length += 1

        return length


s = Solution()
print(s.findLongestChain([[1, 2], [2, 3], [3, 4]]))  # 2 ([1,2] -> [3,4])
print(s.findLongestChain([[1, 2], [7, 8], [4, 5]]))  # 3 [1,2] -> [4,5] -> [7,8]
print(
    s.findLongestChain([[1, 2], [1, 6], [8, 9], [7, 8], [4, 5], [6, 7], [4, 7]])
)  # 4 [1,2] -> [4,5] -> [6,7] [8, 9]
