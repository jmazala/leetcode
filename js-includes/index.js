function LinkedListNode(val) {
  this.val = val;
  this.next = null;
  return this;
}
module.exports.LinkedListNode = LinkedListNode;
module.exports.ListNode = LinkedListNode;

LinkedListNode.prototype.print = function () {
  let output = '';
  let temp = this;
  while (temp) {
    output += temp.val;
    temp = temp.next;
    if (temp) {
      output += ' -> ';
    }
  }

  return output;
};

LinkedListNode.prototype.middle = function () {
  let slow = this;
  let fast = this;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

LinkedListNode.prototype.reverse = function () {
  let prev = null;
  let current = this;

  while (current) {
    const next = current;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
};

module.exports.mergeLists = function (list1, list2) {
  if (!list1) {
    return list2;
  }

  if (!list2) {
    return list1;
  }

  const values = [];
  while (list1 || list2) {
    if (list1) {
      values.push(list1);
      list1 = list1.next;
    }

    if (list2) {
      values.push(list2);
      list2 = list2.next;
    }
  }

  const dummyHead = new LinkedListNode();
  let temp = dummyHead;

  while (values.length) {
    temp.next = values.shift();
    temp = temp.next;
    temp.next = null;
  }

  return dummyHead.next;
};

function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
  return this;
}
module.exports.TreeNode = TreeNode;

function bstFromPreorder(preorder) {
  if (!preorder.length) {
    return null;
  }

  const root = new TreeNode(preorder[0]);
  if (preorder.length === 1) {
    return root;
  }

  let i = 1;
  while (i < preorder.length && preorder[i] < root.val) {
    i++;
  }

  root.left = bstFromPreorder(preorder.slice(1, i));
  root.right = bstFromPreorder(preorder.slice(i));
  return root;
}
module.exports.bstFromPreorder = bstFromPreorder;

function BinaryMatrix(arr) {
  this.arr = arr;
  return this;
}
module.exports.BinaryMatrix = BinaryMatrix;

BinaryMatrix.prototype.get = function (x, y) {
  return this.arr[x][y];
};

BinaryMatrix.prototype.dimensions = function () {
  return [this.arr.length, this.arr[0].length];
};

module.exports.isPalindrome = (s, start, end) => {
  if (s.length < 2) {
    return true;
  }

  if (start === undefined) {
    start = 0;
  }

  if (end === undefined) {
    end = s.length - 1;
  }

  while (start <= end) {
    if (s[start] !== s[end]) {
      return false;
    }

    start++;
    end--;
  }

  return true;
};

function swap(a, i, j) {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}
module.exports.swap = swap;

module.exports.reverseArray = (array, start, end) => {
  while (start < end) {
    swap(array, start++, end--);
  }
};
