# https://leetcode.com/problems/smallest-common-region/

import collections
from typing import List


class GraphNode:
    def __init__(self):
        self.region = None
        self.parent = None


class Solution:
    def findSmallestRegion(
        self, regions: List[List[str]], region1: str, region2: str
    ) -> str:
        hash = collections.defaultdict(GraphNode)

        for region in regions:
            parentName = region.pop(0)
            parent = hash[parentName]
            parent.region = parentName

            for childName in region:
                child = hash[childName]
                child.region = childName
                child.parent = parent

        node1 = hash[region1]
        node2 = hash[region2]

        node1Depth = 0
        while node1 is not None:
            node1Depth += 1
            node1 = node1.parent

        node2Depth = 0
        while node2 is not None:
            node2Depth += 1
            node2 = node2.parent

        node1 = hash[region1]
        node2 = hash[region2]
        while node2Depth > node1Depth:
            node2 = node2.parent
            node2Depth -= 1

        while node1Depth > node2Depth:
            node1 = node1.parent
            node1Depth -= 1

        while node1 != node2:
            node1 = node1.parent
            node2 = node2.parent

        return node1.region


s = Solution()

print(
    s.findSmallestRegion(
        [
            ["Earth", "North America", "South America"],
            ["North America", "United States", "Canada"],
            ["United States", "New York", "Boston"],
            ["Canada", "Ontario", "Quebec"],
            ["South America", "Brazil"],
        ],
        "Quebec",
        "New York",
    )  # North America
)

print(
    s.findSmallestRegion(
        [
            ["North America", "United States", "Canada"],
            ["Earth", "North America", "South America"],
            ["United States", "New York", "Boston"],
            ["South America", "Brazil"],
            ["Canada", "Ontario", "Quebec"],
        ][::-1],
        "Quebec",
        "New York",
    )  # North America
)

print(
    s.findSmallestRegion(
        [
            ["North America", "United States", "Canada"],
            ["Earth", "North America", "South America"],
            ["United States", "New York", "Boston"],
            ["South America", "Brazil"],
            ["Canada", "Ontario", "Quebec"],
        ][::-1],
        "Quebec",
        "Brazil",
    )  # Earth
)
