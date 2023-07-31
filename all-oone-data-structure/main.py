# https://leetcode.com/problems/all-oone-data-structure/


class Node:
    def __init__(self, s, count=0):
        self.s = s
        self.count = count
        self.next = None
        self.previous = None


# All operations must be O(1)
# This means we need a retrieval system based on key with O(1) - a hash
# And we also need to keep track of the current min / max elements
# We can't use a heap because that's not O(1).  But we can use a doubly linked list
class AllOne:
    def __init__(self):
        self.hash = {}
        self.dummyHead = Node("", float("inf"))
        self.dummyTail = Node("", float("-inf"))
        self.dummyHead.next = self.dummyTail
        self.dummyTail.previous = self.dummyHead

    def inc(self, key: str) -> None:
        if key not in self.hash:
            self.hash[key] = Node(key)

        self.hash[key].count += 1
        self.insertAtTail(key)

        while self.hash[key].count > self.hash[key].previous.count:
            self.swap(self.hash[key], self.hash[key].previous)

    def insertAtHead(self, key):
        self.hash[key].next = self.dummyHead.next
        self.hash[key].next.previous = self.hash[key]
        self.hash[key].previous = self.dummyHead
        self.dummyHead.next = self.hash[key]
        return

    def insertAtTail(self, key):
        self.hash[key].previous = self.dummyTail.previous
        self.hash[key].next = self.dummyTail
        self.hash[key].previous.next = self.hash[key]
        self.dummyTail.previous = self.hash[key]

    def removeFromList(self, key):
        self.hash[key].previous.next = self.hash[key].next
        self.hash[key].next.previous = self.hash[key].previous

    def moveToFront(self, key):
        self.removeFromList(key)
        self.insertAtHead(key)

    def moveToTail(self, key):
        self.removeFromList(key)
        self.insertAtTail(key)

    def dec(self, key: str) -> None:
        self.hash[key].count -= 1

        if self.hash[key].count == 0:
            self.removeFromList(key)
            del self.hash[key]
        # we only really need to swap if this should be the tail or be relieved of head
        elif self.hash[key].count < self.dummyTail.previous.count:
            self.moveToTail(key)
        elif self.isHead(key) and self.hash[key].next.count > self.hash[key].count:
            self.moveToFront(self.hash[key].next.s)

    # return one key with max count else ""
    def getMaxKey(self) -> str:
        return self.dummyHead.next.s

    # return one key with min count else ""
    def getMinKey(self) -> str:
        return self.dummyTail.previous.s

    def isHead(self, key: str) -> bool:
        return self.dummyHead.next == self.hash[key]

    def isEmpty(self) -> bool:
        return (
            self.dummyHead.next == self.dummyTail
            and self.dummyTail.previous == self.dummyHead
        )

    def toString(self) -> str:
        s = ""
        node = self.dummyHead
        while node is not None:
            s += f"{node.s}{node.count} <-> "
            node = node.next

        return s[:-5]


# Your AllOne object will be instantiated and called as such:
# allOne = AllOne()
# allOne.inc("a")  # a1
# allOne.inc("b")  # a1 b1
# allOne.inc("c")  # a1 b1 c1
# print(allOne.getMaxKey())  # "a"
# print(allOne.getMinKey())  # "c"
# allOne.inc("b")  # b2 a1 c1
# print(allOne.getMaxKey())  # "b"
# print(allOne.getMinKey())  # "c"
# allOne.inc("a")  # b2 a2 c1
# print(allOne.getMaxKey())  # "b"
# allOne.inc("c")  # b2 a2 c2
# print(allOne.getMaxKey())  # "b"
# allOne.inc("c")  # c3 b2 a2
# print(allOne.getMaxKey())  # "c"
# print(allOne.getMinKey())  # "a"
# allOne.inc("b")  # c3 b3 a2
# print(allOne.getMaxKey())  # "c"
# allOne.dec("c")  # b3 c2 a2
# print(allOne.getMaxKey())  # "b"
# allOne.dec("c")  # b2 a2 c1
# print(allOne.getMaxKey())  # "b"
# print(allOne.getMinKey())  # "c"
# allOne.dec("a")  # b2 a1 c1
# print(allOne.getMinKey())  # "c"
# allOne.dec("a")  # b2 c1
# print(allOne.getMinKey())  # "c"
# allOne.dec("c")  # b2 c1
# print(allOne.getMinKey())  # "b"

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
a3.dec("ds")
a3.inc("hello")
print(a3.getMaxKey())  # "hello"
a3.inc("hello")
a3.inc("hello")
a3.dec("world")
a3.dec("leet")
a3.dec("code")
a3.dec("ds")
print(a3.getMaxKey())  # "hello"
a3.inc("new")
a3.inc("new")
a3.inc("new")
a3.inc("new")
a3.inc("new")
a3.inc("new")
print(a3.getMaxKey())  # "new"
print(a3.getMinKey())  # "hello"
