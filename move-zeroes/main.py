class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        if (len(nums) < 2):
            return

        slow = 0
        fast = 1

        while fast < len(nums):
            if nums[slow] == 0 and nums[fast] == 0:
                fast += 1
                continue

            if nums[slow] == 0 and nums[fast] != 0:
                [nums[slow], nums[fast]] = [nums[fast], nums[slow]]
                slow += 1
                fast += 1
                continue

            slow += 1
            fast += 1
