const lodash = require("lodash");

// jest.unmock("lodash");

test("repeat", () => {
  expect(lodash.repeat("B", 3)).toBe("BBB");
});

test("upperCase", () => {
  expect(lodash.upperCase("bbb")).toBe("BBB");
});
