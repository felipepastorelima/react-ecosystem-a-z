const user = require("../user");

jest.mock("../user");

test("uses mock user", () => {
  expect(user.name).toBe("Mock User");
});
