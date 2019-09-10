// sound-player-consumer.test.js
const SoundPlayer = require("../sound-player");
const SoundPlayerConsumer = require("../sound-player-consumer");

const mockPlaySoundFile = jest.fn();
jest.mock("../sound-player", () => {
  return jest.fn().mockImplementation(() => {
    return { playSoundFile: mockPlaySoundFile };
  });
});

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  SoundPlayer.mockClear();
  mockPlaySoundFile.mockClear();
});

it("We can check if the consumer called the class constructor", () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

it("We can check if the consumer called a method on the class instance", () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  const coolSoundFileName = "song.mp3";
  soundPlayerConsumer.playSomethingCool();
  expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
});
