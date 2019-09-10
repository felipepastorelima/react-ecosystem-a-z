const utils = jest.fn(() => 42);

test("1", () => {
  expect(utils).not.toHaveBeenCalled();
  expect(utils()).toBeUndefined();
  expect(utils).toHaveBeenCalled();
});

test("2", () => {
  expect(utils).not.toHaveBeenCalled();
  expect(utils()).toBeUndefined();
  expect(utils).toHaveBeenCalled();
});
