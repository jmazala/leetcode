// Input: S = "ab#c", T = "ad#c"
// Output: true

// Input: S = "ab##", T = "c#d#"
// Output: true
// Explanation: Both S and T become "".
/**
 * @param {string} S
 * @param {string} T
 * @return {boolean}
 */
var backspaceCompare = function (S, T) {
  let counterS = 0;
  let counterT = 0;
  let ptrS = S.length - 1;
  let ptrT = T.length - 1;

  while (ptrS >= 0 || ptrT >= 0) {
    while (ptrS >= 0) {
      if (S[ptrS] === '#') {
        counterS++;
        ptrS--;
      } else if (counterS > 0) {
        counterS--;
        ptrS--;
      } else {
        break;
      }
    }

    while (ptrT >= 0) {
      if (T[ptrT] === '#') {
        counterT++;
        ptrT--;
      } else if (counterT > 0) {
        counterT--;
        ptrT--;
      } else {
        break;
      }
    }

    if (ptrS >= 0 && ptrT >= 0 && S[ptrS] !== T[ptrT]) {
      return false;
    }

    if ((ptrS >= 0) !== (ptrT >= 0)) {
      return false;
    }

    ptrS--;
    ptrT--;
  }

  return true;
};

console.log(backspaceCompare("ab#c", "ad#c")); //true
console.log(backspaceCompare("ab##", "c#d#")); //true
console.log(backspaceCompare("a##c", "#a#c")); //true
console.log(backspaceCompare("a#c", "b")); //false