/**
 * @param {string} s
 * @return {boolean}
 */

//match regex to ignore chars
//46.57%, 42.8MB
var isPalindrome = function(s) {
  if (s.length < 2) {
      return true;
  }

  s = (s.toLowerCase().match(/[a-z0-9]/g) || []).join('');

  for (let i = 0; i < s.length; i++) {
      if (s[i] !== s[s.length - 1 - i]) {
          return false;
      }
  }

  return true;
};

//CHECKING CHARS.
//31.05%, 384.MB
const ORD_MIN_CHAR = 'a'.charCodeAt(0);
const ORD_MAX_CHAR = 'z'.charCodeAt(0);
const ORD_MIN_NUM = '0'.charCodeAt(0);
const ORD_MAX_NUM = '9'.charCodeAt(0);

// var isPalindrome = function (s) {
//   if (s.length < 2) {
//     return true;
//   }

//   s = s.toLowerCase();
//   let left = 0;
//   let right = s.length - 1;

//   while (left < right) {
//     if (isInvalid(left)) {
//       left++;
//       continue;
//     }

//     if (isInvalid(right)) {
//       right--;
//       continue;
//     }

//     if (s[left] !== s[right]) {
//       return false;
//     }

//     left++;
//     right--;
//   }

//   return true;

//   function isInvalid(i) {
//     return !isCharacter(i) && !isNumber(i);
//   }
  
//   function isCharacter(i) {
//     const code = s.charCodeAt(i);
//     return code >= ORD_MIN_CHAR && code <= ORD_MAX_CHAR;
//   }
  
//   function isNumber(i) {
//     const code = s.charCodeAt(i);
//     return code >= ORD_MIN_NUM && code <= ORD_MAX_NUM;
//   }
// }

console.log(isPalindrome("\"Sue,\" Tom smiles, \"Selim smote us.\"")); //true
console.log(isPalindrome('a a')); //true
console.log(isPalindrome('...')); //true
console.log(isPalindrome('')); //true
console.log(isPalindrome('A')); //true
console.log(isPalindrome('A man, a plan, a canal: Panama')); //true
console.log(isPalindrome('race a car')); //false
console.log(isPalindrome('0P')); //false
console.log(isPalindrome('1A2')); //false