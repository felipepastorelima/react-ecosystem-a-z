const utils = require("./utils");

test("automock", () => {
  expect(utils.toUpperCase("arg")).toBeUndefined();
});
