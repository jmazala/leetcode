/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  if (chars.length < 2) {
    return chars.length;
  }

  let read = 0;
  let write = 0;

  while (read < chars.length) {
    const current = chars[read++];
    let count = 1;

    while (read < chars.length && chars[read] === current) {
      read++;
      count++;
    }

    chars[write++] = current;
    if (count === 1) {
      continue;
    }

    for (const c of count.toString()) {
      chars[write++] = c;
    }
  }

  return write;
};

console.log(compress(["a", "b", "b", "c", "c", "c", "d", "d", "d", "d", "e", "f"])); //["a","b","2","c","3","d","4","e","f"] (9)