require("./matchMedia.mock"); // Must be imported before the tested file

describe("myMethod()", () => {
  it("has the matchMedia inside the window object", () => {
    expect(window.matchMedia).toBeDefined();
    expect(window.matchMedia().addListener).toBeDefined();
  });
});
