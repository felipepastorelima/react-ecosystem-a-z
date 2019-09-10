const { toMatchSnapshot } = require("jest-snapshot");

expect.extend({
  toMatchTrimmedSnapshot(received, length) {
    return toMatchSnapshot.call(
      this,
      received.substring(0, length),
      "toMatchTrimmedSnapshot"
    );
  }
});

it("stores only 10 characters", () => {
  expect("extra long string oh my gerd").toMatchTrimmedSnapshot(10);
});
