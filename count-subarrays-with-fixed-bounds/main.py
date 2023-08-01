# https://leetcode.com/problems/count-subarrays-with-fixed-bounds/

from typing import List


class Solution:
    # SLIDING WINDOW
    # Traverse the array left to right and store 3 extra values:
    # 1 - the leftmost value where no valid subarray can begin (out of bounds minK maxK)
    # 2/3 - the rightmost values for min and max positions, marking the last place a valid subarray could begin
    # Now that we've kept track of the left positions, keep track of the right positions as well
    # This is through a simple for loop of the entire array
    # At each step, all valid subarrays that could end at position i
    # start between values (1) and (2) above
    # TIME: O(n) for iterating throuhg array
    #   Everything inside the for loop is O(1)
    # SPACE: O(1) for minPos / maxPos / leftBound / answer
    def countSubarrays(self, nums: List[int], minK: int, maxK: int) -> int:
        minPosition = -1
        maxPosition = -1
        leftBound = -1
        answer = 0

        for i, num in enumerate(nums):
            if num < minK or num > maxK:
                leftBound = i

            if num == minK:
                minPosition = i
            if num == maxK:
                maxPosition = i

            numValidSubarraysEndingAtI = max(
                0, min(minPosition, maxPosition) - leftBound
            )
            answer += numValidSubarraysEndingAtI

        return answer


s = Solution()
print(s.countSubarrays([2, 3, 9, 4, 1, 5, 4, 5, 1, 4, 3, 2], 1, 5))  # 26
print(s.countSubarrays(nums=[1, 3, 5, 2, 7, 5], minK=1, maxK=5))  # 2 [1,3,5], [1,3,5,2]
print(s.countSubarrays([1, 1, 1, 1], 1, 1))  # 10
