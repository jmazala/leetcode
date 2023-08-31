from collections import defaultdict
from typing import List

DIRECTIONS = [(-1, 0), (1, 0), (0, 1), (0, -1)]
PLACEHOLDER = "|"


class Trie:
    def __init__(self):
        self.isWord = False
        self.children = defaultdict(Trie)

    def insert(self, word: str) -> None:
        node = self
        for c in word:
            node = node.children[c]

        node.isWord = True

    def search(self, word: str) -> bool:
        node = self
        for c in word:
            if c not in node.children:
                return False

            node = node.children[c]

        return node.isWord

    def startsWith(self, prefix: str) -> bool:
        node = self
        for c in prefix:
            if c not in node.children:
                return False

            node = node.children[c]
        return True


class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        self.trie = Trie()
        self.foundWords = set()

        for word in words:
            self.trie.insert(word)

        for i in range(len(board)):
            for j in range(len(board[0])):
                self.search(board, i, j, self.trie, "")

        return list(self.foundWords)

    def search(self, board, i, j, trie, prefix):
        if i < 0 or j < 0 or i >= len(board) or j >= len(board[0]):
            return

        c = board[i][j]

        if c not in trie.children:
            return

        prefix += c
        trie = trie.children[c]
        board[i][j] = PLACEHOLDER

        if trie.isWord:
            # TODO: remove prefix from the trie, and change foundWords to a list instead of set
            self.foundWords.add(prefix)

        for dI, dJ in DIRECTIONS:
            nextI, nextJ = i + dI, j + dJ
            self.search(board, nextI, nextJ, trie, prefix)

        prefix = prefix[:-1]
        board[i][j] = c


s = Solution()
print(s.findWords(board=[["a", "a"]], words=["aaa"]))
print(
    s.findWords(
        board=[
            ["o", "a", "a", "n"],
            ["e", "t", "a", "e"],
            ["i", "h", "k", "r"],
            ["i", "f", "l", "v"],
        ],
        words=["oath", "pea", "eat", "rain"],
    )
)
