/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
const isAlienSorted = function (words, order) {
  const hash = {};
  for (let i = 0; i < order.length; i++) {
    hash[order[i]] = i;
  }

  for (let i = 0; i < words.length - 1; i++) {
    const firstWord = words[i];
    const nextWord = words[i + 1];

    if (firstWord.length > nextWord.length && firstWord.startsWith(nextWord)) {
      return false;
    }

    for (let j = 0; j < Math.min(firstWord.length, nextWord.length); j++) {
      const firstIndex = hash[firstWord[j]];
      const nextIndex = hash[nextWord[j]];

      // if they're equal it's fine.  move on
      if (firstIndex === nextIndex) {
        continue;
      }

      // if first is lexicographically after it's fine and we don't need to search anymore
      if (firstIndex < nextIndex) {
        break;
      }

      // if first is lexicographically before it's a violation
      return false;
    }
  }

  return true;
};
