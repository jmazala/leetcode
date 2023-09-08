# https://leetcode.com/problems/sliding-window-maximum/


from collections import deque
from heapq import heapify, heappop, heappush
from typing import List


class Solution:
    # METHOD 1 - TLE
    # Check max of each window
    # This would be O(nk)
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        # First, establish sum with window size k
        right = 0
        window = []

        while right < k:
            window.append(nums[right])
            right += 1

        maxWindow = []

        for right in range(k, len(nums)):
            maxWindow.append(max(window))
            window.pop(0)
            window.append(nums[right])

        maxWindow.append(max(window))
        return maxWindow

    # METHOD 2 - USING A MAX HEAP
    # If the newly added element (to the window) is the largest, any smaller items don't matter
    # This is inferior to a monotonic queue (METHOD 3) by quite a bit for heapify operations
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        maxHeap = []

        # Initialize window with first k elements
        for i in range(k):
            toAdd = nums[i]

            while len(maxHeap) and toAdd >= -maxHeap[0][0]:
                heappop(maxHeap)

            heappush(maxHeap, (-toAdd, i))

        maxWindow = [-maxHeap[0][0]]

        for i in range(k, len(nums)):
            # Evict items from heap if too old
            while len(maxHeap) and maxHeap[0][1] <= i - k:
                heappop(maxHeap)

            toAdd = nums[i]
            while len(maxHeap) and toAdd >= -maxHeap[0][0]:
                heappop(maxHeap)

            heappush(maxHeap, (-toAdd, i))
            maxWindow.append(-maxHeap[0][0])

        return maxWindow

    # METHOD 3 - Monotonic queue
    # In python, deque will be better than just a List for removal / addition at either end
    def maxSlidingWindow(self, nums: List[int], k: int) -> List[int]:
        # When we encounter a new element x, discard all elements less than x before adding x
        # Monotonic queue is efficient in insertion, deletion, and retrieval from both ends
        # Monotonic means elements are always sorted.  We want decreasing
        # First element is always at index 0 (nums[dq[0]])
        dq = deque()

        # Initialize window with first k elements
        for i in range(k):
            while len(dq) and nums[i] >= nums[dq[-1]]:
                dq.pop()

            dq.append(i)

        maxWindow = [nums[dq[0]]]

        # Iterate over i in range [k, n-1]
        for i in range(k, len(nums)):
            if dq[0] == i - k:
                dq.popleft()

            while len(dq) and nums[i] >= nums[dq[-1]]:
                dq.pop()

            dq.append(i)
            maxWindow.append(nums[dq[0]])

        # For each element, add its index to dq and maintain monotonic property

        # Remove first element in dq if its outside the window (dq[0] == i-k)
        # Then we can push nums[dq[0]] to maxWindow

        return maxWindow


s = Solution()
print(s.maxSlidingWindow(nums=[1, 3, -1, -3, 5, 3, 6, 7], k=3))  # [3, 3, 5, 5, 6, 7]
print(
    s.maxSlidingWindow(nums=[1, 3, -1, -3, 5, 3, 6, 7, 2, 5, 4], k=3)
)  # [3, 3, 5, 5, 6, 7, 7, 7, 5]
print(s.maxSlidingWindow([1], 1))  # [1]
