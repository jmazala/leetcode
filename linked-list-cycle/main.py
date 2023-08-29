# https://leetcode.com/problems/linked-list-cycle/submissions/


# Definition for singly-linked list.
from typing import Optional


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None


class Solution:
    # METHOD 1 - Hash Set
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        seen = set()
        while head is not None:
            if head in seen:
                return True
            seen.add(head)
            head = head.next
        return False

    # METHOD 2 - 2 pointers
    # This is Floyd's Cycle Finding Algorithm
    # If no cycle, fast pointer will reach the end and we can return False
    # If cycle, fast will meet slow eventually
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        if head is None or head.next is None:
            return False

        slow = head
        fast = head.next

        while slow != fast:
            if fast is None or fast.next is None:
                return False

            slow = slow.next
            fast = fast.next.next

        return True
