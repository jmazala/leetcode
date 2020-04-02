from typing import List
class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        i = 0
        j = 0

        RIGHT = 0
        DOWN = 1
        UP = 2
        LEFT = 3
        answer = [[-1 for _ in range(n)] for _ in range(n)]
        numDigits = n * n
        direction = RIGHT

        for x in range(1, numDigits + 1):
          # print("%d,%d | %d left"% (i,j, numDigits))
          answer[i][j] = x

          if direction == RIGHT:
            if (j == n-1 or answer[i][j+1] > -1):
              direction = DOWN
              i += 1
            else:
              j += 1
          
          elif direction == DOWN:
            if (i == n-1 or answer[i+1][j] > -1):
              direction = LEFT
              j -= 1
            else:
              i += 1
          
          elif direction == LEFT:
            if (j == 0 or answer[i][j-1] > -1):
              direction = UP
              i -= 1
            else:
              j -= 1
          
          elif direction == UP:
            if (i == 0 or answer[i-1][j] > -1):
              direction = RIGHT
              j += 1
            else:
              i -= 1

        return answer

if __name__ == '__main__':
  solution = Solution()
  print(solution.generateMatrix(3))