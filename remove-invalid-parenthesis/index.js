/**
 * @param {string} s
 * @return {string[]}
 */
const removeInvalidParentheses = function (s) {
  const result = new Set();
  let leftToRemove = 0;
  let rightToRemove = 0;

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '(') {
      leftToRemove++;
      continue;
    }

    // we want to remove MINIMUM number of parenthesis.  can't just blast them all
    // that's why we keep track of balance
    if (c === ')') {
      // Decrement count of left parentheses because we have found a right
      // which CAN be a matching one for a left.
      if (leftToRemove) {
        leftToRemove--;
      } else {
        // If we don't have a matching left, then this is a misplaced right.
        // that means we could potentially remove it
        rightToRemove++;
      }
    }
  }

  helper(0, 0, 0, leftToRemove, rightToRemove, '');
  return Array.from(result);

  function helper(
    index,
    leftCount,
    rightCount,
    numLeftToRemove,
    numRightToRemove,
    prefix
  ) {
    // base case.  we've removed all the parens we need to
    if (index === s.length) {
      if (!numLeftToRemove && !numRightToRemove) {
        result.add(prefix);
      }

      return;
    }

    const c = s[index];

    // try to discard the '('
    if (c === '(' && numLeftToRemove) {
      helper(
        index + 1,
        leftCount,
        rightCount,
        numLeftToRemove - 1,
        numRightToRemove,
        prefix
      );
    } else if (c === ')' && numRightToRemove) {
      // try to discard the ')'
      helper(
        index + 1,
        leftCount,
        rightCount,
        numLeftToRemove,
        numRightToRemove - 1,
        prefix
      );
    }

    // othewise use the character, paren or otherwise
    prefix += c;

    // if not a parenthesis just go on
    if (c !== '(' && c !== ')') {
      helper(
        index + 1,
        leftCount,
        rightCount,
        numLeftToRemove,
        numRightToRemove,
        prefix
      );
      return;
    }

    // didn't remove it.  try using it
    if (c === '(') {
      helper(
        index + 1,
        leftCount + 1,
        rightCount,
        numLeftToRemove,
        numRightToRemove,
        prefix
      );
      return;
    }

    // c is a ')' && we still need to use right parens to balance
    if (rightCount < leftCount) {
      helper(
        index + 1,
        leftCount,
        rightCount + 1,
        numLeftToRemove,
        numRightToRemove,
        prefix
      );
    }
  }
};

console.log(JSON.stringify(removeInvalidParentheses('n')));
console.log(JSON.stringify(removeInvalidParentheses('()())()'))); // ["(())()", "()()()"]
console.log(JSON.stringify(removeInvalidParentheses(')('))); // ['']
console.log(JSON.stringify(removeInvalidParentheses('x('))); // ['x']
