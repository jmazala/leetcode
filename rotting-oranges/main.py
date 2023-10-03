import collections
from typing import List


class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        FRESH = 1
        ROTTEN = 2
        DIRECTIONS = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        n = len(grid)
        m = len(grid[0])
        freshCount = 0
        queue = collections.deque()
        minutes = 0

        for i in range(n):
            for j in range(m):
                if grid[i][j] == ROTTEN:
                    queue.append((i, j))
                elif grid[i][j] == FRESH:
                    freshCount += 1

        if freshCount == 0:
            return 0

        while len(queue) > 0:
            size = len(queue)
            minutes += 1

            for _ in range(size):
                i, j = queue.popleft()

                for dI, dJ in DIRECTIONS:
                    nextI = dI + i
                    nextJ = dJ + j

                    if nextI < 0 or nextJ < 0 or nextI == n or nextJ == m:
                        continue

                    if grid[nextI][nextJ] == FRESH:
                        freshCount -= 1
                        if freshCount == 0:
                            return minutes

                        queue.append((nextI, nextJ))
                        grid[nextI][nextJ] = ROTTEN

        return -1


solution = Solution()
grid = [[2, 1, 1], [0, 1, 1], [1, 0, 1]]
print(solution.orangesRotting(grid))
