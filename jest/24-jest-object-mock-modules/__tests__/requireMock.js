const auth = require("../auth");
const authMock = jest.requireMock("../auth");

jest.enableAutomock();
jest.unmock("../auth");

test("requireMock", () => {
  expect(auth.authorize()).toBe("original");
  expect(authMock.authorize()).toBe("mock");
});
