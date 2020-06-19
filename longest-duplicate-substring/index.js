const P = 2 ** 63 - 1;

/**
 * @param {string} S
 * @return {string}
 */
// BINARY SEARCH FOR DUPLICATED SUBSTRINGS WITH RABIN-KARP
// NOTE:  I CAN'T GET THIS TO WORK FOR LONG CASES AND I DON'T KNOW WHY
// SEE (EQUIVALENT?) PYTHON SOLUTION
const longestDupSubstring = function (S) {
  const nums = Array(S.length);
  for (let i = 0; i < S.length; i++) {
    nums[i] = S[i].charCodeAt(0);
  }

  let low = 0;
  let high = S.length - 1;
  let start = 0;

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const pos = rabinKarp(mid);

    if (pos === -1) {
      // didn't find one.  must be smaller
      high = mid - 1;
    } else {
      // found one, but could have a bigger one
      start = pos;
      low = mid + 1;
    }
  }

  return S.slice(start, start + low - 1);

  // using rabin-karp algorithm
  function rabinKarp(mid) {
    let curHash = 0;

    for (let i = 0; i < mid; i++) {
      curHash = (curHash * 26 + nums[i]) % P;
    }

    const hashes = new Set([curHash]);
    let pos = -1;
    const maxPow = 26 ** mid % P;

    for (let i = mid; i < S.length; i++) {
      curHash = (26 * curHash - nums[i - mid] * maxPow + nums[i]) % P;
      if (hashes.has(curHash)) {
        pos = i + 1 - mid;
      }

      hashes.add(curHash);
    }

    return pos;
  }
};

// BINARY SEARCH FOR DUPLICATED SUBSTRINGS WITHOUT RABIN-KARP (TLE)
// const longestDupSubstring = function (S) {
//   const hash = {};
//   for (let i = 0; i < S.length; i++) {
//     const c = S[i];
//     hash[c] = hash[c] || [];
//     hash[c].push(i);
//   }

//   let low = 0;
//   let high = S.length;
//   let answer = '';

//   while (low <= high) {
//     const mid = low + Math.floor((high - low) / 2);
//     const dupSubstring = findDuplicateSubstring(mid);
//     if (dupSubstring) {
//       answer = dupSubstring;
//       low = mid + 1;
//     } else {
//       high = mid - 1;
//     }
//   }

//   return answer;

//   function findDuplicateSubstring(l) {
//     for (let start = 0; start < S.length; start++) {
//       const end = start + l - 1;
//       if (end >= S.length) {
//         break; // exceeded length of string.  can't do it
//       }

//       let search = true;
//       const subString = S.slice(start, end + 1);
//       // if any character in subString appears once
//       // we can advance the entire window
//       for (let i = 0; i < subString.length; i++) {
//         const c = subString[i];
//         if (hash[c].length === 1) {
//           search = false;
//           start += i - 1; // -1 because we do ++ in the for loop
//         }
//       }

//       if (search) {
//         const firstChar = S[start];
//         for (const k of hash[firstChar]) {
//           if (k <= start) {
//             continue;
//           }

//           if (S.startsWith(subString, k)) {
//             return subString;
//           }
//         }
//       }
//     }

//     return '';
//   }
// };

// LOOK FOR DUPLICATED SUBSTRINGS OF EACH LENGTH LINEARLY
// var longestDupSubstring = function(S) {
//   for (let l = S.length - 1; l >= 0; l--) {
//     const dupSubstring = findDuplicateSubstring(l);
//     if (dupSubstring) {
//       return dupSubstring;
//     }
//   }

//   return '';

//   function findDuplicateSubstring(l) {
//     for (let start = 0; start < S.length; start++) {
//       let end = start + l - 1;
//       if (end >= S.length) {
//         continue; //exceeded length of string.  can't do it.
//       }

//       const substring = S.slice(start, end + 1);

//       //see if we can find this substring again further down
//       for (let k = start + 1; k <= (S.length - substring.length + 1); k++) {
//         if (S.startsWith(substring, k)) {
//           return substring;
//         }
//       }
//     }
//   }
// }

// BRUTE FORCE WITH A HASH
// var longestDupSubstring = function(S) {
//   const hash = {};
//   for (let i = 0; i < S.length; i++) {
//     const c = S[i];
//     hash[c] = hash[c] || [];
//     hash[c].push(i);
//   }

//   const substrings = {'': 0};
//   let answer = '';

//   //duplicated substrings can only start from chars with more than 1 index
//   for (const [startingLetter, indices] of Object.entries(hash)) {
//     if (indices.length < 2) {
//       continue;
//     }

//     for (const i of indices) {
//       const substringArray = [];
//       for (let j = i; j < S.length; j++) {
//         substringArray.push(S[j]);
//         const substring = substringArray.join('');
//         substrings[substring] = substrings[substring] || 0;
//         substrings[substring]++;

//         if (substrings[substring] >= 2 && substring.length > answer.length) {
//           answer = substring;
//         }
//       }
//     }
//   }

//   return answer;
// };

console.log(longestDupSubstring('aa')); // a
console.log(longestDupSubstring('abcvidavidbakyjvidcbakyjx')); // bakyj
