test("resetModules 1", () => {
  let stateful;

  jest.isolateModules(() => {
    stateful = require("../stateful");
  });

  expect(stateful.getValue()).toBe(0);
  stateful.setValue(1);
  expect(stateful.getValue()).toBe(1);
});

test("resetModules 2", () => {
  const stateful = require("../stateful");
  expect(stateful.getValue()).toBe(0);
});
