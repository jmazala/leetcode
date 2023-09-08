# https://leetcode.com/problems/permutation-in-string/description/


import collections


class Solution:
    # SLIDING WINDOW
    # Expand window until it's of length len(s1) and then start checking char counts
    # TIME: O(n2 * n1)
    # O(n1) to build s1 char map and part of s2 char map
    # O(n2) to loop through the rest of s2
    #   O(n2 + n1) to check for equality
    # SPACE: O(n1) for char maps
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s2) < len(s1):
            return False

        if len(s2) == len(s1):
            return "".join(sorted(s1)) == "".join(sorted(s2))

        # check all substrings of length s1
        # if the char count counts are equal, accept the substring
        s1Map = collections.defaultdict(int)
        s2Map = collections.defaultdict(int)

        for i in range(len(s1)):
            s1Map[s1[i]] += 1
            s2Map[s2[i]] += 1

        for i in range(len(s1), len(s2)):
            if Solution.dictEqual(s1Map, s2Map):
                return True

            cAdd = s2[i]
            s2Map[cAdd] += 1

            cRemove = s2[i - len(s1)]
            s2Map[cRemove] -= 1
            if s2Map[cRemove] == 0:
                del s2Map[cRemove]

        return Solution.dictEqual(s1Map, s2Map)

    @staticmethod
    def dictEqual(d1: dict, d2: dict) -> bool:
        for k in d1:
            if k not in d2 or d1[k] != d2[k]:
                return False

        return len(d1) == len(d2)

    # We can do better by keeping track of the number of chars we need to have equality for
    # This makes the checkEquality (dictEqual) go from O(n1) to O(1)
    # TIME: O(n2)
    # SPACE: O(n2 + n1)
    # The leetcode problem statement limits this to lowercase letters
    # This function I wrote below works for all chars
    # Otherwise, I would use a 26 length array (because 26 lowercase characters)
    # and index by subtracting 'a' to reduce the O(1) time lookup
    # However, if that was the case we'd have to store
    # int values for every char in S2. (26 * 424 bits).  I got this by running
    # sys.getsizeof(int) in python3 command line.
    # I experimented further, and it's roughly 7 unique characters in s1 where
    # using an array is better.
    # That would still be O(1) space and O(1) time because 26 letters
    # But the dict might take up less space depending on distribution
    # of letters in S2.  It's a trade off.
    def checkInclusion(self, s1: str, s2: str) -> bool:
        if len(s2) < len(s1):
            return False

        s1Map = collections.defaultdict(int)
        s2Map = collections.defaultdict(int)

        for i in range(len(s1)):
            c1 = s1[i]
            s1Map[c1] += 1

        for i in range(len(s1)):
            c2 = s2[i]
            if c2 in s1Map:
                s2Map[c2] += 1

        matchesRequired = len(s1Map)
        for char, count in s1Map.items():
            if s2Map[char] == count:
                matchesRequired -= 1

        windowSize = len(s1)
        for left in range(len(s2) - len(s1)):
            if matchesRequired == 0:
                return True

            right = left + windowSize
            toRemove = s2[left]
            toAdd = s2[right]

            if toAdd in s2Map:
                s2Map[toAdd] += 1

                # Gained a match
                if s2Map[toAdd] == s1Map[toAdd]:
                    matchesRequired -= 1
                # Lost a match
                elif s2Map[toAdd] == s1Map[toAdd] + 1:
                    matchesRequired += 1

            if toRemove in s2Map:
                s2Map[toRemove] -= 1

                # Gained a match
                if s2Map[toRemove] == s1Map[toRemove]:
                    matchesRequired -= 1
                # Lost a match
                elif s2Map[toRemove] == s1Map[toRemove] - 1:
                    matchesRequired += 1

        return matchesRequired == 0


s = Solution()
print(s.checkInclusion("abc", "bbbca"))  # True
print(s.checkInclusion("adc", "dcda"))  # True
print(s.checkInclusion("ab", "eidbaooo"))  # True
print(s.checkInclusion("ab", "eidbcaooo"))  # False
