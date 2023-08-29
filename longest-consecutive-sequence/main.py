# https://leetcode.com/problems/longest-consecutive-sequence/

from typing import List


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        numSet = set(nums)
        answer = 0

        for num in nums:
            if (num - 1) in numSet:
                continue

            streak = num + 1
            while streak in numSet:
                streak += 1

            answer = max(streak - num, answer)

        return answer


s = Solution()
print(s.longestConsecutive([100, 4, 200, 1, 3, 2]))  # 4
print(s.longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))  # 9
