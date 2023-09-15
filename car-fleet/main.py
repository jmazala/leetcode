# https://leetcode.com/problems/car-fleet/


from typing import List


class Solution:
    # METHOD 1 - USE A STACK TO MAKE FLEETS
    # Sort the cars by starting position (descending)
    # This way, future cars can only catch up, but not exceed
    # If a car started behind, but speed is faster, it may catch up depending
    # on how much time to the target they have
    # Starting behind, but arriving earlier means a fleet will happen
    # Use a stack that stores remaining time
    # For each future car (starting further behind), if its time to arrival
    # Is less than the top of stack's arrival time, a fleet is formed
    # Otherwise, push to stack (implicitly signifying another fleet)
    # TIME: O(n log n)
    # SPACE: O(n)
    def carFleet(self, target: int, position: List[int], speed: List[int]) -> int:
        stack = []

        # zip(a, b, c, ...) makes an array of n-tuples of length min(len(a), len(b), len(c), len(...))
        # sorting uses tuple[0] as the parameter (in this case, position)
        for curPos, curSpeed in sorted(zip(position, speed), reverse=True):
            remainingDistance = target - curPos
            remainingTime = remainingDistance / curSpeed

            if not stack or remainingTime > stack[-1]:
                stack.append(remainingTime)

        return len(stack)


s = Solution()
print(s.carFleet(target=20, position=[6, 2, 17], speed=[3, 9, 2]))  # 2
print(s.carFleet(target=12, position=[10, 8, 0, 5, 3], speed=[2, 4, 1, 1, 3]))  # 3
print(s.carFleet(target=10, position=[3], speed=[3]))  # 1
print(s.carFleet(target=100, position=[0, 2, 4], speed=[4, 2, 1]))  # 1
