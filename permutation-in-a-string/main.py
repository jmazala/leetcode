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

        if len(s2) == len(s1):
            return "".join(sorted(s1)) == "".join(sorted(s2))

        s1Map = collections.defaultdict(int)
        s2Map = collections.defaultdict(int)

        for i in range(len(s1)):
            s1Map[s1[i]] += 1
            s2Map[s2[i]] += 1

        matchesRequired = len(s1Map)
        matchesFound = 0

        for c in s1Map:
            if s1Map[c] == s2Map[c]:
                matchesFound += 1

        for i in range(len(s2) - len(s1)):
            if matchesFound == matchesRequired:
                return True

            # add / subtract chars at beginning / end of a substring of s2 with length s1
            charToRemove = s2[i]
            charToAdd = s2[i + len(s1)]

            if charToAdd in s1Map:
                s2Map[charToAdd] += 1

                # got a match
                if s2Map[charToAdd] == s1Map[charToAdd]:
                    matchesFound += 1
                # lost a match
                elif s2Map[charToAdd] == s1Map[charToAdd] + 1:
                    matchesFound -= 1

            if charToRemove in s1Map:
                s2Map[charToRemove] -= 1
                # got a match
                if s2Map[charToRemove] == s1Map[charToRemove]:
                    matchesFound += 1
                # lost a match
                elif s2Map[charToRemove] == s1Map[charToRemove] - 1:
                    matchesFound -= 1

        return matchesFound == matchesRequired


s = Solution()
print(s.checkInclusion("abc", "bbbca"))  # True
print(s.checkInclusion("adc", "dcda"))  # True
print(s.checkInclusion("ab", "eidbaooo"))  # True
print(s.checkInclusion("ab", "eidbcaooo"))  # False
