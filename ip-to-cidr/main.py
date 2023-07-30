# https://leetcode.com/problems/ip-to-cidr/

from typing import List


class Solution:
    def ipToCIDR(self, ip: str, n: int) -> List[str]:
        pass


def binaryToDecimal(num: str) -> int:
    return int(num, 2)


s = Solution()
print(s.ipToCIDR("255.0.0.7", 10))  # ["255.0.0.7/32","255.0.0.8/29","255.0.0.16/32"]
