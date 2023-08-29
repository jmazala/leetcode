# https://leetcode.com/problems/evaluate-division/editorial/

from collections import defaultdict
from typing import List


class Solution:
    # SOLUTION 1 - BUILD A GRAPH AND DFS FOR PRODUCTS
    # Each equation represents 2 nodes in a graph with 2 directed edges between them
    # if a/b = 2, then b/a = 1/2.  Set those as multipliers for edges between nodes
    # To find the product of equations, traverse the graph from dividend to divisor
    # and use the multiples to get the value of an equation
    # NOTE:  this doesn't actually solve for any of the variable values, but we can represent
    # the ratios between variables with the given information.
    # TIME: O(M * N)
    #   Iterate through equations to build the graph = O(N)
    #   For every query, we traverse the graph.  Worst case is entire traversal (O(N))
    #     Thus O(M) * O(N)
    # SPACE: O(N + Q)
    #   O(N) for the graph
    #   O(N) for recursion stack
    #   O(Q) for results
    #   O(N) for visited
    def calcEquation(
        self, equations: List[List[str]], values: List[float], queries: List[List[str]]
    ) -> List[float]:
        graph = Solution.buildGraph(equations, values)
        results = []

        for [dividend, divisor] in queries:
            val = 0  # placeholder

            if dividend not in graph or divisor not in graph:
                val = -1.0

            elif dividend == divisor:
                val = 1.0
            else:
                visited = set()
                val = Solution.dfs(dividend, divisor, 1, visited, graph)

            results.append(val)

        return results

    @staticmethod
    def dfs(current, target, currentProduct, visited, graph):
        visited.add(current)
        value = -1.0

        neighbors = graph[current]
        if target in neighbors:
            value = graph[current][target] * currentProduct
        else:
            for next, multiplier in graph[current].items():
                if next in visited:
                    continue

                value = Solution.dfs(
                    next, target, currentProduct * multiplier, visited, graph
                )
                if value != -1.0:
                    break

        visited.remove(current)
        return value

    @staticmethod
    def buildGraph(equations, values):
        graph = defaultdict(defaultdict)

        for [dividend, divisor], value in zip(equations, values):
            graph[dividend][divisor] = value
            graph[divisor][dividend] = 1 / value

        return graph

    # SOLUTION 2 - UNION-FIND WITH WEIGHTS (AKA DISJOINT SET)
    # Used to track elements partitioned into disjoint (non-overlapping) subsets
    # Often used to find graph partition problems
    # Using union-find, we can determine whether 2 nodes (say, a and c)
    # Belong to the same group in a graph.  This is the same as determining
    # If a path exists between 2 nodes
    # This solves the -1.0 problem (and we don't have to DFS to find a connection)
    # In order to find the cumulative product between the nodes, we have to adapt the algorithm
    # Union-Find data structure mostly consists of 2 operations:  Union and Find
    # Find gets identity of a group for a node
    # Union merges 2 groups with two elements belonging two
    # So we can build a table containing an entry for each node using Union-Find
    # Where {nodeL -> (groupID, weight)}
    # So given two nodes (a and b) with entries as (a_group_id, a_weight), (b_group_id, b_weight)
    # to evaluate a/b we only need to determine 2 things:
    # 1 -> are the group IDs equal?  (no?  -1.0)
    # 2 -> a_weight / b_weight (the relative weights for each variable)
    #:  EX:  a/b = 2, b/c = 3
    #     We start with every node in its own group with a weight of 1
    #     Now we have our first equation, a/b, so they are the same group
    #       Attach dividend to divisor.  update relative weight to reflect ratio
    #     Since a/b = 2, a's weight is 2 and b's weight is 1.  they are both part of group b
    #   b/c = 3.  so we attach b to group c.  and relative weight of b is 3 vs c's 1
    #     But therefore a should now have weight 6 (it was originally 2, and b is 3, so now a is 6)
    #     We don't actually update it though, this can be part of the find operation.  hence lazy evaluation
    #     lazy = only evaluate when needed
    def calcEquation(self, equations, values, queries):
        graph = {}

        def union(a, b, value):
            aGroup, aWeight = find(a)
            bGroup, bWeight = find(b)

            if aGroup != bGroup:  # merge them
                graph[aGroup] = (bGroup, value * bWeight / aWeight)

        def find(nodeID):
            if nodeID not in graph:
                graph[nodeID] = (nodeID, 1.0)

            groupID, nodeWeight = graph[nodeID]

            if groupID != nodeID:
                # chain update
                newGroupID, groupWeight = find(groupID)
                graph[nodeID] = (newGroupID, nodeWeight * groupWeight)

            return graph[nodeID]

        for (dividend, divisor), value in zip(equations, values):
            union(dividend, divisor, value)

        results = []

        for dividend, divisor in queries:
            if dividend not in graph or divisor not in graph:
                results.append(-1.0)
            else:
                dividendGroup, dividendWeight = find(dividend)
                divisorGroup, divisorWeight = find(divisor)
                if dividendGroup != divisorGroup:
                    results.append(-1.0)
                else:
                    results.append(dividendWeight / divisorWeight)

        return results


s = Solution()
# print(
#     s.calcEquation(
#         equations=[["a", "b"], ["b", "c"]],
#         values=[2.0, 3.0],
#         queries=[["a", "c"], ["b", "a"], ["a", "e"], ["a", "a"], ["x", "x"]],
#     )  # [6.0, 0.5, -1.0, 1.0, -1.0]
# )

print(
    s.calcEquation(
        equations=[["x1", "x2"], ["x2", "x3"], ["x1", "x4"], ["x2", "x5"]],
        values=[3.0, 0.5, 3.4, 5.6],
        queries=[
            ["x2", "x4"],
            ["x1", "x5"],
            ["x1", "x3"],
            ["x5", "x5"],
            ["x5", "x1"],
            ["x3", "x4"],
            ["x4", "x3"],
            ["x6", "x6"],
            ["x0", "x0"],
        ],
    )
)  # [1.13333,16.80000,1.50000,1.00000,0.05952,2.26667,0.44118,-1.00000,-1.00000]
