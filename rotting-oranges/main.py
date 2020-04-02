from typing import List
import collections

class Solution:
  def orangesRotting(self, grid: List[List[int]]) -> int:
    EMPTY = 0
    FRESH = 1
    ROTTEN = 2
    freshCount = 0

    directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    N = len(grid)
    M = len(grid[0])
    queue = collections.deque()
    answer = 0
    firstRun = True

    for i in range(N):
      for j in range(M):
        if grid[i][j] == ROTTEN:
          queue.append((i,j))
        elif grid[i][j] == FRESH:
            freshCount += 1
    
    while len(queue) > 0:
      numNodes = len(queue)
      while numNodes > 0:
        i, j = queue.popleft()
        numNodes -= 1

        for (iMod, jMod) in directions:
          newI = iMod + i
          newJ = jMod + j

          if (newI < 0 or newJ < 0 or newI >= N or newJ >= M):
            continue
          
          if grid[newI][newJ] == FRESH:
            queue.append((newI, newJ))
            grid[newI][newJ] = ROTTEN
            freshCount -= 1
          
      if firstRun:
        firstRun = False
      else:
        answer += 1

    return answer if freshCount == 0 else -1

if __name__ == '__main__':
  solution = Solution()
  grid = [[2,1,1],[0,1,1],[1,0,1]]
  print(solution.orangesRotting(grid))