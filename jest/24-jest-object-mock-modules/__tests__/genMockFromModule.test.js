const example = jest.genMockFromModule("../common");

test("genMockFromModule", () => {
  // creates a new mocked function with no formal arguments.
  expect(example.function.name).toEqual("square");
  expect(example.function.length).toEqual(0);
  expect(example.function()).toBeUndefined();

  // async functions get the same treatment as standard synchronous functions.
  expect(example.asyncFunction.name).toEqual("asyncSquare");
  expect(example.asyncFunction.length).toEqual(0);
  expect(example.asyncFunction()).toBeUndefined();

  // creates a new class with the same interface, member functions and properties are mocked.
  expect(example.class.constructor.name).toEqual("Bar");
  expect(example.class.foo.name).toEqual("foo");
  expect(example.class.array.length).toEqual(0);

  // creates a deeply cloned version of the original object.
  expect(example.object).toEqual({
    baz: "foo",
    bar: {
      fiz: 1,
      buzz: []
    }
  });

  // creates a new empty array, ignoring the original array.
  expect(example.array.length).toEqual(0);

  // creates a new property with the same primitive value as the original property.
  expect(example.number).toEqual(123);
  expect(example.string).toEqual("baz");
  expect(example.boolean).toEqual(true);
  expect(example.symbol).toEqual(Symbol.for("a.b.c"));
});
