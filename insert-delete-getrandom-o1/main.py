from random import randrange


class RandomizedSet:

    def __init__(self):
        """
        Initialize your data structure here.
        """
        self.indices = {}
        self.data = []

    def insert(self, val: int) -> bool:
        """
        Inserts a value to the set. Returns true if the set did not already contain the specified element.
        """
        if val in self.indices:
            return False

        self.data.append(val)
        self.indices[val] = len(self.data) - 1
        return True

    def remove(self, val: int) -> bool:
        """
        Removes a value from the set. Returns true if the set contained the specified element.
        """
        if val not in self.indices:
            return False

        lastValue = self.data[-1]
        indexForRemovedValue = self.indices[val]
        self.data[indexForRemovedValue] = lastValue
        self.indices[lastValue] = indexForRemovedValue
        self.data.pop()
        self.indices.pop(val)
        return True

    def getRandom(self) -> int:
        """
        Get a random element from the set.
        """
        return self.data[randrange(len(self.data))]


rs = RandomizedSet()
print(rs.insert(1))  # True
print(rs.remove(2))  # False
print(rs.insert(2))  # True
print(rs.getRandom())  # 1 or 2
print(rs.remove(1))  # True
print(rs.insert(2))  # False
print(rs.getRandom())  # 2
