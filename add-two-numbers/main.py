# https://leetcode.com/problems/add-two-numbers/


# Definition for singly-linked list.
from typing import Optional


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def addTwoNumbers(
        self, l1: Optional[ListNode], l2: Optional[ListNode]
    ) -> Optional[ListNode]:
        dummy = ListNode()
        node = dummy
        carry = False

        while l1 or l2 or carry:
            node.next = ListNode()
            node = node.next

            if carry:
                node.val += 1
                carry = False

            if l1:
                node.val += l1.val
                l1 = l1.next

            if l2:
                node.val += l2.val
                l2 = l2.next

            carry = node.val // 10 == 1
            node.val %= 10

        return dummy.next
