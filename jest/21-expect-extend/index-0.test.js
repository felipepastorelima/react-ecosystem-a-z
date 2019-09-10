const sleep = require("util").promisify(setTimeout);

expect.extend({
  toBeScaffoldHub(received) {
    console.log("isNot", this.isNot);
    console.log("promise", this.promise);
    console.log("expand", this.expand);

    const expected = "ScaffoldHub";
    const pass = Object.is(received, expected);

    const failMessage = pass
      ? () => `expected ${received} NOT to be ${expected}`
      : () => `expected ${received} to be ${expected}`;

    return { pass, message: failMessage };
  },

  toBeScaffoldHubObject(received) {
    const expected = { name: "ScaffoldHub" };
    const pass = this.equals(received, expected);

    const failMessage = pass
      ? () =>
          `expected ${JSON.stringify(received)} NOT to be ${JSON.stringify(
            expected
          )}`
      : () =>
          `expected ${JSON.stringify(received)} to be ${JSON.stringify(
            expected
          )}`;

    return { pass, message: failMessage };
  },

  async toBeScaffoldHubAsync(received) {
    await sleep(100);

    const expected = "ScaffoldHub";
    const pass = Object.is(received, expected);

    const failMessage = pass
      ? () => `expected ${received} NOT to be ${expected}`
      : () => `expected ${received} to be ${expected}`;

    return { pass, message: failMessage };
  }
});

describe("toBeScaffoldHub", () => {
  it("", () => {
    expect("Google").toBeScaffoldHub();
  });

  it("not", () => {
    expect("ScaffoldHub").not.toBeScaffoldHub();
  });

  it("resolves", () => {
    expect(Promise.resolve("ScaffoldHub")).resolves.not.toBeScaffoldHub();
  });

  it("rejects", () => {
    expect(Promise.reject("ScaffoldHub")).rejects.not.toBeScaffoldHub();
  });
});

describe("toBeScaffoldHubAsync", () => {
  it("", () => {
    return expect("Google").toBeScaffoldHubAsync();
  });

  it("not", () => {
    return expect("ScaffoldHub").not.toBeScaffoldHubAsync();
  });
});

describe("toBeScaffoldHubObject", () => {
  it("", () => {
    return expect({ name: "Google" }).toBeScaffoldHubObject();
  });

  it("not", () => {
    return expect({ name: "ScaffoldHub" }).not.toBeScaffoldHubObject();
  });
});
