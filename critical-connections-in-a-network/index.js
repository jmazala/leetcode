// https://leetcode.com/problems/critical-connections-in-a-network/discuss/382638/DFS-detailed-explanation-O(orEor)-solution-(I-like-this-question)

/*
An edge is a critical connection, if and only if it is not in a cycle.
If we discard all edges in cycles, we're left with only critical ones.
How to find eges in cycles, and remove them?
We will use DFS algorithm to find cycles and decide whether or not an edge is in a cycle.

Define rank of a node: The depth of a node during a DFS. The starting node has a rank 0.
Only the nodes on the current DFS path have non-special ranks. In other words, only the nodes that we've started visiting, but haven't finished visiting, have ranks.
So 0 <= rank < n.

(For coding purpose, if a node is not visited yet, it has a special rank -2;
  if we've fully completed the visit of a node, it has a special rank n.)

How can "rank" help us with removing cycles? Imagine you have a current path of length k during a DFS.
The nodes on the path has increasing ranks from 0 to kand incrementing by 1.
Surprisingly, your next visit finds a node that has a rank of p where 0 <= p < k. Why does it happen?
Aha! You found a node that is on the current search path!
That means, congratulations, you found a cycle!
But only the current level of search knows it finds a cycle. How does the upper level of search knows, if you backtrack? Let's make use of the return value of DFS: dfs function returns the minimum rank it finds. During a step of search from node u to its neighbor v, if dfs(v) returns something smaller than or equal to rank(u), then u knows its neighbor v helped it to find a cycle back to u or u's ancestor. So u knows it should discard the edge (u, v) which is in a cycle.

After doing dfs on all nodes, all edges in cycles are discarded. So the remaining edges are critical connections.
*/

const UNVISITED = -2; // use this to check for parent.  can't be -1

/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
const criticalConnections = function (n, connections) {
  const graph = {};
  for (const [from, to] of connections) {
    graph[from] = graph[from] || [];
    graph[to] = graph[to] || [];
    graph[from].push(to);
    graph[to].push(from);
  }

  // start with all edges in this set, can be removed in the dfs if we want a cyclic edge
  const set = new Set(connections.map((connection) => connection.join(',')));
  const depths = Array(n).fill(UNVISITED);
  dfs(0, 0);
  return Array.from(set).map((i) => i.split(','));

  function dfs(node, depth) {
    // rank[node] will be UNVISITED, otherwise between 0 and n - 1
    if (depths[node] >= 0) {
      return depths[node];
    }

    depths[node] = depth;
    let minDepthFound = n;

    for (const neighbor of graph[node]) {
      /*
      depth - 1 means neighbor is the parent
      if we used -1 as UNVISITED, this would have not let us traverse parent node's neighbors
      bc (depth = 0 for parent)
      */
      if (depths[neighbor] === depth - 1) {
        continue;
      }

      const nextMinDepth = dfs(neighbor, depth + 1);
      minDepthFound = Math.min(nextMinDepth, minDepthFound);
      if (nextMinDepth <= depth) {
        set.delete([node, neighbor].join(','));
        set.delete([neighbor, node].join(','));
      }
    }

    return minDepthFound;
  }
};
