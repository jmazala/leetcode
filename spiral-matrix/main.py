from typing import List
class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        M = len(matrix)
        if (M == 0):
          return []
        
        N = len(matrix[0])
        i = 0
        j = 0

        RIGHT = 0
        DOWN = 1
        UP = 2
        LEFT = 3
        seen = [[False for _ in range(N)] for _ in range(M)]
        numDigits = N * M
        answer = []
        direction = RIGHT

        while (numDigits > 0):
          print("%d,%d | %d left"% (i,j, numDigits))
          seen[i][j] = True
          answer.append(matrix[i][j])
          numDigits -= 1

          if direction == RIGHT:
            if (j == N-1 or seen[i][j+1]):
              direction = DOWN
              i += 1
            else:
              j += 1
          
          elif direction == DOWN:
            if (i == M-1 or seen[i+1][j]):
              direction = LEFT
              j -= 1
            else:
              i += 1
          
          elif direction == LEFT:
            if (j == 0 or seen[i][j-1]):
              direction = UP
              i -= 1
            else:
              j -= 1
          
          elif direction == UP:
            if (i == 0 or seen[i-1][j]):
              direction = RIGHT
              j += 1
            else:
              i -= 1

        return answer

if __name__ == '__main__':
  solution = Solution()
  grid = [ [1, 2, 3, 4], [5, 6, 7, 8], [9,10,11,12]]
  print(solution.spiralOrder(grid))