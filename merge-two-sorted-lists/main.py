# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeTwoLists(self, l1: ListNode, l2: ListNode) -> ListNode:
        if (l1 is None and l2 is None):
            return None

        if (l1 is None):
            return l2

        if (l2 is None):
            return l1

        dummyHead = ListNode()
        current = dummyHead

        while True:
            if l1 is None:
                current.next = l2
                break

            if l2 is None:
                current.next = l1
                break

            if (l1.val <= l2.val):
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next

            current = current.next

        return dummyHead.next
