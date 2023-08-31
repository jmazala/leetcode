# https://leetcode.com/problems/design-add-and-search-words-data-structure/


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


class WordDictionary:
    def __init__(self):
        self.trie = Trie()

    def addWord(self, word: str) -> None:
        self.trie.insert(word)

    # NOTE:  See java file for another search algorithm using queues
    def searchHelper(self, node, word):
        for i, c in enumerate(word):
            if c != ".":
                if c not in node.children:
                    return False

                node = node.children[c]
            else:
                for nextNode in node.children.values():
                    if self.searchHelper(nextNode, word[i + 1 :]):
                        return True

                return False

        return node.isWord

    def search(self, word: str) -> bool:
        return self.searchHelper(self.trie, word)


wordDictionary = WordDictionary()
wordDictionary.addWord("bad")
wordDictionary.addWord("dad")
wordDictionary.addWord("mad")
print(wordDictionary.search("bad"))  # True
print(wordDictionary.search(".ad"))  # True
print(wordDictionary.search("b.."))  # True
print(wordDictionary.search("..."))  # True
print(wordDictionary.search("pad"))  # False
print(wordDictionary.search("m..."))  # False
print(wordDictionary.search("b.z"))  # False
