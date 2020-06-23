const RED = 0;
const BLUE = 1;

function QueueItem(node, pathColor) {
  this.node = node;
  this.pathColor = pathColor;
  return this;
}

/**
 * @param {number} n
 * @param {number[][]} red_edges
 * @param {number[][]} blue_edges
 * @return {number[]}
 */
const shortestAlternatingPaths = function (n, blueEdges, redEdges) {
  const answer = Array(n).fill(-1);
  const visited = Array(2)
    .fill()
    .map(() => Array(n).fill(false));

  visited[RED][0] = true;
  visited[BLUE][0] = true;

  const graph = {};

  for (let i = 0; i < n; i++) {
    graph[i] = { [RED]: [], [BLUE]: [] };
  }

  for (const [from, to] of blueEdges) {
    graph[from][RED].push(to);
  }

  for (const [from, to] of redEdges) {
    graph[from][BLUE].push(to);
  }

  // BFS accounting for edge color
  const queue = [new QueueItem(0, RED), new QueueItem(0, BLUE)];
  let steps = 0;

  while (queue.length) {
    let numNodes = queue.length;

    while (numNodes) {
      const current = queue.shift();
      numNodes--;

      const currentNode = current.node;
      const currentColor = current.pathColor;
      const nextColor = currentColor === RED ? BLUE : RED;

      if (answer[currentNode] === -1) {
        answer[currentNode] = steps;
      }

      for (const neighbor of graph[currentNode][currentColor]) {
        if (visited[nextColor][neighbor]) {
          continue;
        }

        visited[nextColor][neighbor] = true;
        queue.push(new QueueItem(neighbor, nextColor));
      }
    }

    steps++;
  }

  return answer;
};

/**
 * @param {number} n
 * @param {number[][]} red_edges
 * @param {number[][]} blue_edges
 * @return {number[]}
 */
// DFS (BROKEN)
// const shortestAlternatingPaths = function (n, blueEdges, redEdges) {
//   const answer = Array(n).fill(Infinity);
//   const graph = {};

//   for (let i = 0; i < n; i++) {
//     graph[i] = { [RED]: [], [BLUE]: [] };
//   }

//   for (const [from, to] of blueEdges) {
//     graph[from][RED].push(to);
//   }

//   for (const [from, to] of redEdges) {
//     graph[from][BLUE].push(to);
//   }

//   dfs(0, RED, 0, new Set());
//   dfs(0, BLUE, 0, new Set());

//   return answer.map((i) => (i === Infinity ? -1 : i));

//   function dfs(node, pathColor, steps, seen) {
//     const key = setKey(node, pathColor);

//     if (seen.has(key)) {
//       return;
//     }

//     seen.add(key);
//     answer[node] = Math.min(answer[node], steps);

//     const nextPathColor = pathColor === BLUE ? RED : BLUE;

//     for (const neighbor of graph[node][pathColor]) {
//       dfs(neighbor, nextPathColor, steps + 1, seen);
//     }
//   }
// };

console.log(
  JSON.stringify(
    shortestAlternatingPaths(
      3,
      [
        [0, 1],
        [1, 2],
      ],
      []
    )
  )
); // [0, 1, -1]

console.log(JSON.stringify(shortestAlternatingPaths(3, [[0, 1]], [[2, 1]]))); // [0, 1, -1]

console.log(JSON.stringify(shortestAlternatingPaths(3, [[1, 0]], [[2, 1]]))); // [0, 1, -1]

console.log(JSON.stringify(shortestAlternatingPaths(3, [[0, 1]], [[1, 2]]))); // [0, 1, 2]

console.log(
  JSON.stringify(
    shortestAlternatingPaths(
      3,
      [
        [0, 1],
        [0, 2],
      ],
      [[1, 0]]
    )
  )
); // [0, 1, 1]

console.log(
  JSON.stringify(
    shortestAlternatingPaths(
      5,
      [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
      ],
      [
        [1, 2],
        [2, 3],
        [3, 1],
      ]
    )
  )
); // [0, 1, 2, 3, 7]

console.log(
  JSON.stringify(
    shortestAlternatingPaths(
      5,
      [
        [2, 2],
        [0, 1],
        [0, 3],
        [0, 0],
        [0, 4],
        [2, 1],
        [2, 0],
        [1, 4],
        [3, 4],
      ],
      [
        [1, 3],
        [0, 0],
        [0, 3],
        [4, 2],
        [1, 0],
      ]
    )
  )
); // [0,1,2,1,1]
