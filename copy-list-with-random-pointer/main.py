# https://leetcode.com/problems/copy-list-with-random-pointer/


# Definition for a Node.
from typing import Optional


class Node:
    def __init__(self, x: int, next: "Node" = None, random: "Node" = None):
        self.val = int(x)
        self.next = next
        self.random = random


class Solution:
    def copyRandomList(self, head: "Optional[Node]") -> "Optional[Node]":
        if head is None:
            return None

        copies = {}
        current = head

        while current:
            if current not in copies:
                copies[current] = Node(current.val)

            if current.next:
                if current.next not in copies:
                    copies[current.next] = Node(current.next.val)

                copies[current].next = copies[current.next]

            if current.random:
                if current.random not in copies:
                    copies[current.random] = Node(current.random.val)

                copies[current].random = copies[current.random]

            current = current.next

        return copies[head]


seven = Node(7)
thirteen = Node(13)
eleven = Node(11)
ten = Node(10)
one = Node(1)

seven.next = thirteen

thirteen.next = eleven
thirteen.random = seven

eleven.next = ten
eleven.random = ten

ten.next = one
ten.random = one

one.random = seven

s = Solution()
print(s.copyRandomList(seven))
