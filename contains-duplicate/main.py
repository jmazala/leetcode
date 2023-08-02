# https://leetcode.com/problems/contains-duplicate/


class Solution:
    def containsDuplicate(self, nums: [int]) -> bool:
        return len(nums) > len(set(nums))
