test("resetModules 1", () => {
  const stateful = require("../stateful");
  expect(stateful.getValue()).toBe(0);
  stateful.setValue(1);
  expect(stateful.getValue()).toBe(1);
});

test("resetModules 2", () => {
  jest.resetModules();
  const stateful = require("../stateful");
  expect(stateful.getValue()).toBe(0);
});
