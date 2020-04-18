/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
//USING SET / HASH (532ms, 42.3MB)
// var canFinish = function (numCourses, prerequisites) {
//   const visited = new Set();
//   const edges = {};

//   prerequisites.forEach(p => {
//     edges[p[0]] = edges[p[0]] || [];
//     edges[p[0]].push(p[1]);
//   })

//   for (let i = 0; i < numCourses; i++) {
//     if (dfsDetectCycle(i, visited, new Set())) {
//       return false;
//     }
//   }

//   return true;

//   function dfsDetectCycle(course, recursionSet) {
//     if (recursionSet.has(course)) {
//       return true;
//     }

//     if (visited.has(course)) {
//       return false;
//     }

//     visited.add(course);
//     recursionSet.add(course);

//     const prereqs = edges[course] || [];
//     for (let i = 0; i < prereqs.length; i++) {
//       if (dfsDetectCycle(prereqs[i], recursionSet)) {
//         return true;
//       }
//     }

//     recursionSet.delete(course);
//     return false;
//   }
// };

// USING ARRAYS (248ms, 42.3MB)
var canFinish = function (numCourses, prerequisites) {
  const visited = new Array(numCourses);
  const edges = new Array(numCourses).fill().map(i => new Array().fill());

  prerequisites.forEach(p => {
    edges[p[0]].push(p[1]);
  })

  for (let i = 0; i < numCourses; i++) {
    if (dfsDetectCycle(i, visited, new Array(numCourses))) {
      return false;
    }
  }

  return true;

  function dfsDetectCycle(course, recursionStack) {
    if (recursionStack[course]) {
      return true;
    }

    if (visited[course]) {
      return false;
    }

    visited[course] = true;
    recursionStack[course] = true;

    const prereqs = edges[course];
    for (let i = 0; i < prereqs.length; i++) {
      if (dfsDetectCycle(prereqs[i], recursionStack)) {
        return true;
      }
    }

    recursionStack[course] = false;
    return false;
  }
};

console.log(canFinish(2, [[1, 0]])); //true
console.log(canFinish(2, [[1, 0], [0, 1]])); //false