const utils = require("./utils");

test("toUpperCase", () => {
  expect(utils.toUpperCase("arg")).toBe("ARG");
});
