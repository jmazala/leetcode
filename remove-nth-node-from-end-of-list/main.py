# https://leetcode.com/problems/remove-nth-node-from-end-of-list/

# Definition for singly-linked list.
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
    # SOLUTION 1 - Take length of list, iterate again to remove node
    # TIME: O(n) + O(n - k) = O(2n - k) = O(n)
    # O(n) to get list length
    # O(n - k) to advance to pointer to remove
    # O(1) to remove pointer
    # SPACE: O(3) for length, node, prev = O(1)
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        length = getListLength(head)
        if n == length:
            return head.next

        node = head
        prev = None
        for i in range(length - n):
            prev = node
            node = node.next

        prev.next = node.next
        node.next = None
        return head

    # SOLUTION 2 - Remove in line
    # Start 2 pointers behind head.
    # Advance leading pointer n spaces
    # Advance both pointers until the end
    # Lagging pointer now sits before the element to remove
    # Update lagging pointer's node to skip the element
    # Return the dummy
    # TIME: O(n) + O(n-k) = O(2n) = O(n)
    #   O(n) to advance first pointer
    #   O(n-k) to advance second pointer (k is element to remove from end)
    #   O(1) to update pointer and skip node
    # SPACE: O(3) for dummy, first, second = O(1)
    # NOTE:  According to leetcode, this requires more memory and more time.  What?
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        dummy = ListNode()
        dummy.next = head
        first = dummy
        second = dummy

        # Advance first pointer so that the gap between first and second is n
        for i in range(n + 1):
            first = first.next

        # Move first to the end while maintaing the gap
        while first is not None:
            first = first.next
            second = second.next

        # Remove node
        second.next = second.next.next
        return dummy.next


def getListLength(head):
    length = 0

    while head is not None:
        length += 1
        head = head.next

    return length


s = Solution()
for n in range(1, 6):
    h = ListNode(1)
    h.next = ListNode(2)
    h.next.next = ListNode(3)
    h.next.next.next = ListNode(4)
    h.next.next.next.next = ListNode(5)
    print(s.removeNthFromEnd(h, n))
