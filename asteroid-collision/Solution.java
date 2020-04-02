import java.util.Stack;

class Solution {
  public int[] asteroidCollision(int[] asteroids) {
    if (asteroids.length <= 1) {
      return asteroids;
    }

    // track which asteroids will collide and in what order
    Stack<Integer> stack = new Stack<>();
    for (int newAsteroid : asteroids) {
      if (newAsteroid > 0) {
        stack.push(newAsteroid);
      }

      // we have right moving in our stack.
      // current asteroid is left. check the collision(s)
      // this keeps going until new asteroid is destroyed by something bigger
      // or there's nothing left in the stack
      while (!stack.isEmpty() && stack.peek() > 0 && stack.peek() < -1 * newAsteroid) {
        // top of stack is destroyed
        stack.pop();
        // this keeps going, continuously destroying until new asteroid is smaller, or
        // no more in stack
      }

      // new asteroid destroyed entire stack, or only left-moving remain
      if (stack.isEmpty() || stack.peek() < 0) {
        stack.push(newAsteroid);
      }

      // mutual destruction
      if (stack.peek() == -1 * newAsteroid) {
        stack.pop();
      }
    }

    // everything in reverse order.
    int[] answer = new int[stack.size()];
    int i = stack.size() - 1;
    while (!stack.isEmpty()) {
      answer[i--] = stack.pop();
    }

    return answer;
  }
}