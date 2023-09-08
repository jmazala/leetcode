# https://leetcode.com/problems/trapping-rain-water/
from typing import List


class Solution:
    # def trap(self, height: List[int]) -> int:
    #     maxHeights = [0] * len(heights)
    #     leftMax = 0

    #     # calculate left max for each point
    #     for i in range(len(heights)):
    #         maxHeights[i] = leftMax
    #         leftMax = max(leftMax, heights[i])

    #     rightMax = 0
    #     # calculate min of left/right max for each point
    #     # also calculate water above this point
    #     for i in reversed(range(len(heights))):
    #         minHeight = min(rightMax, maxHeights[i])
    #         height = heights[i]

    #         if height < minHeight:
    #             maxHeights[i] = minHeight - height
    #         else:
    #             maxHeights[i] = 0

    #         rightMax = max(rightMax, height)

    #     return sum(maxHeights)

    def trap(self, height: List[int]) -> int:
        left = 0
        right = len(height) - 1
        trapped = 0
        left_max = 0
        right_max = 0

        while left < right:
            # Can only add water on top of left pointer
            if height[left] < height[right]:
                # Can't add water
                if height[left] >= left_max:
                    left_max = height[left]

                # Bounded by a higher wall to the left (and the right bc of initial if condition)
                else:
                    trapped += left_max - height[left]

                left += 1
            else:  # Can only add water on top of right pointer
                # Can't add water
                if height[right] >= right_max:
                    right_max = height[right]
                # Bounded by a higher wall to the right (and to the left, see above)
                else:
                    trapped += right_max - height[right]

                right -= 1

        return trapped


s = Solution()
print(s.trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))  # 6
