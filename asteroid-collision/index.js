/**
 * @param {number[]} asteroids
 * @return {number[]}
 */

const allSameSign = (numbers) => {
  return numbers.every((i) => i < 0) || numbers.every((i) => i > 0);
};

const asteroidCollision = function (asteroids) {
  if (asteroids.length <= 1) {
    return asteroids;
  }

  let lastAsteroid = asteroids.shift();
  const stack = [lastAsteroid];

  while (asteroids.length) {
    const newAsteroid = asteroids.shift();

    // same direction, just add it
    if (
      (newAsteroid < 0 && lastAsteroid < 0) ||
      (newAsteroid > 0 && lastAsteroid > 0)
    ) {
      stack.push(newAsteroid);
      lastAsteroid = newAsteroid;
      continue;
    }

    // collide, explode each other
    if (newAsteroid === -1 * lastAsteroid) {
      stack.pop();
      lastAsteroid = stack[stack.length - 1];
      continue;
    }

    // new asteroid destroys last asteroid
    if (Math.abs(newAsteroid) > Math.abs(lastAsteroid)) {
      stack.pop();
      asteroids.unshift(newAsteroid);
      lastAsteroid = stack[stack.length - 1];
      continue;
    }
    // new asteroid is destroyed.  do nothing
  }

  return stack;
};

// console.log(asteroidCollision([5, 10, -5]));
// console.log(asteroidCollision([8, -8]));
// console.log(asteroidCollision([10, 2, -5]));
// console.log(asteroidCollision([10, 2, -5, 10]));
console.log(asteroidCollision([-2, -1, 1, 2]));
