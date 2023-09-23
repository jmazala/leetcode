# https://leetcode.com/problems/lru-cache/description/


from typing import Optional


# METHOD 1 - SELF IMPLEMENTATION
class CacheItem:
    key: int
    value: int
    previous: Optional["CacheItem"]
    next: Optional["CacheItem"]

    def __init__(self, key: int, value: int):
        self.key = key
        self.value = value
        self.previous = None
        self.next = None


class LRUCache:
    def __init__(self, capacity: int):
        self.data = {}
        self.capacity = capacity

        self.head = CacheItem(-1, -1)
        self.tail = CacheItem(-1, -1)
        self.head.next = self.tail
        self.tail.previous = self.head

    def get(self, key: int) -> int:
        value = self.data[key].value if key in self.data else -1

        if value != -1:
            self.move_to_front(self.data[key])

        return value

    def put(self, key: int, value: int) -> None:
        if key in self.data:
            self.data[key].value = value
            self.move_to_front(self.data[key])
        else:
            self.data[key] = CacheItem(key, value)
            self.add_to_front(self.data[key])

        if len(self.data) > self.capacity:
            self.evict()

    def evict(self) -> None:
        item = self.tail.previous
        del self.data[item.key]  # type: ignore
        self.remove_from_list(item)  # type: ignore

    def move_to_front(self, item: CacheItem) -> None:
        self.remove_from_list(item)
        self.add_to_front(item)

    def add_to_front(self, item: CacheItem) -> None:
        item.next = self.head.next
        item.next.previous = item  # type: ignore
        item.previous = self.head
        self.head.next = item

    def remove_from_list(self, item: CacheItem) -> None:
        item.previous.next = item.next  # type: ignore
        item.next.previous = item.previous  # type: ignore


# METHOD 2 - BUILT IN TYPES
import collections


class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.data = collections.OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.data:
            return -1

        self.data.move_to_end(key)
        return self.data[key]

    def put(self, key: int, value: int) -> None:
        if key in self.data:
            self.data.move_to_end(key)

        self.data[key] = value

        if len(self.data) > self.capacity:
            self.data.popitem(False)


l = LRUCache(2)
l.put(1, 1)
