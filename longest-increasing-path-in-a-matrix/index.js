const DIRECTIONS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

/**
 * @param {number[][]} matrix
 * @return {number}
 */
//WITH DFS + MEMOIZATION (time limit exceeded without memo)
var longestIncreasingPath = function (matrix) {
  const M = matrix.length;
  if (!M) {
    return 0;
  }

  const N = matrix[0].length;
  let answer = 0;
  const memo = Array(M).fill().map(i => Array(N).fill(0));

  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      answer = Math.max(answer, dfs(i, j));
    }
  }

  return answer;

  function dfs(i, j) {
    if (memo[i][j] > 0) {
      return memo[i][j];
    }

    let maxPathFromHere = 1;

    for (const [iDelta, jDelta] of DIRECTIONS) {
      const nextI = i + iDelta;
      const nextJ = j + jDelta;

      if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N || matrix[nextI][nextJ] <= matrix[i][j]) {
        continue;
      }

      const furtherDFSPath = 1 + dfs(nextI, nextJ);
      maxPathFromHere = Math.max(maxPathFromHere, furtherDFSPath);
    }

    memo[i][j] = maxPathFromHere;
    return maxPathFromHere;
  }
};

//WITH TOPOLOGICAL SORT (BFS BACKWARDS)
// var longestIncreasingPath = function (matrix) {
//   const M = matrix.length;
//   if (!M) {
//     return 0;
//   }

//   const N = matrix[0].length;
//   if (N == 0) {
//     return 0;
//   }

//   //build adjacency counts so we can do topological sort
//   const adjacencyCounts = Array(M).fill().map(i => Array(N).fill(0));
//   const queue = [];

//   for (let i = 0; i < M; i++) {
//     for (let j = 0; j < N; j++) {
//       for (const [iDelta, jDelta] of DIRECTIONS) {
//         const nextI = i + iDelta;
//         const nextJ = j + jDelta;

//         if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N || matrix[nextI][nextJ] <= matrix[i][j]) {
//           continue;
//         }

//         adjacencyCounts[i][j]++;
//       }

//       if (adjacencyCounts[i][j] === 0) {
//         queue.push([i, j]);
//       }
//     }
//   }

//   let answer = 0;

//   //now, starting at the local highest points,
//   //BFS down and see if any neighbors are local highs too
//   while (queue.length) {
//     let numNodes = queue.length;

//     while (numNodes > 0) {
//       const [i, j] = queue.shift();
//       numNodes--;

//       for (const [iDelta, jDelta] of DIRECTIONS) {
//         const nextI = i + iDelta;
//         const nextJ = j + jDelta;

//         if (nextI < 0 || nextJ < 0 || nextI >= M || nextJ >= N || matrix[nextI][nextJ] >= matrix[i][j]) {
//           continue;
//         }

//         adjacencyCounts[nextI][nextJ]--;
//         if (adjacencyCounts[nextI][nextJ] === 0) {
//           queue.push([nextI, nextJ])
//         }
//       }
//     }

//     answer++;
//   }

//   return answer;
// };

//WITH BFS(FORWARDS) (time limit exceeded)
// var longestIncreasingPath = function (matrix) {
//   const M = matrix.length;
//   if (!M) {
//     return 0;
//   }

//   const N = matrix[0].length;
//   if (N == 0) {
//     return 0;
//   }

//   const queue = [];

//   for (let i = 0; i < M; i++) {
//     for (let j = 0; j < N; j++) {
//       for (const [iDelta, jDelta] of DIRECTIONS) {
//         const nextI = i + iDelta;
//         const nextJ = j + jDelta;

//         if (nextI >= 0 && nextJ >= 0 && nextI < M && nextJ < N && matrix[nextI][nextJ] > matrix[i][j]) {
//           queue.push([i, j]);
//           break;
//         }
//       }
//     }
//   }

//   if (!queue.length) {
//     return 1;
//   }

//   let answer = 0;

//   //BFS and track levels
//   while (queue.length) {
//     let numNodes = queue.length;
//     answer++;
//     while (numNodes) {
//       const [i, j] = queue.shift();
//       numNodes--;

//       for (const [iDelta, jDelta] of DIRECTIONS) {
//         const nextI = i + iDelta;
//         const nextJ = j + jDelta;
//         if (nextI >= 0 && nextJ >= 0 && nextI < M && nextJ < N && matrix[nextI][nextJ] > matrix[i][j]) {
//           queue.push([nextI, nextJ]);
//         }
//       }
//     }
//   }

//   return answer;
// };

console.log(longestIncreasingPath([
  [9, 9, 4],
  [6, 6, 8],
  [2, 1, 1]
])); //4 [1, 2, 6, 9]

console.log(longestIncreasingPath([
  [3, 4, 5],
  [3, 2, 6],
  [2, 2, 1]
])); //4 [3, 4, 5, 6]

console.log(longestIncreasingPath([
  [7, 8, 9],
  [9, 7, 6],
  [7, 2, 3]
])); //6 [2, 3, 6, 7, 8, 9]