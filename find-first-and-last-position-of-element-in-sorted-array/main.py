from typing import List
import math


class Solution:
    def searchRange(self, nums: List[int], target: int) -> List[int]:
        answer = [-1, -1]

        left = binarySearch(nums, target, True)

        if (left == len(nums) or nums[left] != target):
            return answer

        right = binarySearch(nums, target, False)
        return [left, right - 1]


def binarySearch(nums: List[int], target: int, goLeft: bool) -> int:
    low = 0
    high = len(nums)

    while (low < high):
        mid = math.floor((high + low) / 2)
        if (nums[mid] == target and goLeft) or nums[mid] > target:
            high = mid
        else:
            low = mid + 1

    return low


if __name__ == '__main__':
    s = Solution()
    print(s.searchRange([5, 7, 7, 8, 8, 10], 8))  # [3,4]
    print(s.searchRange([5, 7, 7, 8, 8, 10], 6))  # [-1, -1]
