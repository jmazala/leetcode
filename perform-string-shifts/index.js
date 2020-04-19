const LEFT = 0;
const RIGHT = 1;

/**
 * @param {string} s contains lowercse letters
 * @param {number[][]} shift contains [[direction, amount]]
 * @return {string}
 */
var stringShift = function (s, shift) {
  let leftShifts = 0;
  //strings are immutable anyway...

  for (let i = 0; i < shift.length; i++) {
    let [direction, amount] = shift[i];
    if (amount === 0 || amount === s.length) {
      continue;
    }

    amount = amount % s.length;
    if (direction === LEFT) {
      leftShifts += amount;
    } else {
      leftShifts -= amount;
    }
  }

  while (leftShifts < 0) {
    s = shiftRight(s);
    leftShifts++;
  }

  while (leftShifts > 0) {
    s = shiftLeft(s);
    leftShifts--;
  }

  return s;
};

// var stringShift = function (s, shift) {
//   //strings are immutable anyway...

//   for (let i = 0; i < shift.length; i++) {
//     let [direction, amount] = shift[i];
//     if (amount === 0 || amount === s.length) {
//       continue;
//     }

//     amount = amount % s.length;

//     while (amount > 0) {
//       if (direction === LEFT) {
//         s = shiftLeft(s);
//       } else {
//         s = shiftRight(s);
//       }

//       amount--;
//     }
//   }

//   return s;
// };

//left shift by 1 means remove first char of s and append it to the end
function shiftLeft(s) {
  return s.slice(1) + s[0];
}

//right shift by 1 means remove last char of s and add it to the beginning
function shiftRight(s) {
  return s[s.length - 1] + s.slice(0, -1);
}

//abc
//LEFT 1 = bca
//LEFT 2 = cab
//LEFT 3 = abc

//RIGHT 1 = cab
//RIGHT 2 = bca
//RIGHT 3 = abc

//[0,1] means shift to left by 1. "abc" -> "bca"
//[1,2] means shift to right by 2. "bca" -> "cab"
console.log(stringShift('abc', [[0, 1], [1, 2]])); //cab

// [1,1] means shift to right by 1. "abcdefg" -> "gabcdef"
// [1,1] means shift to right by 1. "gabcdef" -> "fgabcde"
// [0,2] means shift to left by 2. "fgabcde" -> "abcdefg"
// [1,3] means shift to right by 3. "abcdefg" -> "efgabcd"
console.log(stringShift('abcdefg', [[1, 1], [1, 1], [0, 2], [1, 3]])); //efgabcd