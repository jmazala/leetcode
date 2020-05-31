from typing import List

class Solution:
  #WITH 2 POINTERS
  def removeDuplicates(self, nums: List[int]) -> int:
    if len(nums) < 2:
      return len(nums)
    
    i = 0

    for j in range(1, len(nums)):
      if nums[i] != nums[j]:
        i += 1
        [nums[i], nums[j]] = [nums[j], nums[i]]
    
    return i + 1

  #WITH A SET
  # def removeDuplicates(self, nums: List[int]) -> int:
  #   if len(nums) < 2:
  #     return len(nums)
    
  #   i = 0
  #   j = 1
  #   seen = set()
    
  #   while j < len(nums):
  #     seen.add(nums[i])
    
  #     while j < len(nums) and nums[j] in seen:
  #       j += 1

  #     if j == len(nums):
  #       break

  #     i += 1
  #     [nums[i], nums[j]] = [nums[j], nums[i]]
  #     j += 1
    
  #   return i + 1

s = Solution()
arr1 = [1, 1, 2]
ans1 = s.removeDuplicates(arr1)
print("(%d) - " % ans1, arr1[:ans1]) #(2) - [1, 2]

arr2 = [0,0,1,1,1,2,2,3,3,4]
ans2 = s.removeDuplicates(arr2)
print("(%d) - " % ans2, arr2[:ans2]) #(5) - [0, 1, 2, 3, 4]

arr3 = []
ans3 = s.removeDuplicates(arr3)
print("(%d) - " % ans3, arr3[:ans3]) #(0) - []

arr4 = [0]
ans4 = s.removeDuplicates(arr4)
print("(%d) - " % ans4, arr4[:ans4]) #(0) - [1]

arr5 = [1,1]
ans5 = s.removeDuplicates(arr5)
print("(%d) - " % ans5, arr5[:ans5]) #(1) - [1]