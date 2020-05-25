/**
 * @param {string} s
 * @return {boolean}
 */

//greedy.  1 loop
var checkValidString = function (s) {
  let leftIndex = 0;
  let leftBalance = 0;
  let rightIndex = s.length - 1;
  let rightBalance = 0;

  while (rightIndex >= 0) {
    const cLeft = s[leftIndex++];
    const cRight = s[rightIndex--];

    if (cLeft === '(' || cLeft === '*') {
      leftBalance++;
    } else {
      leftBalance--;
      if (leftBalance < 0) {
        return false;
      }
    }

    if (cRight === ')' || cRight === '*') {
      rightBalance++;
    } else {
      rightBalance--;
      if (rightBalance < 0) {
        return false;
      }
    }
  }

  return true;
};

//greedy.  2 loops
// var checkValidString = function (s, stack = []) {
//   let leftBalance = 0;

//   for (let i = 0; i < s.length; i++) {
//     if (s[i] === '(' || s[i] === '*') {
//       leftBalance++;
//     } else {
//       if (leftBalance <= 0) {
//         return false; //out of order
//       }

//       leftBalance--;
//     }
//   }

//   if (leftBalance < 0) { //outweighed by right side even with all the *
//     return false;
//   }

//   let rightBalance = 0;
//   for (let i = s.length - 1; i >= 0; i--) {
//     if (s[i] === ')' || s[i] === '*') {
//       rightBalance++;
//     } else {
//       if (rightBalance <= 0) {
//         return false;
//       }

//       rightBalance--;
//     }
//   }

//   if (rightBalance < 0) {
//     return false;
//   }

//   return true;
// }