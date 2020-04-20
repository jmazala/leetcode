/**
 * @param {string} s
 * @return {boolean}
 */

//greedy
var checkValidString = function (s, stack = []) {
  let leftBalance = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '*') {
      leftBalance++;
    } else {
      if (leftBalance <= 0) {
        return false; //out of order
      }

      leftBalance--;
    }
  }

  if (leftBalance < 0) { //outweighed by right side even with all the *
    return false;
  }

  let rightBalance = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === ')' || s[i] === '*') {
      rightBalance++;
    } else {
      if (rightBalance <= 0) {
        return false;
      }

      rightBalance--;
    }
  }

  if (rightBalance < 0) {
    return false;
  }

  return true;
}

//still O(3^n)... no bueno
// var checkValidString = function (s, stack = []) {
//   //any left parenthesis '(' must have a corresponding right parenthesis ')'.
//   for (let i = 0; i < s.length; i++) {
//     const c = s[i];

//     if (c === '*') {
//       const substring = s.slice(i + 1);
//       //replace with '('
//       return checkValidString('(' + substring, Array.from(stack)) ||
//         //replace with ')'
//         checkValidString(')' + substring, Array.from(stack)) ||
//         //replace with ''
//         checkValidString(substring, Array.from(stack));
//     }

//     if (c === '(') {
//       stack.push('(');
//       continue;
//     }

//     if (stack.pop() !== '(') {
//       return false;
//     }
//   }
//   // Any right parenthesis ')' must have a corresponding left parenthesis '('.
//   // left parenthesis '(' must go before the corresponding right parenthesis ')'.
//   //'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string.
//   return stack.length === 0;
// };

console.log(checkValidString('')); //true
console.log(checkValidString('***()')); //true
console.log(checkValidString('()')); //true
console.log(checkValidString('(*')); //true
console.log(checkValidString('*)')); //true
console.log(checkValidString('(*)')); //true
console.log(checkValidString('(*))')); //true
console.log(checkValidString('(')); //false
console.log(checkValidString(')')); //false
console.log(checkValidString('))')); //false
console.log(checkValidString(')(')); //false
console.log(checkValidString("((*")); //false
console.log(checkValidString("(((((*(()((((*((**(((()()*)()()()*((((**)())*)*)))))))(())(()))())((*()()(((()((()*(())*(()**)()(())"));