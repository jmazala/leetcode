from typing import List

class Solution:
  def countSquares(self, matrix: List[List[int]]) -> int:
    M = len(matrix)
    if (M == 0):
      return 0
    
    N = len(matrix[0])
    if (N == 0):
      return 0
    
    answer = 0
    for i in range(M):
      for j in range(N):
        if matrix[i][j] == 0:
            continue
        
        #left, up, diagonal-left
        if (i > 0 and j > 0):
          matrix[i][j] += min(matrix[i][j-1], matrix[i-1][j], matrix[i-1][j-1])
          
        answer += matrix[i][j]
    
    return answer
                
if __name__ == '__main__':
  s = Solution()
  matrix = [
  [0,1,1,1],
  [1,1,1,1],
  [0,1,1,1]
]
  
  matrix2 = [
    [1,0,1],
    [1,1,0],
    [1,1,0]
  ]
  
  print(s.countSquares(matrix)) #15
  print(s.countSquares(matrix2)) #7
                
        
        