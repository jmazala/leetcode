/**
 * @param {number[][]} graph
 * @return {boolean}
 */
const RED = 0;
const BLUE = 1;
const NO_COLOR = -1;

const isBipartite = function (graph) {
  const numNodes = graph.length;
  if (numNodes < 2) {
    return true;
  }

  const color = Array(numNodes).fill(NO_COLOR); // don't color any nodes yet

  for (let node = 0; node < graph.length; node++) {
    if (color[node] !== NO_COLOR) {
      continue; // this node has been visited
    }

    const stack = [node];
    color[node] = RED;

    while (stack.length) {
      const curNode = stack.pop();

      for (const neighbor of graph[curNode]) {
        // if 2 neighbors have the same color, return false
        if (color[neighbor] === color[curNode]) {
          return false;
        }

        // if this neighbor is unvisited (NO_COLOR), color it and add to stack
        if (color[neighbor] === NO_COLOR) {
          color[neighbor] = color[curNode] === RED ? BLUE : RED;
          stack.push(neighbor);
        }

        // if 2 neighbors have the same color, do nothing
      }
    }
  }

  return true;
};

console.log(
  isBipartite([
    [1, 3],
    [0, 2],
    [1, 3],
    [0, 2],
  ])
); // true

console.log(
  isBipartite([
    [1, 2, 3],
    [0, 2],
    [0, 1, 3],
    [0, 2],
  ])
); // false
