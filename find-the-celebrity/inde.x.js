/**
 * Definition for knows()
 * 
 * @param {integer} person a
 * @param {integer} person b
 * @return {boolean} whether a knows b
 * knows = function(a, b) {
 *     ...
 * };
 */

/**
 * @param {function} knows()
 * @return {function}
 */
var solution = function (knows) {
  /**
   * @param {integer} n Total people
   * @return {integer} The celebrity
   */
  return function (n) {
    const stack = _.range(n);

    while (stack.length > 1) {
      const a = stack.pop();
      const b = stack.pop();

      const aKnowsB = knows(a, b);
      const bKnowsA = knows(b, a);

      if (aKnowsB && !bKnowsA) { //B is a candidate
        stack.push(b);
      } else if (bKnowsA && !aKnowsB) { //A is a candidate
        stack.push(a);
      }
    }

    if (stack.length === 0) {
      return -1;
    }

    //last element in stack is candidate.  do 1 final pass
    const candidate = stack.pop();

    for (let i = 0; i < n; i++) {
      if (i === candidate) {
        continue;
      }

      if (knows(candidate, i) || !knows(i, candidate)) {
        return -1;
      }
    }

    return candidate;
  };
};