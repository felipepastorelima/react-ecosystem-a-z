const SoundPlayer = require("../sound-player");
const SoundPlayerConsumer = require("../sound-player-consumer");

jest.mock("../sound-player");

describe.skip("When SoundPlayer throws an error", () => {
  beforeAll(() => {
    SoundPlayer.mockImplementation(() => {
      return {
        playSoundFile: () => {
          throw new Error("Test error");
        }
      };
    });
  });

  it("Should throw an error when calling playSomethingCool", () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(() => soundPlayerConsumer.playSomethingCool()).toThrow();
  });
});
