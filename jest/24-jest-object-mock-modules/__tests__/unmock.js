const auth = require("../auth");

jest.enableAutomock();
jest.unmock("../auth");

test("unmock", () => {
  expect(auth.authorize()).toBe("original");
});
