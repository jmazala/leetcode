/**
 * Initialize your data structure here.
 */
const TimeMap = function () {
  this.data = {};
  return this;
};

/** 
 * @param {string} key 
 * @param {string} value 
 * @param {number} timestamp
 Stores the key and value along with given timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  this.data[key] = this.data[key] || [];
  this.data[key].unshift({ value, timestamp });
};

/** 
 * @param {string} key 
 * @param {number} timestamp
 returns a value such that set(key, value, timestamp_prev) was called previously 
 with timestamp_prev <= timestamp
 if multiple get the largest one
 else return empty string
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
  if (!(key in this.data)) {
    return '';
  }

  const entries = this.data[key];
  for (const entry of entries) {
    const timestampPrev = entry.timestamp;
    if (timestampPrev <= timestamp) {
      return entry.value;
    }
  }

  return '';
};

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

const tm = new TimeMap();
tm.set('foo', 'bar', 1);
console.log(tm.get('foo', 1)); // 'bar'
console.log(tm.get('foo', 3)); // 'bar'
tm.set('foo', 'bar2', 4);
console.log(tm.get('foo', 4)); // 'bar2'
console.log(tm.get('foo', 5)); // 'bar2'
console.log(tm.get('foo', 0)); // ''
console.log(tm.get('fooz', 3)); // ''

const tm2 = new TimeMap();
tm2.set('love', 'high', 10);
tm2.set('love', 'low', 20);
console.log(tm2.get('love', 5)); // ''
console.log(tm2.get('love', 10)); // 'high'
console.log(tm2.get('love', 15)); // 'high'
console.log(tm2.get('love', 20)); // 'low'
console.log(tm2.get('love', 25)); // 'low'
