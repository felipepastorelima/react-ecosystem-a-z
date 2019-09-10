const SoundPlayer = require("./sound-player");

module.exports = class SoundPlayerConsumer {
  constructor() {
    this.soundPlayer = new SoundPlayer();
  }

  playSomethingCool() {
    const coolSoundFileName = "song.mp3";
    this.soundPlayer.playSoundFile(coolSoundFileName);
  }
};
