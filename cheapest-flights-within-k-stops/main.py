# https://leetcode.com/problems/cheapest-flights-within-k-stops/

import collections
import heapq
from typing import List


class Solution:
    # METHOD 1 - USE DJKSTRA'S ALGORITHM
    # 1 - Build a graph of src => [(dst1, price1)...]
    # 2 - Keep a "stops" array (1 index per city) to prevent revisiting the same node
    # 3 - Use a minHeap (lowest price first) to traverse the airports
    # 4 - Upon seeing the destination (if you do), that must be the cheapest way
    # TIME: O(n + E) + O(n log n) + O(e log n) = O((E+n) log n)
    # O(E) to build the graph
    # O(n) to visit every airport
    #   O(log n) to pop from heap
    #   O(log n) to push onto the heap, which is done E times so O(n log n) + O(e log n)
    #   for all heap operations
    # SPACE: O(n) for heap, O(E) for graph = O(n + E)

    def findCheapestPrice(
        self, n: int, flights: List[List[int]], src: int, dst: int, k: int
    ) -> int:
        graph = collections.defaultdict(list)
        # Build a graph for each flight (from, to)

        for [i, j, price] in flights:
            graph[i].append((j, price))

        stops = [float("inf")] * n
        stops[src] = 0

        # Ues a heap sorted by price to always get the cheapest flight
        minHeap = []

        # k stops means k+1 flights (1 stop = 2 flights = 1 layover)
        heapq.heappush(minHeap, (0, src, 0))  # price, city, flightsTaken

        while len(minHeap) > 0:
            (priceSoFar, curCity, flightsTaken) = heapq.heappop(minHeap)

            # we exceeded number of steps OR
            # we got to curCity with fewer layovers (thus cheaper bc djkstras)
            if flightsTaken > k + 1 or flightsTaken > stops[curCity]:
                continue

            stops[curCity] = flightsTaken

            if curCity == dst:
                return priceSoFar

            for neighbor, cost in graph[curCity]:
                heapq.heappush(
                    minHeap,
                    (priceSoFar + cost, neighbor, flightsTaken + 1),
                )

        return -1

    # METHOD 2 - BELLMAN-FORD ALGORITHM
    # Traverse every edge in the graph and update edges
    # Technically it's a BFS.  This way is easier than Djikstra's
    # to implement and read
    # TIME: O(n*k) where k is # of flights, and n is # of flights

    def findCheapestPrice(
        self, n: int, flights: List[List[int]], src: int, dst: int, k: int
    ) -> int:
        priceToReach = [float("inf")] * n
        priceToReach[src] = 0

        # Traverse every edge, see if we got a new minimum price to
        # reach a node

        for i in range(k + 1):
            # need a temp array to preserve original prices
            # through each iteration of Bellman-Ford
            tempPrices = priceToReach.copy()
            didUpdate = False

            for [departing, arriving, price] in flights:
                # If we haven't reached departing airport from
                # source yet (modified BFS)
                if priceToReach[departing] == float("inf"):
                    continue

                if priceToReach[departing] + price < tempPrices[arriving]:
                    didUpdate = True
                    tempPrices[arriving] = priceToReach[departing] + price

            if not didUpdate:
                break

            priceToReach = tempPrices.copy()

        return -1 if priceToReach[dst] == float("inf") else priceToReach[dst]


s = Solution()
print(
    s.findCheapestPrice(
        4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1
    )  # 700
)
