const _ = require('lodash');

/**
 * @param {number[][]} people
 * @return {number[][]}
 */
var reconstructQueue = function (people) {
  if (people.length < 2) {
    return people;
  }

  const answer = [];
  people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0]);

  for (const person of people) {
    answer.splice(person[1], 0, person);
  }

  return answer;
};

console.log(JSON.stringify(reconstructQueue([[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]))); //[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
console.log(JSON.stringify(reconstructQueue([]))); // []
console.log(JSON.stringify(reconstructQueue([[2, 1], [2, 0]]))); // [[2,0],[2,1]]
console.log(JSON.stringify(reconstructQueue([[2, 0], [2, 1]]))); // [[2,0],[2,1]]
console.log(JSON.stringify(reconstructQueue([[9, 0], [7, 0], [1, 9], [3, 0], [2, 7], [5, 3], [6, 0], [3, 4], [6, 2], [5, 2]]))); //[[3,0],[6,0],[7,0],[5,2],[3,4],[5,3],[6,2],[2,7],[9,0],[1,9]]