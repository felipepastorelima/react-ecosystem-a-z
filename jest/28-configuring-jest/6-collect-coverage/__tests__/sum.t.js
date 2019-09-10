function sum(a, b) {
  return a + b;
}

module.exports = sum;

if (process.env.NODE_ENV === "test") {
  test("sum", () => {
    expect(sum(1, 2)).toBe(3);
  });
}
