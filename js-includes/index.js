'use strict';

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
  return this;
};

function BinaryMatrix(arr) {
  this.arr = arr;
  return this;
}

BinaryMatrix.prototype.get = function (x, y) {
  return this.arr[x][y];
};

BinaryMatrix.prototype.dimensions = function() {
  return [this.arr.length, this.arr[0].length];
};

module.exports.TreeNode = TreeNode;
module.exports.BinaryMatrix = BinaryMatrix;