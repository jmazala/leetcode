LAND = '0'
WATER = '1'
DIRECTIONS = [(0, 1), (0, -1), (1, 0), (-1, 0)]


class Solution:
    M = None
    N = None
    grid = None

    def numIslands(self, grid: List[List[str]]) -> int:
        if (grid is None or len(grid) == 0):
            return 0

        answer = 0

        self.M = len(grid)
        self.N = len(grid[0])
        self.grid = grid

        for i in range(self.M):
            for j in range(self.N):
                if self.grid[i][j] == WATER:
                    answer += 1
                    self.dfs(i, j)

        return answer

    def dfs(self, i: int, j: int):
        if (i < 0 or j < 0 or i >= self.M or j >= self.N or self.grid[i][j] != WATER):
            return

        self.grid[i][j] = LAND
        for direction in DIRECTIONS:
            self.dfs(i + direction[0], j + direction[1])
