const utils = require("./utils-1");

test("toUpperCase", () => {
  expect(utils.toUpperCase("arg")).toBe("ARG");
});

// test("toLowerCase", () => {
//   expect(utils.toLowerCase("ARG")).toBe("arg");
// });
