# https://leetcode.com/problems/all-oone-data-structure/

import collections


class Node:
    def __init__(self):
        self.keys = set()
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self._head = Node()
        self._tail = Node()
        self._head.next = self._tail
        self._tail.prev = self._head

    def insertAtHead(self, nodeToInsert) -> None:
        return self.insertAfter(nodeToInsert, self._head)

    def insertAfter(self, nodeToInsert: Node, existingNode: Node) -> None:
        nodeToInsert.next = existingNode.next
        nodeToInsert.prev = existingNode
        existingNode.next.prev = nodeToInsert
        existingNode.next = nodeToInsert

    def insertBefore(self, nodeToInsert: Node, existingNode: Node) -> None:
        self.insertAfter(nodeToInsert, existingNode.prev)

    def remove(self, nodeToRemove: Node) -> None:
        nodeToRemove.next.prev = nodeToRemove.prev
        nodeToRemove.prev.next = nodeToRemove.next

    def getTail(self) -> Node:
        return None if self._tail.prev == self._head else self._tail.prev

    def getHead(self) -> Node:
        return None if self._head.next == self._tail else self._head.next

    def toString(self) -> str:
        s = ""
        node = self._head
        while node is not None:
            s += f"{node.keys} <-> "
            node = node.next

        return s[:-5]


# All operations must be O(1)
# This means we need a retrieval system based on key with O(1) - a hash
# And we also need to keep track of the current min / max elements
# We can't use a heap because that's not O(1)
# But we can use a doubly linked list to keep track of min / max
# So the data structure here is a doubly linked list where each node has a set of values
# The hash table maps frequencies (int) to the list node containing the set of words
# The other hash table maps the frequency to each key
# After incrementing or decrementing, move the key to the proper set.
# Once it's moved, check if the previous set it belonged to is empty.  If so, remove the node
# TIME: O(1) for everything
# SPACE: O(fn)
#   O(fn) for the linked list where f is the number of distinct frequencies and n is the number of keys
#   O(n) for keysToFreq hash
#   O(f) for freqToNode hash


class AllOne:
    def __init__(self):
        self.keysToFreq = collections.defaultdict(int)
        self.linkedList = DoublyLinkedList()
        self.freqToNode = {}
        self.freqToNode[0] = self.linkedList._head

    def inc(self, key: str) -> None:
        self.keysToFreq[key] += 1
        freq = self.keysToFreq[key]

        if freq not in self.freqToNode:
            self.freqToNode[freq] = Node()
            self.linkedList.insertAfter(
                existingNode=self.freqToNode[freq - 1],
                nodeToInsert=self.freqToNode[freq],
            )

        node = self.freqToNode[freq]
        node.keys.add(key)

        if freq != 1:
            prevNode = self.freqToNode[freq - 1]
            prevNode.keys.remove(key)
            if len(prevNode.keys) == 0:
                self.linkedList.remove(prevNode)
                del self.freqToNode[freq - 1]

    def dec(self, key: str) -> None:
        self.keysToFreq[key] -= 1
        freq = self.keysToFreq[key]

        if freq not in self.freqToNode:
            self.freqToNode[freq] = Node()
            self.linkedList.insertBefore(
                existingNode=self.freqToNode[freq + 1],
                nodeToInsert=self.freqToNode[freq],
            )

        node = self.freqToNode[freq]
        node.keys.add(key)

        prevNode = self.freqToNode[freq + 1]
        prevNode.keys.remove(key)

        if len(prevNode.keys) == 0:
            self.linkedList.remove(prevNode)
            del self.freqToNode[freq + 1]

    def getMaxKey(self) -> str:
        tail = self.linkedList.getTail()
        if tail is None:
            return ""

        val = tail.keys.pop()
        tail.keys.add(val)
        return val

    def getMinKey(self) -> str:
        head = self.linkedList.getHead()
        if head is None:
            return ""

        val = head.keys.pop()
        head.keys.add(val)
        return val


# Your AllOne object will be instantiated and called as such:
allOne = AllOne()
allOne.inc("a")  # a1
allOne.inc("b")  # a1 b1
allOne.inc("c")  # a1 b1 c1
print(allOne.getMaxKey() in "abc")  # "a / b / c"
print(allOne.getMinKey() in "abc")  # "a / b c"
allOne.inc("b")  # b2 a1 c1
print(allOne.getMaxKey())  # "b"
print(allOne.getMinKey() in "ac")  # "a / c"
allOne.inc("a")  # b2 a2 c1
print(allOne.getMaxKey() in "ab")  # "a / b"
allOne.inc("c")  # b2 a2 c2
print(allOne.getMaxKey() in "abc")  # "a / b / c"
allOne.inc("c")  # c3 b2 a2
print(allOne.getMaxKey())  # "c"
print(allOne.getMinKey() in "ab")  # "a / b"
allOne.inc("b")  # c3 b3 a2
print(allOne.getMaxKey() in "bc")  # "b / c"
allOne.dec("c")  # b3 c2 a2
print(allOne.getMaxKey())  # "b"
allOne.dec("c")  # b2 a2 c1
print(allOne.getMaxKey() in "ab")  # "a / b"
print(allOne.getMinKey())  # "c"
allOne.dec("a")  # b2 a1 c1
print(allOne.getMinKey() in "ac")  # "a / c"
allOne.dec("a")  # b2 c1
print(allOne.getMinKey())  # "c"
allOne.dec("c")  # b2 c1
print(allOne.getMaxKey())  # "b"
print(allOne.getMinKey())  # "b"

# a2 = AllOne()
# a2.inc("hello")  # hello1
# print(a2.getMaxKey())  # "hello"
# print(a2.getMinKey())  # "hello"
# a2.inc("world")  # hello1 world1
# print(a2.getMinKey())  # "world"
# a2.inc("hello")  # hello2 world1
# a2.dec("world")  # hello2
# print(a2.getMinKey())  # "hello"
# a2.inc("hello")  # hello3
# a2.inc("leet")  # hello3 leet1
# print(a2.getMaxKey())  # "hello"
# print(a2.getMinKey())  # "leet"
# a2.dec("hello")  # hello2 leet1
# a2.dec("hello")  # hello1 leet1
# a2.dec("hello")  # leet1
# print(a2.getMaxKey())  # leet


a3 = AllOne()
a3.inc("hello")  # hello1
a3.inc("world")  # hello1 world1
a3.inc("leet")  # hello1 world1 leet1
a3.inc("code")  # hello1 world1 leet1 code1
a3.inc("ds")  # hello1 world1 leet1 code1 ds1
a3.inc("leet")  # leet2 hello1 world1 code1 ds1
print(a3.getMaxKey())  # "leet"
a3.inc("ds")  # leet2 ds2 hello1 world1 code1
a3.dec("leet")  # ds2 leet1 hello1 world1 code1
print(a3.getMaxKey())  # "ds"
a3.dec("ds")  # ds1 leet1 hello1 world1 code1
a3.inc("hello")  # hello2 ds1 leet1 world1 code1
print(a3.getMaxKey())  # "hello"
a3.inc("hello")  # hello3 ds1 leet1 world1 code1
a3.inc("hello")  # hello4 ds1 leet1 world1 code1
a3.dec("world")  # hello4 ds1 leet1 code1
a3.dec("leet")  # hello4 ds1 code1
a3.dec("code")  # hello4 ds1
a3.dec("ds")  # hello4
print(a3.getMaxKey())  # "hello"
a3.inc("new")  # hello4 new1
a3.inc("new")  # hello4 new2
a3.inc("new")  # hello4 new3
a3.inc("new")  # hello4 new4
a3.inc("new")  # new5 hello4
a3.inc("new")  # new6 hello4
print(a3.getMaxKey())  # "new"
print(a3.getMinKey())  # "hello"
