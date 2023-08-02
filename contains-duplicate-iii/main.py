# https://leetcode.com/problems/contains-duplicate-iii/

import collections
from typing import List

from sortedcontainers import SortedDict


class Solution:
    # APPROACH 1 - Binary Search Trees
    # Keep a balanced tree.
    # Efficiently maintain a sorted set of elements of size indexDiff
    # At each iteration, check if there is a value in the sorted set
    # whose value is within valueDiff of the current element
    # By using a balanced tree, insert / delete / lookup are efficient
    # TIME: O(n log k)
    #   O(n) for outer loop
    #   O(log k) for BST search where k is indexDiff which is bounded by n
    # SPACE: O(k) which is bounded by O(n) where k is indexDiff
    def containsNearbyAlmostDuplicate(
        self, nums: List[int], indexDiff: int, valueDiff: int
    ) -> bool:
        window = SortedDict()

        for i, num in enumerate(nums):
            if i > indexDiff:
                # at this point (and every point after) the tree will exceed size k
                del window[nums[i - indexDiff - 1]]

            # check to see if there is a value within valueDiff of current element
            key = window.bisect_left(num - valueDiff)
            if key != len(window) and abs(window.iloc[key] - num) <= valueDiff:
                return True

            window[num] = num

        return False

    # APPROACH 2 - Using Buckets
    # For each element in nums we want to know in O(1)
    # is there an item in the window that is within the range of [x-t, x + t] ?
    # We can apply bucketing principles and make buckets in range of:
    # [0, t], [t+1, 2t+1], [2t+2, 3t+2], etc
    # Each iteration, check the bucket that x belongs to and the 2 adjacent buckets
    # This is not exactly bucket sort though because our buckets contain at most 1 element at a time
    # 2 elements in a bucket constitutes an "almost duplicate" and we can return early
    # So use a hashmap with an element associated with a bucket label
    def containsNearbyAlmostDuplicate(
        self, nums: List[int], indexDiff: int, valueDiff: int
    ) -> bool:
        buckets = {}

        width = valueDiff + 1
        for i, num in enumerate(nums):
            bucketNum = Solution.getID(num, width)

            if bucketNum in buckets:
                return True

            # check only previous bucket and next bucket for matches
            # We need to compare the abs of the values too because the beginning of bucket-1 range
            # won't be valid with the end of bucket range (the distance will be more than valueDiff + 1)
            if bucketNum - 1 in buckets and abs(num - buckets[bucketNum - 1]) < width:
                return True

            if bucketNum + 1 in buckets and abs(num - buckets[bucketNum + 1]) < width:
                return True

            # bucket m is empty and no almost duplicate in the neighbor buckets
            buckets[bucketNum] = num

            # We have more than indexDiff elements in the buckets.
            # Purge whatever number was indexDiff elements ago
            if i >= indexDiff:
                del buckets[Solution.getID(nums[i - indexDiff], width)]

        return False

    def getID(num: int, width: int) -> int:
        return (num + 1) // width - 1 if num < 0 else num // width


s = Solution()
print(s.containsNearbyAlmostDuplicate([8, 7, 15, 1, 6, 1, 9, 15], 1, 3))  # True
print(
    s.containsNearbyAlmostDuplicate(nums=[1, 2, 3, 1], indexDiff=3, valueDiff=0)
)  # True
print(
    s.containsNearbyAlmostDuplicate(nums=[1, 5, 9, 1, 5, 9], indexDiff=2, valueDiff=3)
)  # False
