/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
var isRectangleOverlap = function (rec1, rec2) {
  const TOP = 3;
  const BOTTOM = 1;
  const LEFT = 0;
  const RIGHT = 2;

  //rec1 higher than rec2
  if (rec1[BOTTOM] >= rec2[TOP]) {
    return false;
  }

  //rec1 lower than rec2
  if (rec1[TOP] <= rec2[BOTTOM]) {
    return false;
  }

  //rec1 left of rec2
  if (rec1[RIGHT] <= rec2[LEFT]) {
    return false;
  }

  //rec1 right of rec2
  if (rec1[LEFT] >= rec2[RIGHT]) {
    return false;
  }

  return true;

};

//
console.log(isRectangleOverlap([0, 0, 2, 2], [1, 1, 3, 3])); //true
console.log(isRectangleOverlap([0, 0, 1, 1], [1, 0, 2, 1])); //false

