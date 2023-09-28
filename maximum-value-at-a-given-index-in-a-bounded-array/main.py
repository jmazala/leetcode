# https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array/description/


class Solution:
    def maxValue(self, n: int, index: int, maxSum: int) -> int:
        low = 1
        high = maxSum

        while low < high:
            mid = (low + high + 1) // 2
            sum = self.place(mid, n, index)

            if sum <= maxSum:
                low = mid
            elif sum > maxSum:
                high = mid - 1

        return low

    # PRODUCES TLE
    # def place(self, mid, n, index):
    #     arr = [None] * n
    #     arr[index] = mid

    #     # fill in left
    #     for i in range(index - 1, -1, -1):
    #         if arr[i + 1] > 1:
    #             arr[i] = arr[i + 1] - 1
    #         else:
    #             arr[i] = 1

    #     # fill in right
    #     for i in range(index + 1, n):
    #         if arr[i - 1] > 1:
    #             arr[i] = arr[i - 1] - 1
    #         else:
    #             arr[i] = 1

    #     return sum(arr)

    # STILL TLE (but no array building)
    # def place(self, mid, n, index):
    #     val = mid
    #     sum = mid

    #     # left side
    #     for _ in range(index - 1, -1, -1):
    #         if val > 1:
    #             val -= 1

    #         sum += val

    #     # right side
    #     val = mid
    #     for _ in range(index + 1, n):
    #         if val > 1:
    #             val -= 1

    #         sum += val

    #     return sum

    # Using mathematical formula to calculate in O(1)
    def place(self, value, n, index):
        count = 0

        # on the left
        # if value > index, there are index + 1 numbers in the arithmetic sequence
        # [value - index, ... , value - 1, value]
        # else, there are value numbers in arithmetic sequence
        # [1, 2, ... , value - 1, value] + sequence of length (index - value + 1) of all 1's
        if value > index:
            count += (value + value - index) * (index + 1) // 2
        else:
            count += (value + 1) * value // 2 + index - value + 1

        # on the right
        # if value >= n - index, there are n - index numbers in the arithmetic sequence
        # [value, value - 1, ... , value - n + 1 + index]
        # otherwise, value numbers in the arithmetic sequence
        # [value, value - 1, ..., 1] plus a sequence of length (n - index - value) of 1's
        if value >= n - index:
            count += (value + value - n + 1 + index) * (n - index) // 2
        else:
            count += (value + 1) * value // 2 + n - index - value

        return count - value


s = Solution()
print(s.maxValue(4, 2, 6))  # 2
print(s.maxValue(6, 1, 10))  # 3
print(s.maxValue(3, 2, 18))  # 7
print(s.maxValue(4, 0, 4))  # 1
