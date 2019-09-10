const utils = jest.fn();

test("1", () => {
  expect(utils).not.toHaveBeenCalled();
  utils();
  expect(utils).toHaveBeenCalled();
});

test("2", () => {
  expect(utils).not.toHaveBeenCalled();
  utils();
  expect(utils).toHaveBeenCalled();
});
