# https://leetcode.com/problems/valid-anagram/


from collections import defaultdict


class Solution:
    # METHOD 1 - sort
    # 50ms / 17.4MB
    def isAnagram(self, s: str, t: str) -> bool:
        return sorted(s) == sorted(t)

    # METHOD 2 - Hash (WINNER)
    # 45ms / 16.6MB
    def isAnagram(self, s: str, t: str) -> bool:
        sHash = defaultdict(int)
        for c in s:
            sHash[c] += 1

        tHash = defaultdict(int)
        for c in t:
            tHash[c] += 1

        for c, n in sHash.items():
            if tHash[c] != n:
                return False

        return len(sHash) == len(tHash)

    # METHOD 3 - Hash with fixed array
    # 48ms / 16.7MB
    def isAnagram(self, s: str, t: str) -> bool:
        ordA = ord("a")
        sHash = [0] * 26
        tHash = [0] * 26

        for c in s:
            sHash[ord(c) - ordA] += 1
        for c in t:
            tHash[ord(c) - ordA] += 1

        for i in range(26):
            if sHash[i] != tHash[i]:
                return False

        return True

    # METHOD 4 - Hash with fixed array, use built in compare
    # 54ms / 16.7MB
    def isAnagram(self, s: str, t: str) -> bool:
        ordA = ord("a")
        sHash = [0] * 26
        tHash = [0] * 26

        for c in s:
            sHash[ord(c) - ordA] += 1
        for c in t:
            tHash[ord(c) - ordA] += 1

        return sHash == tHash


s = Solution()
print(s.isAnagram("anagram", "nagaram"))  # True
print(s.isAnagram("rat", "car"))  # False
