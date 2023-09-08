# https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/


from typing import List


class Solution:
    def twoSum(self, numbers: List[int], target: int) -> List[int]:
        low = 0
        high = len(numbers) - 1

        while True:
            sum = numbers[low] + numbers[high]

            if sum == target:
                return [low + 1, high + 1]

            if sum < target:
                low += 1
                continue

            high -= 1

        return [-1, -1]


s = Solution()
print(s.twoSum(numbers=[2, 7, 11, 15], target=9))  # [1, 2]
print(s.twoSum(numbers=[2, 3, 4], target=6))  # [1, 3]
print(s.twoSum(numbers=[-1, 0], target=-1))  # [1, 2]
