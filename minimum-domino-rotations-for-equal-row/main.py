from typing import List
import collections

class Solution:
  def minDominoRotations(self, A: List[int], B: List[int]) -> int:
    opt1 = self.match(A, B, A[0])
    opt2 = self.match(A, B, B[0])
    opt3 = self.match(B, A, A[0])
    opt4 = self.match(B, A, B[0])

    steps = min(opt1, opt2, opt3, opt4)
    return steps if steps < (len(A) + 1) else -1

  def match(self, A: List[int], B: List[int], desired: int) -> int:
    steps = 0
    for i in range(0, len(A)):
      if (A[i] == desired):
        continue
      if (B[i] != desired):
        return len(A) + 1
      steps += 1
    
    return steps

if __name__ == '__main__':
  s = Solution()
  print(s.minDominoRotations([2,1,2,4,2,2], [5,2,6,2,3,2]))
  print(s.minDominoRotations([3,5,1,2,3], [3,6,3,3,4]))
  print(s.minDominoRotations([1,2,1,2,1,2,3], [2,1,2,1,2,1,2]))