# https://leetcode.com/problems/jump-game/


from typing import List


class Solution:
    # METHOD 1 - START AT BEGINNING, TRY TO REACH END
    # Has memoization as well.  Always try to go
    # as far as you can starting from each index.
    # Use a set to avoid repeating work
    # TIME: O(n)
    # SPACE: O(n)
    def canJump(self, nums: List[int]) -> bool:
        maxReach = 0
        seen = set()

        for pos in range(len(nums)):
            if pos > maxReach:
                return False

            temp = pos

            while nums[temp] >= 0:
                if temp in seen:
                    break

                seen.add(temp)

                temp += nums[temp]
                if temp >= len(nums) - 1:
                    return True

                maxReach = max(maxReach, temp)

        return False

    # METHOD 2 - Start at end, try to reach beginning
    # TIME: O(n)
    # SPACE: O(1)
    def canJump(self, nums: List[int]) -> bool:
        lastPos = len(nums) - 1

        for i in range(len(nums) - 1, -1, -1):
            if i + nums[i] >= lastPos:
                lastPos = i

        return lastPos == 0


s = Solution()
print(s.canJump(nums=[2, 3, 1, 1, 4]))  # True
print(s.canJump(nums=[3, 2, 1, 0, 4]))  # False
