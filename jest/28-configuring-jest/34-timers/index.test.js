test("timers", () => {
  expect(jest.isMockFunction(setTimeout)).toBe(true);
});
