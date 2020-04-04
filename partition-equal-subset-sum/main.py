from typing import List

class Solution:
    def canPartition(self, nums: List[int]) -> bool:
        total = sum(nums)

        if (total % 2 == 1 or len(nums) == 1):
            return False

        target = total / 2
        return self.helper(nums, 0, 0, target, {})

    def helper(self, nums: List[int], currentSum: int, index: int, target: int, memo: dict) -> bool:
        key = "%d,%d" % (currentSum, index)
        if key in memo:
            return memo[key]

        if (currentSum == target):
            return True

        if (currentSum > target or index >= len(nums)):
            return False

        result = self.helper(nums, currentSum + nums[index], index + 1, target, memo) or self.helper(
            nums, currentSum, index + 1, target, memo)
        memo[key] = result
        return result

if __name__ == '__main__':
  s = Solution()
  print(s.canPartition([1,5,5,11]))
