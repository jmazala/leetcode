//note on leetcode this was the slower of 2 solutions
// var findComplement = function (num) {
//   let length = 0;
//   let temp = 1;
//   while (temp < num) {
//     length++;
//     temp *= 2;
//   }

//   return num ^ parseInt(_.padStart('', length, '1'), 2);
// };

/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function (num) {
  //not great at bitwise operators
  //so i'm going to do some crimes against humanity here

  //we need to find out the length in bits of num
  const sNum = num.toString(2);
  const xorB = _.padStart('', sNum.length, '1');
  return parseInt(sNum, 2) ^ parseInt(xorB, 2);
};