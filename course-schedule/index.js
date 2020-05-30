/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */

// USING ARRAYS (248ms, 42.3MB)
var canFinish = function (numCourses, prerequisites) {
  if (!prerequisites.length) {
    return true;
  }
  
  const edges = new Array(numCourses).fill().map(i => new Array().fill());
  
  for (const [course, prereq] of prerequisites) {
    edges[course].push(prereq);
  }

  const visited = Array(numCourses).fill(false);
  const recursionStack = Array(numCourses).fill(false);
  
  for (let i = 0; i < numCourses; i++) {
    if (dfsDetectCycle(i)) {
      return false;
    }
  }

  return true;

  function dfsDetectCycle(course) {
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