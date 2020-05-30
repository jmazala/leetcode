from typing import List
class Solution:
  # 3 pointers.
  # TIME:  O(n log n) for sort + optimized O(n^3) for comparisons
  # SPACE:  O(x) for set / answer array where x is # of combos
  def threeSum(self, nums: List[int]) -> List[List[int]]:
    if len(nums) < 3:
      return []
    
    nums.sort()
    
    i = 0
    answer = []
    
    for i in range(len(nums) - 2):
      if nums[i] > 0:
        break

      #skip duplicates for i
      if i > 0 and nums[i-1] == nums[i]:
        continue

      j = i + 1
      k = len(nums) - 1

      while j < k:
        sum = nums[i] + nums[j] + nums[k]
        if sum == 0:
          answer.append([nums[i], nums[j], nums[k]])
          #skip duplicates for j
          while j < k -1 and nums[j] == nums[j + 1]:
            j += 1
          
          #skip duplicates for k
          while j < k - 1 and nums[k] == nums[k - 1]:
            k -= 1
          
          j += 1
          k -= 1
          continue

        if sum > 0:
          k -= 1
          continue
        
        if sum < 0:
          j += 1
    
    return answer

  #with a hash
  # def threeSum(self, nums: List[int]) -> List[List[int]]:
  #   if len(nums) < 3:
  #     return []
    
  #   twoSumHash = {}

  #   for i in range(len(nums) - 1):
  #     for j in range(i + 1, len(nums)):
  #       twoSum = nums[i] + nums[j]
  #       if twoSum not in twoSumHash:
  #         twoSumHash[twoSum] = []
        
  #       twoSumHash[twoSum].append([i, j])
    
  #   mySet = set()
  #   answer = []

  #   for i in range(len(nums)):
  #     difference = 0 - nums[i]
  #     if difference in twoSumHash:
  #       for [j, k] in twoSumHash[difference]:
  #         if i == j or i == k:
  #           continue
            
  #         entry = [nums[i], nums[j], nums[k]]
  #         entry.sort()
  #         setKey = ",".join([str(x) for x in entry])
  #         if setKey in mySet:
  #           continue
            
  #         answer.append(entry)
  #         mySet.add(setKey)

  #   return answer

if __name__ == '__main__':
  s = Solution()
  print(s.threeSum([-1, 0, 1, 2, -1, -4])) #[[-1, -1, 2], [-1, 0, 1]]