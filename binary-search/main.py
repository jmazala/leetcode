# https://leetcode.com/problems/binary-search/description/


from bisect import bisect_left
from typing import List


class Solution:
    def search(self, nums: List[int], target: int) -> int:
        low = 0
        high = len(nums) - 1

        while low <= high:
            mid = (low + high) // 2

            if nums[mid] == target:
                return mid

            if nums[mid] < target:
                low = mid + 1
            else:
                high = mid - 1

        return -1


s = Solution()
print(s.search(nums=[-1, 0, 3, 5, 9, 12], target=9))  # 4
