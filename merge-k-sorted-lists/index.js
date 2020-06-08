/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  lists = lists.filter(i => !!i);
  const dummyHead = new ListNode();
  let temp = dummyHead;

  //keep iterating through the lists, pull smallest element
  while (lists.length) {
    let minValue = Infinity;
    let minIndex = -1;

    for (let i = 0; i < lists.length; i++) {
      if (lists[i].val < minValue) {
        minValue = lists[i].val;
        minIndex = i;
      }
    }

    temp.next = new ListNode(lists[minIndex].val);
    lists[minIndex] = lists[minIndex].next;

    if (!lists[minIndex]) {
      lists.splice(minIndex, 1);
    }

    temp = temp.next;
  }
  return dummyHead.next;
};