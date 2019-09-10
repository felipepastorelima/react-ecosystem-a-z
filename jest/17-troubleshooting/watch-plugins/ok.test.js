it("ok", () => {
  expect(true).toBe(true);
});

setTimeout(() => {
  it("passes", () => expect(1).toBe(1));
}, 0);
