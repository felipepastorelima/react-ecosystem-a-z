test("snapshot", () => {
  const foo = "foo";

  expect(foo).toMatchSnapshot();
});
