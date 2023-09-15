# https://leetcode.com/problems/find-the-duplicate-number/


from typing import List


class Solution:
    # METHOD 1 - SET BITS
    # For i in nums, check the ith bit
    # If set, duplicate number
    # TIME: O(n)
    # SPACE: O(1)
    # 1505ms / 30.5 MB (why so slow?)
    def findDuplicate(self, nums: List[int]) -> int:
        value = 0
        for num in nums:
            if value & (1 << num):
                return num

            value = value | (1 << num)

        return -1

    # METHOD 2 - FLOYD'S CYCLE DETECTION ALGORITHM
    # Starting at 0, jump to a[0] space in array
    # Keep going, using 2 pointers to find the point
    # Where the cycle begins
    # TIME: O(n)
    # SPACE: O(1)
    # 533ms / 31MB
    def findDuplicate(self, nums: List[int]) -> int:
        slow = fast = nums[0]

        # Find intersection point
        while True:
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break

        # Reset slow pointer, halve fast's speed, find cycle entrance
        slow = nums[0]
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]

        return fast
