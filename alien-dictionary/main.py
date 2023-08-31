# https://leetcode.com/problems/alien-dictionary/

from collections import defaultdict
from typing import List


class Solution:
    # METHOD 1 - TOPOLOGICAL SORT
    # Have char counts and adjacencies maps
    # Iterate through each pair of words, and find the first non-matching char
    # When you find a mismatching char, you've found an adjacency
    # Since the words are already sorted in lexographical order, c2 must come after c1 (dependency)
    def alienOrder(self, words: List[str]) -> str:
        # build a graph / adjacency list for each character
        counts = defaultdict(int)
        adjacencies = defaultdict(list)

        # first start with the entire character set amongst all words
        for word in words:
            for c in word:
                counts[c]

        # go through each pair of words and find the first char mismatch
        for i in range(0, len(words) - 1):
            [word1, word2] = [words[i], words[i + 1]]

            if len(word1) > len(word2) and word2 in word1 and word1.index(word2) == 0:
                return ""

            for j in range(0, min(len(word1), len(word2))):
                c1 = word1[j]
                c2 = word2[j]

                # Add this edge to the graph
                if c1 != c2:
                    counts[c2] += 1
                    adjacencies[c1].append(c2)
                    break

        # topological sort graph
        order = []

        # start with all nodes that can only be beginners
        queue = [c for c in counts if counts[c] == 0]

        while queue:
            c = queue.pop(0)
            order.append(c)

            for neighbor in adjacencies[c]:
                counts[neighbor] -= 1
                if counts[neighbor] == 0:
                    queue.append(neighbor)

        # check if we've covered every node (character)
        return "".join(order) if len(order) == len(counts) else ""


s = Solution()
print(s.alienOrder(["ab", "adc"]))  # abcd
print(s.alienOrder(["wrt", "wrf", "er", "ettt", "rftt"]))  # "wertf"
print(s.alienOrder(["wrt", "wrf", "wrz", "er", "ettt", "rftt"]))  # "wertfz"
print(s.alienOrder(["wrt", "wrf", "wrz", "wtz", "er", "ettt", "rftt"]))  # "wertfz"
print(s.alienOrder(["z", "x"]))  # zx
print(s.alienOrder(["z", "x", "z"]))  # ""
print(
    s.alienOrder(["wrt", "wrf", "wrz", "wrlz", "er", "ettt", "rftt", "zabba", "fabba"])
)  # ""
