test("custom-module", () => {
  expect(require("custom-module").value).toBe("json");
});
