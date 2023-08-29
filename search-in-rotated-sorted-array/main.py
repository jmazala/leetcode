# https://leetcode.com/problems/search-in-rotated-sorted-array/

from typing import List


class Solution:
    # First, find the pivot element to split
    # the rotated array into sorted 2 sub arrays
    # Binary search both sub-arrays for target
    # TIME: O(log n)
    #   O(log n) to find pivot
    #   O(log n/2) to binary search left
    #   O(log n/2) to binary search right
    # SPACE: O(1)
    def search(self, nums: List[int], target: int) -> int:
        if len(nums) == 0:
            return -1
        if len(nums) == 1:
            return -1 if target != nums[0] else 0

        # Find the index of the pivot element (the smallest element)
        low = 0
        high = len(nums) - 1
        while low <= high:
            mid = (low + high) // 2

            if nums[mid] > nums[-1]:
                low = mid + 1
            else:
                high = mid - 1

        answer = binarySearch(nums, 0, low - 1, target)
        return (
            answer if answer != -1 else binarySearch(nums, low, len(nums) - 1, target)
        )

    # METHOD 2 - one binary search
    def search(self, nums: List[int], target: int) -> int:
        if len(nums) == 0:
            return -1
        if len(nums) == 1:
            return -1 if target != nums[0] else 0

        low = 0
        high = len(nums) - 1

        while low <= high:
            mid = (low + high) // 2
            if nums[mid] == target:
                return mid

            if nums[mid] >= nums[low]:  # Left half is sorted
                if target >= nums[low] and target < nums[mid]:
                    high = mid - 1
                else:
                    low = mid + 1
            else:  # right half is sorted
                if target <= nums[high] and target > nums[mid]:
                    low = mid + 1
                else:
                    high = mid - 1

        return -1


def binarySearch(nums, low, high, target):
    while low <= high:
        mid = (low + high) // 2

        if nums[mid] == target:
            return mid

        if nums[mid] > target:
            high = mid - 1
        else:
            low = mid + 1

    return -1


s = Solution()
print(s.search(nums=[3, 1], target=1))  # 1
print(s.search(nums=[4, 5, 6, 7, 0, 1, 2], target=0))  # 4
print(s.search(nums=[4, 5, 6, 7, 0, 1, 2], target=3))  # -1
print(s.search(nums=[1], target=0))  # -1
