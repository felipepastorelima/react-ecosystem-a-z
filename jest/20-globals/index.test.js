describe("describe for 1", () => {
  describe("inner describe", () => {
    afterAll(done => {
      setTimeout(() => {
        console.log("afterAll");
        done();
      }, 2);
    }, 3);

    afterEach(done => {
      setTimeout(() => {
        console.log("afterEach");
        done();
      }, 2);
    }, 3);

    beforeAll(done => {
      setTimeout(() => {
        console.log("beforeAll");
        done();
      }, 2);
    }, 3);

    beforeEach(done => {
      setTimeout(() => {
        console.log("beforeEach");
        done();
      }, 2);
    }, 3);

    test("1", () => {
      console.log("1");
      expect(true).toBe(true);
    });
  });
});

it("2", done => {
  console.log("2");
  expect(true).toBe(true);

  new Promise((resolve, reject) => {
    setTimeout(resolve, 100);
  }).then(() => done());
});

describe.each([[1, 1, 2], [1, 2, 3], [2, 1, 3]])(
  "describe.add(%i, %i) = %i [%#]",
  (a, b, expected) => {
    test(`returns ${expected}`, () => {
      expect(a + b).toBe(expected);
    });

    test(`returned value not be greater than ${expected}`, () => {
      expect(a + b).not.toBeGreaterThan(expected);
    });

    test(`returned value not be less than ${expected}`, () => {
      expect(a + b).not.toBeLessThan(expected);
    });
  }
);

describe.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("describe $a + $b", ({ a, b, expected }) => {
  test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});

test.each([[1, 1, 2], [1, 2, 3], [2, 1, 3]])(
  "test.add(%i, %i)",
  (a, b, expected) => {
    expect(a + b).toBe(expected);
  }
);

test.each`
  a    | b    | expected
  ${1} | ${1} | ${2}
  ${1} | ${2} | ${3}
  ${2} | ${1} | ${3}
`("test returns $expected when $a is added $b", ({ a, b, expected }) => {
  expect(a + b).toBe(expected);
});

test.todo("add should be associative");
