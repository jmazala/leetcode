# https://leetcode.com/problems/reorder-list/

from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

    def __str__(self):
        s = ""
        node = self
        while node is not None:
            s += f"{node.val} -> "
            node = node.next
        return s[:-4]


class Solution:
    def reorderList(self, head: Optional[ListNode]) -> None:
        """
        Do not return anything, modify head in-place instead.
        """
        return merge(head, reverse(middleNode(head)))


def middleNode(head: ListNode) -> ListNode:
    slow = head
    fast = head

    while fast is not None and fast.next is not None:
        # slow = slow.next
        # fast = fast.next.next

        slow, fast = slow.next, fast.next.next

    return slow


def reverse(head: ListNode) -> ListNode:
    prev = None
    cur = head

    while cur is not None:
        # hard (explicit) way
        # temp = cur.next
        # cur.next = prev
        # prev = cur
        # cur = temp

        # easy (python) way
        cur.next, prev, cur = prev, cur, cur.next

    return prev


def merge(l1: ListNode, l2: ListNode) -> ListNode:
    temp = l1

    while l2.next is not None:
        # hard (explicit) way
        # l1Next = l1.next
        # l1.next = l2
        # l1 = l1Next

        # l2Next = l2.next
        # l2.next = l1
        # l2 = l2Next

        # easy (python) way
        l1.next, l1 = l2, l1.next
        l2.next, l2 = l1, l2.next

    return temp


s = Solution()

head = ListNode(1)
print(s.reorderList(head))

head = ListNode(1)
head.next = ListNode(2)
print(s.reorderList(head))

head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
print(s.reorderList(head))

head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = ListNode(4)
print(s.reorderList(head))

head = ListNode(1)
head.next = ListNode(2)
head.next.next = ListNode(3)
head.next.next.next = ListNode(4)
head.next.next.next.next = ListNode(5)
print(s.reorderList(head))
