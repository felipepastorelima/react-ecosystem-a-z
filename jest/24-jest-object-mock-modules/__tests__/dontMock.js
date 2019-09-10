jest.dontMock("../auth");

const auth = require("../auth");

jest.enableAutomock();

test("dontMock", () => {
  expect(auth.authorize()).toBe("original");
});
