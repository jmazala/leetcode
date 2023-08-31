# https://leetcode.com/problems/implement-trie-prefix-tree/
from collections import defaultdict


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


# Your Trie object will be instantiated and called as such:
trie = Trie()
trie.insert("apple")
print(trie.search("apple"))  # True
print(trie.search("app"))  # False
print(trie.startsWith("app"))  # True
trie.insert("app")
print(trie.search("app"))  # True
