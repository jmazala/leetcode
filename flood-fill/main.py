from typing import List

class Solution:
  def floodFill(self, image: List[List[int]], sr: int, sc: int, newColor: int) -> List[List[int]]:
    M = len(image)
    if (M == 0):
      return image
    
    N = len(image[0])
    if (N == 0):
      return image

    originalColor = image[sr][sc]
    if (newColor == originalColor):
      return image
    
    queue = [[sr, sc]]

    directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]

    while len(queue) > 0:
      coord = queue.pop()
      sr = coord[0]
      sc = coord[1]
      image[sr][sc] = newColor
      
      for direction in directions:
        nextR = sr + direction[0]
        nextC = sc + direction[1]
        if (nextR < 0 or nextC < 0 or nextR >= M or nextC >= N or image[nextR][nextC] != originalColor):
          continue
      
        queue.append([nextR, nextC])
    
    return image

if __name__ == '__main__':
  s = Solution()
  # print(s.floodFill([[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2)) #[[2,2,2],[2,2,0],[2,0,1]]
  print(s.floodFill([[0,0,0],[0,1,1]], 1, 1, 1))