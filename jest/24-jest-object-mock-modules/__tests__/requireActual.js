const empty1Mock = require("../empty-1");
const empty1Actual = jest.requireActual("../empty-1");

jest.mock("../empty-1");

test("requireActual", () => {
  expect(empty1Mock()).toBeUndefined();
  expect(empty1Actual()).toBe("empty-1");
});
