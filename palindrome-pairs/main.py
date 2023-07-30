# https://leetcode.com/problems/palindrome-pairs/editorial/

import collections
from typing import List


class Solution:
    # BRUTE FORCE
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        output = []

        for i in range(len(words)):
            word1 = words[i]

            for j in range(i + 1, len(words)):
                word2 = words[j]

                if isPalindrome(word1 + word2):
                    output.append([i, j])

                if isPalindrome(word2 + word1):
                    output.append([j, i])

        return output

    # CONSIDER WHAT CAN MAKE A PALINDROME A PALINDROME
    # If a pair of words are the same length, only reversals of each other can work
    # If words are a different length, word1 must end with reversed word2 (or vice versa)
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        # Since the output contains pairs of indices, we shouldn't sort
        output = []

        for [i, word1] in enumerate(words):
            for [j, word2] in enumerate(words):
                if i == j:
                    continue

                if len(word1) == len(word2):
                    if word1 == word2[::-1]:
                        output.append([i, j])

                elif len(word1) == 0:
                    if isPalindrome(word2):
                        output.append([i, j])
                        output.append([j, i])

                elif len(word1) < len(word2):
                    insert = True
                    for pos in range(len(word1)):
                        if word2[len(word2) - pos - 1] != word1[pos]:
                            insert = False
                            break
                    if insert:
                        output.append([i, j])

        return output

    # WHAT IF WE DID THE ABOVE BUT USED A HASH AND ONLY ITERATED THROUGH WORDS ONCE?
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        hash = {word: i for [i, word] in enumerate(words)}
        output = []

        for [i, word] in enumerate(words):
            reversedWord = word[::-1]

            # matches 2 words of equal length that are opposites of each other
            # (case 1)
            if reversedWord in hash and i != hash[reversedWord]:
                output.append([i, hash[reversedWord]])

            # case 2:  word 2 ends in reverse of word 1, word 2 is longer
            for suffix in getPalindromeSuffixes(word):
                reverseSuffix = suffix[::-1]
                if reverseSuffix in hash:
                    output.append([hash[reverseSuffix], i])

            # case 3:  word 2 ends in reverse of word 1, word 1 is longer
            for prefix in getPalindromePrefixes(word):
                reversePrefix = prefix[::-1]
                if reversePrefix in hash:
                    output.append([i, hash[reversePrefix]])

        return output

    # WHAT IF WE USED TRIES?
    # TIME: = O(n k^2)
    # O(n) looping through words to add to trie
    #   O(k) to iterate through each letter in the word
    #     O(k) to check for palindromic substring remaining
    # = O(nk^2) to build the trie
    # Then we iterate through words again to find matches:
    # O(n) for outer loop
    #   O(k) for inner loop
    #   O(k) to check for palindrome (case 3)
    # = O(n k^2) for palindrome pairs checks
    # SPACE: O(nk) - not entirely sure about this though
    # O(nk) for the entire trie
    # O(nk) for output array
    # This is tricky though because I think there are some ways to form the words list that the trie can get super expensive
    # Like O(nk^2)
    def palindromePairs(self, words: List[str]) -> List[List[int]]:
        # Insert into the trie in reverse order
        trie = TrieNode()
        trie.addWords([word[::-1] for word in words])

        output = []

        for [i, word] in enumerate(words):
            currentNode = trie

            for [j, c] in enumerate(word):
                # CASE 3: Words in the Trie that are the reverse of the first part of our current word, and then what's left of our current word forms a palindrome.
                # "catesse", "tac"
                if currentNode.index != -1:
                    if isPalindrome(word[j:]):
                        output.append([i, currentNode.index])

                if c not in currentNode.children:
                    break

                currentNode = currentNode.children[c]
            else:  # we iterated the entire word
                # CASE 1: ("cat", "tac")
                if currentNode.index != -1 and currentNode.index != i:
                    output.append([i, currentNode.index])

                # CASE 2:  Words in the Trie that start with the reverse of our current word and then finish in a palindrome.
                # "cat", "essetac" (word 1 is shorter)
                # As we traverse the trie (in this case words were inserted backwards, so c then a then t, all the children indexes
                # represent whatever words have a palindrome, and then "tac" to end it (like essetac)
                for j in currentNode.palindromeSuffixes:
                    output.append([i, j])

        return output


class TrieNode:
    def __init__(self):
        self.children = collections.defaultdict(TrieNode)
        self.index = -1
        self.palindromeSuffixes = []
        return

    def addWords(self, words: List[str]) -> None:
        for [i, word] in enumerate(words):
            self.addWord(i, word)

    def addWord(self, i: int, word: str) -> None:
        node = self

        for j, c in enumerate(word):
            # check if remainder of word is a palindrome
            if isPalindrome(word[j:]):
                node.palindromeSuffixes.append(i)

            node = node.children[c]

        node.index = i


def getPalindromeSuffixes(word: str) -> List[str]:
    return [word[i + 1 :] for i in range(len(word)) if isPalindrome(word[: i + 1])]


def getPalindromePrefixes(word: str) -> List[str]:
    return [word[:i] for i in range(len(word)) if isPalindrome(word[i:])]


def isPalindrome(word):
    # return word = word[::-1]
    i = 0
    j = len(word) - 1

    while i < j:
        if word[i] != word[j]:
            return False
        i += 1
        j -= 1

    return True


s = Solution()
print(
    s.palindromePairs(["bat", "tab", "cat", "loltac", "t", "abbat"])
)  # [[0, 1], [1, 0], [2, 3], [4, 5]]

print(
    s.palindromePairs(["abcd", "dcba", "lls", "s", "sssll"])
)  # [[0, 1], [1, 0], [2, 4], [3, 2]]

print(s.palindromePairs(["bat", "tab", "cat"]))  # [[0, 1], [1, 0]]

print(
    s.palindromePairs(
        [
            "racecar",
            "esse",
            "",
            "banana",
        ]
    )
)  # [[2, 0], [0, 2], [2, 1], [1, 2]]
