from typing import List

class Solution:
  #DP TOP DOWN
  def maxUncrossedLines(self, A: List[int], B: List[int]) -> int:
    dp = [[0 for _ in range(len(B) + 1)] for _ in range(len(A) + 1)]
    
    for a in range(1, len(A) + 1):
      curA = A[a - 1]
      for b in range(1, len(B) + 1):
        curB = B[b - 1]
    
        if curA == curB:
          dp[a][b] = 1 + dp[a-1][b-1]
        else:
          dp[a][b] = max(dp[a-1][b], dp[a][b-1])
    
    return dp[len(A)][len(B)]
         
  #DP BOTTOM UP
  # def maxUncrossedLines(self, A: List[int], B: List[int]) -> int:
  #   dp = [[0 for _ in range(len(B) + 1)] for _ in range(len(A) + 1)]
    
  #   for a in range(len(A) - 1, -1, -1):
  #     curA = A[a]
  #     for b in range(len(B) - 1, -1, -1):
  #       curB = B[b]
        
  #       if curA == curB:
  #         dp[a][b] = 1 + dp[a+1][b+1]
  #       else:
  #         dp[a][b] = max(dp[a+1][b], dp[a][b+1])

  #   return dp[0][0]
    
  #RECURSION + MEMOIZATION
  # def maxUncrossedLines(self, A: List[int], B: List[int]) -> int:
  #   memo = [[-1 for _ in range(len(B))] for _ in range(len(A))]
  #   return self.helper(A, B, 0, 0, memo)

  # def helper(self, A: List[int], B: List[int], a: int, b: int, memo: List[List[int]]) -> int:
  #   #base case
  #   if a == len(A) or b == len(B):
  #     return 0
    
  #   #memoization
  #   if memo[a][b] > -1:
  #     return memo[a][b]
    
  #   #they match.  draw a line
  #   if A[a] == B[b]:
  #     memo[a][b] = 1 + self.helper(A, B, a + 1, b + 1, memo)
  #   else:
  #     memo[a][b] = max(self.helper(A, B, a + 1, b, memo), self.helper(A, B, a, b + 1, memo))
    
  #   return memo[a][b]