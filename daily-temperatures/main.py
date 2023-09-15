from typing import List

# https://leetcode.com/problems/daily-temperatures/editorial/


class Solution:
    # METHOD 1 - USE A STACK
    # This is a monotonic stack as it remains sorted
    # Any item on the stack is waiting for a warmer temperature day
    # Iterate through temperatures / days, and keep popping off the stack
    # If current day is warmer than top of stack
    # When you pop, update the answer since we found a warmer day
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        answer = [0] * len(temperatures)
        stack = []

        for i, temp in enumerate(temperatures):
            while stack and temperatures[stack[-1]] < temp:
                prev = stack.pop()
                answer[prev] = i - prev

            stack.append(i)

        return answer


s = Solution()
print(s.dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]))  # [1, 1, 4, 2, 1, 1, 0, 0]
print(s.dailyTemperatures([30, 40, 50, 60]))  # [1, 1, 1, 0]
print(s.dailyTemperatures([30, 60, 90]))  # [1, 1, 0]
