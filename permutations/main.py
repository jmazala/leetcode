from typing import List

class Solution:
  answer = []
    
  def permute(self, nums: List[int]) -> List[List[int]]:
    if nums is None or len(nums) == 0:
      return self.answer
    self.permutations([], nums)
    return self.answer
      
  def permutations(self, current, remaining):
    if (len(remaining)) == 0:
      self.answer.append(current.copy())
      return
    
    for i in range(len(remaining)):
      current.append(remaining[i])
      self.permutations(current, remaining[:i] + remaining[i+1:])
      current.pop()

if __name__ == '__main__':
  s = Solution()
  print(s.permute([1,2,3]))