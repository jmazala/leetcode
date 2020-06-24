/**
 * @param {string[]} logs
 * @return {string[]}
 */
const reorderLogFiles = function (logs) {
  logs.sort((a, b) => {
    const splitA = a.split(' ');
    const splitB = b.split(' ');

    const isDigitA = !isNaN(+splitA[1]);
    const isDigitB = !isNaN(+splitB[1]);

    // easy to sort digits.  but not these arrays of words
    if (!isDigitA && !isDigitB) {
      const compStringA = splitA.slice(1).join(' ');
      const compStringB = splitB.slice(1).join(' ');
      const comp = compStringA.localeCompare(compStringB);
      if (comp !== 0) {
        return comp;
      }

      return splitA[0].localeCompare(splitB[0]);
    }

    if (isDigitA) {
      if (isDigitB) {
        return 0;
      }

      return 1;
    }

    return -1;
  });

  return logs;
};

console.log(
  JSON.stringify(
    reorderLogFiles([
      'dig1 8 1 5 1',
      'let1 art can',
      'dig2 3 6',
      'let2 own kit dig',
      'let3 art zero',
    ])
  )
); // ["let1 art can","let3 art zero","let2 own kit dig","dig1 8 1 5 1","dig2 3 6"]

console.log(
  JSON.stringify(
    reorderLogFiles([
      'a1 9 2 3 1',
      'g1 act car',
      'zo4 4 7',
      'ab1 off key dog',
      'a8 act zoo',
    ])
  )
); // ["g1 act car","a8 act zoo","ab1 off key dog","a1 9 2 3 1","zo4 4 7"]
