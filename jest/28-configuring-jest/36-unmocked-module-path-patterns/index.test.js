const lodash = require("lodash");

test("toUpper", () => {
  expect(lodash.toUpper("arg")).toBe("ARG");
});
