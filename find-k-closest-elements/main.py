# https://leetcode.com/problems/find-k-closest-elements/

from bisect import bisect_left
from typing import List


class Solution:
    # METHOD 1 - Use binary search to find the closest number to x, then try to expand the window
    # TIME: O(log n) + O(k)
    # O(log n) to find left index, O(k) to expand
    # SPACE: O(1)
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        if len(arr) == k:
            return arr

        # use binary search to find the index of the closest element to x in arr
        # bisect module does binary search for us
        left = bisect_left(arr, x) - 1
        right = left + 1

        while right - left - 1 < k:
            if left == -1:
                right += 1
                continue

            if right == len(arr) or abs(arr[left] - x) <= abs(arr[right] - x):
                left -= 1
            else:
                right += 1

        return arr[left + 1 : right]

    # METHOD 2 - Use binary search to find the left bound of the sliding window
    # What is the biggest index left bound could be?
    # Left bound's upper limit is len(arr) - k to account for remaining space of the window
    # Binary search could be used to move left / right pointers closer to left bound of answer
    # At each binary search iteration, consider mid and mid + k
    # only 1 could be in the final answer
    # EX: mid = 2 k = 3.  arr[2] and arr[5] couldn't be in the same window because that would
    # exceed size k
    # If element at arr[mid] is closer to x, than arr[mid + k], that means everything >= arr[mid + k]
    # cannot be in the sliding window.  So move the right pointer.
    # The reverse is true. If arr[mid] is further, than arr[mid] and everything below it
    # cannot be in the final window.  Thus we'd move left pointer.
    # TIME: O(log(n-k)) + k
    #   O(log(n-k)) to find left
    #   O(k) to build output
    # SPACE: O(k) for output
    def findClosestElements(self, arr: List[int], k: int, x: int) -> List[int]:
        # We're searching for the proper place to store the left pointer of the window
        left = 0
        # can't search higher than this, otherwise we can't make a window of size k
        right = len(arr) - k

        while left < right:
            mid = (left + right) // 2

            # Compare the distances of the mid and mid+k elements to the target 'x'
            if x - arr[mid] > arr[mid + k] - x:
                left = mid + 1
            else:
                right = mid

        return arr[left : left + k]


s = Solution()
print(s.findClosestElements([-1, -2, 1, 5, 6, 1000], 3, 4))
print(s.findClosestElements([1, 2, 3, 4, 5], 4, 3))  # [1,2,3,4]
print(s.findClosestElements(arr=[1, 2, 3, 4, 5], k=4, x=-1))  # [1,2,3,4]
