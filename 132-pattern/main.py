# https://leetcode.com/problems/132-pattern/description/


from typing import List


class Solution:
    # METHOD 1 - RECURSION + MEMOIZATION (TLE)
    def find132pattern(self, nums: List[int]) -> bool:
        if len(nums) < 3:
            return False

        memo = {}

        for i in range(len(nums) - 1):
            if self.helper(i, i + 1, len(nums) - 1, nums, memo):
                return True

        return False

    def helper(self, i, j, k, nums, memo):
        if (i, j, k) in memo:
            return memo[(i, j, k)]

        while k > j:
            if nums[k] <= nums[i]:
                k -= 1
                continue

            if nums[j] <= nums[i]:
                j += 1
                continue

            if nums[k] < nums[j]:
                return True

            return self.helper(i, j + 1, k, nums, memo) or self.helper(
                i, j, k - 1, nums, memo
            )

        memo[(i, j, k)] = False
        return False

    # METHOD 2 - STACK
    # Find the best nums[i] value corresponding to every nums[j] value
    # i.e. find the minimum element found til the jth element which acts as nums[i] for current nums[j]
    # Maintain those values in a min array.  So min[j] refers to best nums[i] for a nums[j]
    # Then try to find your best values for j (while storing potential values for K on a stack)
    # Iterating the array from right to left
    # If nums[j] <= minI[j], it's not possible.  j--
    # If the top of the stack is <= minI[j], it's not possible, stack.pop()
    # If the top of the stack is > nums[j], you've found a 132 pattern winner
    # TIME: O(n)
    #   O(n) to create minI
    #   O(n) to traverse for j
    #   O(n) for stack because At most n elements can be pushed / popped
    # SPACE: O(n)
    #   O(n) for minI
    #   O(n) for stack
    def find132pattern(self, nums: List[int]) -> bool:
        if len(nums) < 3:
            return False

        minI = [-1] * len(nums)
        minI[0] = nums[0]
        for i in range(1, len(nums)):
            minI[i] = min(minI[i - 1], nums[i])

        stack = []

        # only need to iterate down through index 1 as j cannot be 0 (need room for i)
        for j in range(len(nums) - 1, 0, -1):
            if nums[j] <= minI[j]:  # nums[j] is ineligible
                continue

            while stack and stack[-1] <= minI[j]:  # nums[k] is ineligible
                stack.pop()

            if stack and stack[-1] < nums[j]:  # all criteria has been met
                return True

            stack.append(nums[j])  # push a possible nums[k] onto the stack, keep going

        return False


s = Solution()
print(s.find132pattern([]))  # False
print(s.find132pattern([1]))  # False
print(s.find132pattern([1, 1]))  # False
print(s.find132pattern([1, 1, 1]))  # False
print(s.find132pattern([1, 2, 3]))  # False
print(s.find132pattern([2, 1, 3]))  # False
print(s.find132pattern([1, 2, 3, 4]))  # False
print(s.find132pattern([1, 0, 1, -4, -3]))  # False
print(s.find132pattern([1, 3, 2]))  # True
print(s.find132pattern([3, 1, 4, 2]))  # True
print(s.find132pattern([-1, 3, 2, 0]))  # True
print(s.find132pattern([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2]))  # True
print(s.find132pattern([-2, 1, 2, -2, 1, 2]))  # True
