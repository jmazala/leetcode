# https://leetcode.com/problems/top-k-frequent-elements/

import heapq
from collections import defaultdict
from typing import List


# SOLUTION 1 - USE A HASH AND A MINHEAP
# First put all numbers into a hash and tally counts
# Iterate through the unique numbers, and insert into a minHeap
# When the heap gets too large in size, evict a number
# Since it's a min heap, the number evicted will be the one with the smallest
# count.  Thus remaining items will be the top K most frequent items
class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        hash = defaultdict(int)
        heap = []

        for num in nums:
            hash[num] += 1

        for num in hash.keys():
            heapq.heappush(heap, (hash[num], num))
            if len(heap) > k:
                heapq.heappop(heap)

        return [num for (_, num) in heap]


s = Solution()
print(s.topKFrequent([1, 1, 1, 2, 2, 3], 2))  # [1, 2]
print(s.topKFrequent([5, 3, 1, 1, 1, 3, 73, 1], 2))  # [1, 3]
