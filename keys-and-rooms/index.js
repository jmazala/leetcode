/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function (rooms) {
  const seen = new Set([0]);

  const queue = [0];

  while (queue.length) {
    const keys = rooms[queue.shift()];

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      queue.push(key);
    }
  }

  return seen.size === rooms.length;
};

console.log(canVisitAllRooms([[1], [2], [3], []]));