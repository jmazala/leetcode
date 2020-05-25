class Solution:
  def minPathSum(self, grid: List[List[int]]) -> int:
    M = len(grid)
    if (M == 0):
      return 0

    N = len(grid[0])
    if (N == 0):
      return 0

    dp = [[None for _ in range(N)] for _ in range(M)]
    dp[0][0] = grid[0][0]

    #can only move directly to the right on 0th row
    for j in range(1, N):
      dp[0][j] = dp[0][j-1] + grid[0][j]

    #can only move directly down on 0th col
    for i in range(1, M):
      dp[i][0] = dp[i-1][0] + grid[i][0]

    for i in range(1, M):
      for j in range(1, N):
        dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])

    return dp[M-1][N-1]
        