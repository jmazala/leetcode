# The isBadVersion API is already defined for you.
# @param version, an integer
# @return a bool
# def isBadVersion(version):


class Solution:
    def __init__(self, badVersion: int):
        self.badVersion = badVersion
        return

    def __isBadVersion(self, version: int) -> bool:
        return version == self.badVersion

    def firstBadVersion(self, n: int) -> int:
        """
        :type n: int
        :rtype: int
        """
        # binary search for the bad version
        low = 1
        high = n

        while (low < high):
            mid = low + (high - low) // 2
            if (self.__isBadVersion(mid)):
                high = mid
            else:
                low = mid + 1

        return low


if __name__ == '__main__':
    for i in range(1, 7):
        s = Solution(i)
        print(s.firstBadVersion(i))  # i
