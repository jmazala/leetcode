# https://leetcode.com/problems/time-based-key-value-store/description/


from sortedcontainers import SortedDict


# METHOD 1 - Use built-in SortedDict
# We need a structure that keeps sorted key/value pairs (by key) to binary search
# through.  In this case, the timestamps all map to a key, and need binary searched through
# When a new key/timestamp/value thruple is inserted, we need to insert that timestamp in order
# But that would require a key => list[tuple(timestamp, value)] data structure
# Or we could sort the keys every time set/get is called (and store), but that requires
# another copy of all the keys, complicated
# Thus, SortedDict is our best bet (BUT looking into the implementation, it actually does keep
# an additional list of the keys, LOL).  It's public bisect_right function calls bisect_right on the list
# On get, use the built in SortedDict retrieval functions (in this case, bisect_right / peekitem)
class TimeMap:
    def __init__(self):
        self.data = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.data:
            self.data[key] = SortedDict()

        self.data[key][timestamp] = value

    # Find the largest value of the largest timestamp that's <= timestamp with that key
    def get(self, key: str, timestamp: int) -> str:
        if key not in self.data:
            return ""

        it = self.data[key].bisect_right(timestamp)
        return self.data[key].peekitem(it - 1)[1] if it != 0 else ""


# obj = TimeMap()
# obj.set("foo", "bar", 1)
# print(obj.get("foo", 1))  # bar
# print(obj.get("foo", 3))  # bar
# obj.set("foo", "bar2", 4)
# print(obj.get("foo", 4))  # bar2
# print(obj.get("foo", 5))  # bar2

obj2 = TimeMap()
obj2.set("love", "high", 10)
obj2.set("love", "low", 20)
print(obj2.get("love", 5))  # ""
print(obj2.get("love", 10))  # "high"
print(obj2.get("love", 15))  # "high"
print(obj2.get("love", 20))  # "low"
print(obj2.get("love", 25))  # "low"
"""
["TimeMap","set","set","get","get","get","get","get"]
[[],["love","high",10],["love","low",20],["love",5],["love",10],["love",15],["love",20],["love",25]]
"""
