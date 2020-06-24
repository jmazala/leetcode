/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
const strStr = function (haystack, needle) {
  if (needle === haystack || needle === '') {
    return 0;
  }

  for (let i = 0; i < haystack.length; i++) {
    if (i + needle.length > haystack.length) {
      break;
    }

    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        break;
      }

      if (j === needle.length - 1) {
        return i;
      }
    }
  }

  return -1;
};
