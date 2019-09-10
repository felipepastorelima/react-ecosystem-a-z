module.exports = {
  function: function square(a, b) {
    return a * b;
  },
  asyncFunction: async function asyncSquare(a, b) {
    const result = (await a) * b;
    return result;
  },
  class: new (class Bar {
    constructor() {
      this.array = [1, 2, 3];
    }
    foo() {}
  })(),
  object: {
    baz: "foo",
    bar: {
      fiz: 1,
      buzz: [1, 2, 3]
    }
  },
  array: [1, 2, 3],
  number: 123,
  string: "baz",
  boolean: true,
  symbol: Symbol.for("a.b.c")
};
