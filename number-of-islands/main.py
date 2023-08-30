from typing import List

LAND = "1"
WATER = "0"
DIRECTIONS = [(0, 1), (0, -1), (1, 0), (-1, 0)]


class Solution:
    # METHOD 1 - USE DFS
    # Traverse the grid.  Every time we see LAND,
    # Update that square (and all connected to it) to WATER
    # This eliminates 1 island.  Continue.
    def numIslands(self, grid: List[List[str]]) -> int:
        if grid is None or len(grid) == 0:
            return 0

        self.m = len(grid)
        self.n = len(grid[0])
        self.grid = grid
        answer = 0

        for i in range(self.m):
            for j in range(self.n):
                if self.grid[i][j] == LAND:
                    answer += 1
                    self.dfs(i, j)

        return answer

    def dfs(self, i: int, j: int):
        if i < 0 or j < 0 or i >= self.m or j >= self.n or self.grid[i][j] != LAND:
            return

        self.grid[i][j] = WATER
        for direction in DIRECTIONS:
            self.dfs(i + direction[0], j + direction[1])


s = Solution()
print(
    s.numIslands(
        grid=[
            ["1", "1", "1", "1", "0"],
            ["1", "1", "0", "1", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "0", "0", "0"],
        ]
    )
)  # 1

print(
    s.numIslands(
        grid=[
            ["1", "1", "0", "0", "0"],
            ["1", "1", "0", "0", "0"],
            ["0", "0", "1", "0", "0"],
            ["0", "0", "0", "1", "1"],
        ]
    )
)  # 3
