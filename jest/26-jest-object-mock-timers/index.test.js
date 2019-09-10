beforeEach(() => {
  jest.useFakeTimers();
});

test("useFakeTimers", () => {
  expect(jest.isMockFunction(setTimeout)).toBeTruthy();
  expect(jest.isMockFunction(setInterval)).toBeTruthy();
  expect(jest.isMockFunction(clearTimeout)).toBeTruthy();
  expect(jest.isMockFunction(clearInterval)).toBeTruthy();
  expect(jest.isMockFunction(process.nextTick)).toBeTruthy();
  expect(jest.isMockFunction(setImmediate)).toBeTruthy();
  expect(jest.isMockFunction(clearImmediate)).toBeTruthy();
});

test("useRealTimers", () => {
  jest.useRealTimers();

  expect(jest.isMockFunction(setTimeout)).toBeFalsy();
  expect(jest.isMockFunction(setInterval)).toBeFalsy();
  expect(jest.isMockFunction(clearTimeout)).toBeFalsy();
  expect(jest.isMockFunction(clearInterval)).toBeFalsy();
  expect(jest.isMockFunction(process.nextTick)).toBeFalsy();
  expect(jest.isMockFunction(setImmediate)).toBeFalsy();
  expect(jest.isMockFunction(clearImmediate)).toBeFalsy();
});

test("runAllTicks", () => {
  const tickRunner = (currentTime = 1) => {
    console.log(`Running 'runAllTicks' for the ${currentTime} time.`);

    if (currentTime === 3) {
      return;
    }

    process.nextTick(() => {
      tickRunner(currentTime + 1);
    });
  };

  tickRunner();

  jest.runAllTicks();
});

test("runAllTimers", () => {
  const tickAndTimerRunner = (currentTime = 1) => {
    console.log(`Running 'runAllTimers' for the ${currentTime} time.`);

    if (currentTime === 3) {
      return;
    }

    process.nextTick(() => {
      tickAndTimerRunner(currentTime + 1);
    });
  };

  setTimeout(() => {
    console.log("Starting 'runAllTimers'...");
    tickAndTimerRunner();
  }, 1000);

  jest.runAllTimers();
});

test("runAllImmediates", () => {
  const immediateRunner = (currentTime = 1) => {
    console.log(`Running 'runAllImmediates' for the ${currentTime} time.`);

    if (currentTime === 3) {
      return;
    }

    setImmediate(() => {
      immediateRunner(currentTime + 1);
    });
  };

  immediateRunner();

  jest.runAllImmediates();
});

test("advanceTimersByTime", () => {
  setTimeout(() => {
    console.log("10ms");

    setTimeout(() => {
      console.log("10ms + 20ms");
    }, 20);
  }, 10);

  // jest.advanceTimersByTime(30);
  jest.runTimersToTime(30);
});

test("runOnlyPendingTimers", () => {
  setTimeout(() => {
    console.log("10ms");

    setTimeout(() => {
      console.log("10ms + 20ms");
    }, 20);
  }, 10);

  jest.runOnlyPendingTimers();
  jest.runOnlyPendingTimers();
});

test("clearAllTimers", () => {
  setTimeout(() => {
    console.log("10ms");

    setTimeout(() => {
      console.log("10ms + 20ms");
    }, 20);
  }, 10);

  jest.runOnlyPendingTimers();
  jest.clearAllTimers();
  jest.runOnlyPendingTimers();
});

test.only("getTimerCount", () => {
  setTimeout(() => {
    console.log("10ms - A");

    setTimeout(() => {
      console.log("10ms + 20ms");
    }, 20);
  }, 10);

  setTimeout(() => {
    console.log("10ms - B");
  }, 10);

  expect(jest.getTimerCount()).toBe(2);
  jest.runOnlyPendingTimers();
  expect(jest.getTimerCount()).toBe(1);
  jest.runOnlyPendingTimers();
  expect(jest.getTimerCount()).toBe(0);
});
