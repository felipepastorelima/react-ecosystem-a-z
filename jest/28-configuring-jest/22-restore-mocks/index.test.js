const StringUtils = {
  toUpperCase(arg) {
    return arg && arg.toUpperCase();
  }
};

test("one", () => {
  const spy = jest
    .spyOn(StringUtils, "toUpperCase")
    .mockImplementation(() => "MOCK");
  expect(StringUtils.toUpperCase("arg")).toBe("MOCK");
  expect(spy).toHaveBeenCalledTimes(1);
  expect(jest.isMockFunction(StringUtils.toUpperCase)).toBeTruthy();
});

test("two", () => {
  expect(jest.isMockFunction(StringUtils.toUpperCase)).toBeFalsy();
  expect(StringUtils.toUpperCase("arg")).toBe("ARG");
});
