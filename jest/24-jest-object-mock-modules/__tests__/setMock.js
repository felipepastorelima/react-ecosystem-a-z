jest.setMock("../empty-1", () => "mock");
const empty = require("../empty-1");

test("setMock", () => {
  expect(empty()).toBe("mock");
});
