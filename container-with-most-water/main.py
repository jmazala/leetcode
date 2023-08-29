# https://leetcode.com/problems/container-with-most-water/

from typing import List


class Solution:
    def maxArea(self, height: List[int]) -> int:
        i = 0
        j = len(height) - 1
        answer = 0

        while i < j:
            area = min(height[i], height[j]) * (j - i)
            answer = max(area, answer)

            if height[i] < height[j]:
                i += 1
            else:
                j -= 1

        return answer


s = Solution()
print(s.maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]))  # 49
print(s.maxArea([1, 1]))  # 1
