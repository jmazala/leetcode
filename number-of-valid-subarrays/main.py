# https://leetcode.com/problems/number-of-valid-subarrays/description/


from typing import List


class Solution:
    # METHOD 1 - Monotonic stack
    # On the stock, store all possible left bounds of valid subarrays
    # ending at current num
    # Pop as needed (larger elements or stack is empty)
    # Increment answer by length of stack (that's how many subarrays there are)
    # TIME: O(2n) = O(n)
    #   O(n) to iterate through nums
    #   O(n) to pop (at most) when the last element is the smallest
    # SPACE: O(n) for stack
    def validSubarrays(self, nums: List[int]) -> int:
        stack = []
        answer = 0

        for num in nums:
            while stack and stack[-1] > num:
                stack.pop()

            stack.append(num)
            answer += len(stack)

        return answer


s = Solution()
print(s.validSubarrays([1, 4, 2, 5, 3]))  # 11
print(s.validSubarrays([3, 2, 1]))  # 3
print(s.validSubarrays([2, 2, 2]))  # 6


"""
stack = []
all possible left bounds for subarrays with rightbound current num

Mono stack means keep popping elements that are larger

start with 1
stack = [1]
answer += 1 = 1

4
stack = [1,4]
answer += 2 = 3

2
pop 4
stack = [1,2]
answer += 2 = 5

5
stack = [1,2,5]
answer += 3 = 8

3
pop 5
stack = [1,2,3]
answer += 3 = 11
"""
