/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
const minWindow = function (s, t) {
  let answer = '';
  let min = s.length + 1; // could be max int but it's fine like so
  let tPos = 0;

  // iterate through all possible characters in s
  for (let sPos = 0; sPos < s.length; sPos++) {
    if (s[sPos] === t[tPos]) {
      tPos++;

      if (tPos === t.length) {
        // we found a potential subsequence end.  work backwards
        const end = sPos + 1;
        tPos--;

        while (tPos >= 0) {
          if (s[sPos] === t[tPos]) {
            tPos--;
          }

          sPos--;
        }

        sPos++;
        tPos++;

        if (end - sPos < min) {
          min = end - sPos;
          answer = s.substring(sPos, end);
        }
      }
    }
  }

  return answer;
};

console.log(minWindow('abcdebdde', 'bde')); // bcde
