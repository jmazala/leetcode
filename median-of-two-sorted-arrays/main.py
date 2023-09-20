# https://leetcode.com/problems/median-of-two-sorted-arrays/


from heapq import heappush, nsmallest
from typing import List


class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        heap = []
        for num in nums1 + nums2:
            heappush(heap, num)

        # Even size, avg of middle 2 elements
        if len(heap) % 2 == 0:
            middleElements = nsmallest(len(heap) // 2 + 1, heap)[-2:]
            return sum(middleElements) / 2

        # odd, find middle element
        return nsmallest(len(heap) // 2 + 1, heap)[-1]


s = Solution()
print(s.findMedianSortedArrays(nums1=[1, 3], nums2=[2]))  # 2
print(s.findMedianSortedArrays(nums1=[1, 2], nums2=[3, 4]))  # 2.5


"""
Assume nums2 is smaller

CASE 1: nums2[-1] < nums1[0] (entirely before)
if odd: find median of nums2 but shifted to the left by len(nums1) / 2 units
if even: find median elements of nums2 but shift to the left len(nums1) / 2 units and avg

CASE 2:  nums2[0] > nums1[-1] (entirely after)
Same as above but go right

CASE 3:  nums2[0] < nums1[0] and nums2[-1] >= nums1[0] (partially before)
This is the same as case 2 since we're adding elements to the left of median

CASE 4:  nums2[0] < nums1[-1] and nums2[-1] > nums1[-1] (partially after)
same as case 3, just to the right

CASE 5:  entirely inside
case 5a:  median(nums2) > median(nums1):
  if odd (combined), shifted nums1 median to the right
  if even() avg of 2 elements
"""
