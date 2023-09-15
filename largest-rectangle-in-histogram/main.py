# https://leetcode.com/problems/largest-rectangle-in-histogram/
from typing import List


class Solution:
    # METHOD 1 - USE A STACK
    # Stack indices of increasing heights onto the stack until you either:
    #   1 - find a height lower than top of stack's height (first decreasing)
    #   2 - reach the end of the heights
    # This signifies you can do area calculations since you don't have to look
    # For higher (or equal height) buildings anymore
    # Then you can do calculations (all heights greater or equal to your current height)
    # With height (height of popped stack item) and width (index of next stack item)
    # The -1 is used as a placeholder to signify the entire width of buildings
    def largestRectangleArea(self, heights: List[int]) -> int:
        answer = heights[0]
        stack = [-1]

        for i in range(len(heights)):
            # We have a lower building height.  So we can do calculations
            # Of every previous taller building
            while stack[-1] != -1 and heights[stack[-1]] >= heights[i]:
                curHeight = heights[stack.pop()]
                curWidth = i - stack[-1] - 1
                answer = max(answer, curHeight * curWidth)

            stack.append(i)

        # Clear the stack once we've reached the end and do all
        # final calculatinos (no more buildings to see)
        while stack[-1] != -1:
            curHeight = heights[stack.pop()]
            curWidth = len(heights) - stack[-1] - 1
            answer = max(answer, curHeight * curWidth)

        return answer


s = Solution()
print(s.largestRectangleArea([6, 7, 5, 2, 4, 5, 9, 3]))  # 16
print(s.largestRectangleArea(heights=[2, 1, 5, 6, 2, 3]))  # 10
