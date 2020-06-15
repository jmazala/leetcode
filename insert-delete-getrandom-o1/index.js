const _ = require('lodash');

/**
 * Initialize your data structure here.
 */
const RandomizedSet = function () {
  this.indexes = {};
  this.values = [];
  return this;
};

/**
 * Inserts a value to the set. Returns true if the set did not already contain the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.insert = function (val) {
  if (this.indexes[val] >= 0) {
    return false;
  }

  this.values.push(val);
  this.indexes[val] = this.values.length - 1;
  return true;
};

/**
 * Removes a value from the set. Returns true if the set contained the specified element.
 * @param {number} val
 * @return {boolean}
 */
RandomizedSet.prototype.remove = function (val) {
  const valuesIndex = this.indexes[val];
  if (valuesIndex === undefined) {
    return false;
  }

  delete this.indexes[val];

  // swap the last element with the value, then pop
  if (valuesIndex === this.values.length - 1) {
    this.values.pop();
    return true;
  }

  const temp = this.values.pop();
  this.values[valuesIndex] = temp;
  this.indexes[temp] = valuesIndex;
  return true;
};

/**
 * Get a random element from the set.
 * @return {number}
 */
RandomizedSet.prototype.getRandom = function () {
  return this.values[_.random(0, this.values.length - 1)];
};

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
