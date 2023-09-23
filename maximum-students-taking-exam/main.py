# https://leetcode.com/problems/maximum-students-taking-exam/description/

import collections
from typing import List

BROKEN = "#"
FILLED = "F"
OPEN = "."
LEFT = [0, -1]
RIGHT = [0, 1]
FRONT = [-1, 0]
BEHIND = [1, 0]
FRONT_LEFT = [-1, -1]
FRONT_RIGHT = [-1, 1]
BEHIND_LEFT = [1, -1]
BEHIND_RIGHT = [1, 1]

VIEWABLE_DIRECTIONS = [LEFT, RIGHT, FRONT_LEFT, FRONT_RIGHT]
BLIND_DIRECTIONS = [FRONT, BEHIND]


class Solution:
    # METHOD 1 - DFS (TLE)
    def maxStudents(self, seats: List[List[str]]) -> int:
        self.m = len(seats)
        self.n = len(seats[0])
        return self.helper(0, 0, seats, 0)

    def helper(self, i, j, seats, filled) -> int:
        if i == -1 and j == -1:
            return filled

        [nextI, nextJ] = self.getNextSeat(i, j)
        if seats[i][j] != OPEN:
            return self.helper(nextI, nextJ, seats, filled)

        maxFilled = filled

        if self.canFill(seats, i, j):
            seats[i][j] = FILLED
            maxFilled = max(maxFilled, self.helper(nextI, nextJ, seats, filled + 1))
            seats[i][j] = OPEN

        maxFilled = max(maxFilled, self.helper(nextI, nextJ, seats, filled))

        return maxFilled

    def canFill(self, seats, i, j):
        for [dI, dJ] in VIEWABLE_DIRECTIONS:
            [nextI, nextJ] = [i + dI, j + dJ]
            if nextI < 0 or nextJ < 0 or nextI >= self.m or nextJ >= self.n:
                continue

            if seats[nextI][nextJ] == FILLED:
                return False

        return True

    def getNextSeat(self, i, j) -> List[int]:
        if j < self.n - 1:
            return [i, j + 1]

        i += 1
        if i == self.m:
            return [-1, -1]

        return [i, 0]

    # METHOD 2 - BITMASK
    # When you have a certain row, only other certain rows can come after it
    def maxStudents(self, seats: List[List[str]]) -> int:
        m = len(seats)
        n = len(seats[0])
        dp = [collections.defaultdict(int) for _ in range(m + 1)]

        # dp[i][j] = max # of students that can sit in row i with seating arrangement j
        # "top" row (placeholder) is considered empty.  That way any arrangement for the real top row is valid
        # in python you can put that at index -1 because lists wrap around (clever)
        dp[-1][0] = 0

        # convert each initial row to 1's and 0's (1 = empty seat)
        bits = []
        for row in seats:
            num = 0
            for j, status in enumerate(row):
                num += (status == OPEN) << n - j - 1

            bits.append(num)

        # There (2^n combinations filled / not filled) per row where n is # of seats in that row
        # For every row, filter every possible seating arrangement for validity
        # Based on the empty seats in the original classroom
        # Try to fill every combination of seats, and compare against every combination from the row in front

        for row in range(m):
            for curRowSeating in range(2**n):
                # look for consecutive bits
                if (
                    curRowSeating & (curRowSeating >> 1) != 0
                ):  # consecutive students is invalid
                    continue

                if (
                    curRowSeating & bits[row] != curRowSeating
                ):  # filling a non-empty seat is invalid
                    continue

                for rowInFrontSeating in dp[row - 1]:
                    # check upper left and upper right
                    if (
                        curRowSeating & (rowInFrontSeating >> 1) == 0
                        and (curRowSeating >> 1) & rowInFrontSeating == 0
                    ):
                        dp[row][curRowSeating] = max(
                            dp[row][curRowSeating],
                            dp[row - 1][rowInFrontSeating]
                            + bin(curRowSeating).count("1"),
                        )

        return max(dp[m - 1][x] for x in dp[m - 1])


s = Solution()
print(
    s.maxStudents(
        seats=[
            ["#", ".", "#", "#", ".", "#"],
            [".", "#", "#", "#", "#", "."],
            ["#", ".", "#", "#", ".", "#"],
        ]
    )
)  # 4
