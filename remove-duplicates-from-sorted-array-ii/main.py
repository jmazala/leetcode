# https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii


from typing import List


class Solution:
    # APPROACH 1 - Whenever we encounter a 3rd + element,
    # move it to the end of the array
    def removeDuplicates(self, nums: List[int]) -> int:
        curNum = nums[0]
        curCount = 1
        numSwaps = 0

        for i in range(1, len(nums)):
            if nums[i] == None:
                break

            if nums[i] != curNum:
                curNum = nums[i]
                curCount = 1
                i += 1
                continue

            if curCount == 1:
                curCount += 1
                i += 1
                continue

            while nums[i] == curNum:
                swapIndex = len(nums) - 1 - numSwaps
                moveElement(nums, i, swapIndex)
                numSwaps += 1

            curNum = nums[i]
            curCount = 1
            i += 1

        return len(nums) - numSwaps

    # APPROACH 2 - Remember the index of a duplicate element, and move desired elements there
    # TIME: O(n) for loop through nums
    # SPACE: O(1) for count / j
    def removeDuplicates(self, nums: List[int]) -> int:
        j = 1
        count = 1

        for i in range(1, len(nums)):
            # increment the count on duplicates
            if nums[i] == nums[i - 1]:
                count += 1
            else:
                # reset the count
                count = 1

            # For count <= 2, copy the element to index j
            # thus "overwriting" element at index j
            if count <= 2:  # acceptable
                nums[j] = nums[i]
                j += 1

        return j


def moveElement(nums, start, end):
    while start < end:
        swap(nums, start, start + 1)
        start += 1

    nums[end] = None


def swap(nums, i, j):
    temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp


s = Solution()
print(s.removeDuplicates([1, 1, 1]))  # 2
print(s.removeDuplicates([1, 1, 1, 2, 2, 3]))  # 5
print(s.removeDuplicates(nums=[0, 0, 1, 1, 1, 1, 2, 3, 3]))  # 7
