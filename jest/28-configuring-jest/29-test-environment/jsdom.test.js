/**
 * @jest-environment jsdom
 */

test("jsdom", () => {
  expect(window).toBeDefined();
});
