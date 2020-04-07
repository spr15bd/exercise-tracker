export default class Sound {
  constructor(src, maxStreams, soundVolume) {
    this.sounds = [];
    this.soundNumber = 0;
    this.maxStreams = maxStreams;
    let i = 0;
    while (i < maxStreams) {
      this.sounds.push(new Audio(src));
      this.sounds[i].volume = soundVolume;
      i++;
    }
  }

  play() {
    this.soundNumber++;
    this.sounds[this.soundNumber % this.maxStreams].play();
  }
}
