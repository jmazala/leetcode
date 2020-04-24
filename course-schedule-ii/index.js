const _ = require('lodash');

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  if (numCourses === 0) {
    return [];
  }

  if (prerequisites.length === 0) {
    return _.range(numCourses);
  }

  const queue = [];
  const nodeDegrees = Array(numCourses).fill(0);
  const edges = Array(numCourses).fill().map(i => Array(0).fill());

  prerequisites.forEach(prereq => {
    edges[prereq[1]].push(prereq[0]);
    nodeDegrees[prereq[0]]++;
  });

  nodeDegrees.forEach((degrees, node) => {
    if (degrees === 0) {
      queue.push(node);
    }
  });

  const topologicalSort = [];
  while (queue.length) {
    const node = queue.shift();
    topologicalSort.push(node);

    edges[node].forEach(neighbor => {
      nodeDegrees[neighbor]--;

      if (nodeDegrees[neighbor] === 0) {
        queue.push(neighbor);
      }
    });
  }

  return topologicalSort.length === numCourses ? topologicalSort : [];
};

console.log(findOrder(0, [[1, 0]])); // [] because no courses
console.log(findOrder(2, [[1, 0], [0, 1]])); // [] because cycle
console.log(findOrder(2, [[1, 0]])); // [0, 1]
console.log(findOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])); // [0, 1, 2, 3]
console.log(findOrder(5, [])); // [0, 1, 2, 3, 4]
console.log(findOrder(3, [[2, 1], [1, 0]])); //[0,1,2]