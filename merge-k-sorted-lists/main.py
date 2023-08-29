# https://leetcode.com/problems/merge-k-sorted-lists/


# Definition for singly-linked list.
from typing import List, Optional


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
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        lists = [l for l in lists if l is not None]
        dummy = ListNode()
        temp = dummy

        while len(lists) > 0:
            minValue = float("inf")
            minIndex = -1

            for i, node in enumerate(lists):
                if node.val < minValue:
                    minValue = node.val
                    minIndex = i

            temp.next = lists[minIndex]
            temp = temp.next

            lists[minIndex] = lists[minIndex].next
            if lists[minIndex] is None:
                lists.pop(minIndex)

        return dummy.next


l1 = ListNode(1)
l1.next = ListNode(4)
l1.next.next = ListNode(5)
l2 = ListNode(1)
l2.next = ListNode(3)
l2.next.next = ListNode(4)
l3 = ListNode(2)
l3.next = ListNode(6)

s = Solution()
print(s.mergeKLists([l1, l2, l3]))
