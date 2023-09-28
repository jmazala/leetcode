# https://leetcode.com/problems/max-area-of-island/

from typing import List

LAND = 1
PROCESSED = 2

DIRECTIONS = [(1, 0), (-1, 0), (0, 1), (0, -1)]


class Solution:
    def maxAreaOfIsland(self, grid: List[List[int]]) -> int:
        maxArea = 0
        m = len(grid)
        n = len(grid[0])

        for i in range(m):
            for j in range(n):
                maxArea = max(maxArea, self.dfs(i, j, grid, m, n))

        return maxArea

    def dfs(self, i, j, grid, m, n):
        if grid[i][j] != LAND:
            return 0

        size = 1
        grid[i][j] = PROCESSED

        for dI, dJ in DIRECTIONS:
            nextI, nextJ = (i + dI, j + dJ)
            if nextI < 0 or nextJ < 0 or nextI >= m or nextJ >= n:
                continue

            size += self.dfs(nextI, nextJ, grid, m, n)

        return size
