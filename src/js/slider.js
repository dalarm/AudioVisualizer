export default class Slider {
  constructor() {
    this.slider = document.getElementById("songSlider");
    this.slider.value = 0; // initialize slider to 0

    const myMusic = document.getElementById("music");
    this.updateSlider = this.updateSlider.bind(this, myMusic);

    // Very nice, we get slider resetting for free
    myMusic.addEventListener('timeupdate', this.updateSlider);
  }

  updateSlider(myMusic) {
    const { currentTime, duration } = myMusic;

    console.log(currentTime, duration, Math.floor(currentTime/duration));
    this.slider.value = currentTime / duration;
  }

  // todo: functionality
  // seekSong() {
  //   seekTo = myMusic.duration * mySlider.value;
  //   myMusic.currentTime = seekTo;
  // }
}