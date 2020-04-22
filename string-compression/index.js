/**
 * @param {character[]} chars
 * @return {number}
 */
var compress = function (chars) {
  if (!chars.length) {
    return [];
  }

  if (chars.length == 1) {
    return chars;
  }

  //all i have to play with here are pointers
  //it doesn't care about case.
  let read = 0;
  let write = 0;
  const n = chars.length;

  while (read < n) {
    const current = chars[read];
    let count = 0;
    while (read < n && chars[read] === current) { //stopping point
      read++;
      count++;
    }

    chars[write] = current;
    write++;

    if (count === 1) {
      continue;
    }

    const numString = count.toString();
    for (let i = 0; i < numString.length; i++) {
      chars[write++] = numString[i];
    }
  }

  console.log(chars);
  return write;
};

console.log(compress(["a", "b", "b", "c", "c", "c", "d", "d", "d", "d", "e", "f"])); //["a","b","2","c","3","d","4","e","f"] (9)