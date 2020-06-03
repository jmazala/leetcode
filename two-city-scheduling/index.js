const _ = require('lodash');

/**
 * @param {number[][]} costs
 * @return {number}
 */

//GREEDY
var twoCitySchedCost = function (costs) {
  if (costs.length === 0) {
    return 0;
  }

  let answer = 0;
  const N = costs.length / 2; //always even

  costs.sort((a, b) => {
    return (a[0] - a[1]) - (b[0] - b[1]);
  });

  for (let i = 0; i < N; i++) {
    answer += costs[i][0] + costs[i + N][1];
  }

  return answer;
};

//ALL PERMUTATIONS
// var twoCitySchedCost = function (costs) {
//   if (costs.length === 0) {
//     return 0;
//   }

//   let answer = Infinity;
//   const N = costs.length; //always even

//   helper([], [], 0);

//   return answer;

//   function helper(a, b, index) {
//     const currentSum = _.sum(a) + _.sum(b);
//     if (a.length > (N / 2) || b.length > (N / 2) || currentSum > answer) {
//       return;
//     }

//     if (a.length === N / 2 && b.length === a.length) {
//       answer = Math.min(answer, _.sum(a) + _.sum(b));
//       return;
//     }

//     a.push(costs[index][0]);
//     helper(a, b, index + 1);
//     a.pop();
//     b.push(costs[index][1]);
//     helper(a, b, index + 1);
//     b.pop();
//   }
// };

console.log(twoCitySchedCost([[10, 20], [30, 200], [400, 50], [30, 20]])); //110