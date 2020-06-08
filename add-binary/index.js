const _ = require('lodash');

/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */

// THIS DOESNT WORK BECAUSE OVERFLOWS
// var addBinary = function(a, b) {
//     return (parseInt(a, 2) + parseInt(b, 2)).toString(2);
// };

const addBinary = function (a, b) {
  const maxLength = Math.max(a.length, b.length);

  // could use 2 pointers but this is just much easier to read
  a = _.padStart(a, maxLength, '0');
  b = _.padStart(b, maxLength, '0');

  let carry = false;
  const answer = [];

  for (let i = maxLength - 1; i >= 0; i--) {
    const x = a[i];
    const y = b[i];

    if (x === '0' && y === '0') {
      if (carry) {
        answer.unshift(1);
      } else {
        answer.unshift(0);
      }
      carry = false;
    } else if (x ^ y) {
      // only one is '1'
      if (carry) {
        answer.unshift(0);
      } else {
        answer.unshift(1);
      }
    } else {
      // they are both '1'
      if (carry) {
        answer.unshift(1);
      } else {
        answer.unshift(0);
      }

      carry = true;
    }
  }

  if (carry) {
    answer.unshift(1);
  }

  return answer.join('');
};

console.log(addBinary('11', '1')); // 100
