const auth = require("../auth");

jest.enableAutomock();

test("enableAutomock", () => {
  expect(auth.authorize()).toBe("mock");
});
