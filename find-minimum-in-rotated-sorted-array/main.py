# https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/

from typing import List


class Solution:
    def findMin(self, nums: List[int]) -> int:
        if len(nums) == 1:
            return nums[0]

        if len(nums) == 2:
            return min(nums[0], nums[1])

        low = 0
        high = len(nums) - 1

        # No rotation!
        if nums[high] > nums[low]:
            return nums[low]

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] > nums[mid + 1]:
                return nums[mid + 1]

            if nums[mid - 1] > nums[mid]:
                return nums[mid]

            if nums[mid] > nums[0]:
                low = mid + 1
            else:
                high = mid - 1


s = Solution()
print(s.findMin(nums=[11, 13, 15, 17]))  # 11
print(s.findMin(nums=[17, 11, 13, 15]))  # 11
print(s.findMin(nums=[15, 17, 11, 13]))  # 11
print(s.findMin(nums=[13, 15, 17, 11]))  # 11
