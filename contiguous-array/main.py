from typing import List

class Solution:
  def findMaxLength(self, nums: List[int]) -> int:
    if len(nums) < 2:
      return 0

    # iterate through the array with a counter
    # whenever the counter reaches a number we've seen before mark the length
    lowestIndexForCount = {}
    lowestIndexForCount[0] = -1
    maxLength = 0
    currentCount = 0

    for i in range(len(nums)):
      if nums[i] == 0:
        currentCount -= 1
      else:
        currentCount += 1

      # this means we've seen this count before, so in between those indices
      # the score is 0
      if currentCount in lowestIndexForCount:
        maxLength = max(maxLength, i - lowestIndexForCount[currentCount])
      else:
        lowestIndexForCount[currentCount] = i

    return maxLength

if __name__ == '__main__':
  s = Solution()
  print(s.findMaxLength([0,0])) #0
  print(s.findMaxLength([1, 1, 1, 1, 1, 1, 1])) #0
  print(s.findMaxLength([0, 1, 0, 0, 1, 0, 0, 1, 0, 1])) #6