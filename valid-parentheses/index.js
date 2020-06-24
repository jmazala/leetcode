/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  if (s.length === 0) {
    return true;
  }

  const expect = [];

  s = Array.from(s);

  while (s.length > 0) {
    const c = s.shift();

    switch (c) {
      case '(':
        expect.push(')');
        break;
      case '{':
        expect.push('}');
        break;
      case '[':
        expect.push(']');
        break;
      case ')':
        if (expect.pop() !== ')') {
          return false;
        }
        break;
      case '}':
        if (expect.pop() !== '}') {
          return false;
        }
        break;
      case ']':
        if (expect.pop() !== ']') {
          return false;
        }
        break;
      default:
        break;
    }
  }

  return expect.length === 0;
};
