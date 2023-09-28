import java.util.concurrent.Semaphore;

class FooBar {
  private int n;
  private Semaphore fooLock, barLock;

  public FooBar(int n) {
    this.n = n;
    this.fooLock = new Semaphore(1);
    this.barLock = new Semaphore(0);
  }

  public void foo(Runnable printFoo) throws InterruptedException {

    for (int i = 0; i < n; i++) {
      this.fooLock.acquire();
      // printFoo.run() outputs "foo". Do not change or remove this line.
      printFoo.run();
      this.barLock.release();
    }
  }

  public void bar(Runnable printBar) throws InterruptedException {

    for (int i = 0; i < n; i++) {
      this.barLock.acquire();
      // printBar.run() outputs "bar". Do not change or remove this line.
      printBar.run();
      this.fooLock.release();
    }
  }
}