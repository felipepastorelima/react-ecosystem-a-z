let globalVariable = "A";

test("first test", () => {
  expect(globalVariable).toBe("A");
  globalVariable = "B";
});

test.only("second test", () => {
  expect(globalVariable).toBe("A");
});
