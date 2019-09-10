const SoundPlayer = require("../sound-player");
const SoundPlayerConsumer = require("../sound-player-consumer");

jest.mock("../sound-player", () => {
  return function() {
    return { playSoundFile: () => {} };
  };
}); // SoundPlayer is now a mock constructor

it("console logs the class mock", () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(soundPlayerConsumer.soundPlayer.playSoundFile).toBeDefined();
});
