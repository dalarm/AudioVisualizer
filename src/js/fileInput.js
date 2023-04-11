export default class FileInput {
  fileInput;

  constructor(isPlaying) {
    this.isPlaying = isPlaying;
    this.fileInput = document.getElementById('input');
    this.fileInput.addEventListener('change', this.handleInputChange);
  }

  handleInputChange(e) {
    const myMusic = document.getElementById("music");
    const playButton = document.getElementById("play");

    //  todo: import a function to toggle this so we have one source of truth for isplaying
    // if (playButton.classList.contains('fa-pause')) {
    //   playButton.classList.toggle('fa-pause');
    //   this.isPlaying = false;
    // }

    myMusic.src = URL.createObjectURL(this.files[0]);
    const file = e.currentTarget.files[0];
    const songTitle = document.getElementById('songTitle');

    songTitle.textContent = file.name.slice(0,-4);

    // The duration function works only if we use the eventHandler loadedmetadata or else
    // it returns NaN when we use .duration.
    // .duration only returns total amount of seconds, so I calculated that using a function i made above.

    // todo: import converttime function after refactoring time functions
    // myMusic.addEventListener('loadedmetadata', () => {
    //   var time = myMusic.duration;
    //   var timer = document.getElementById("duration");
    //   time = this.convertTime(time);
    //   timer.innerHTML = time;
    // });

    // not really needed in this exact case, but since it is really important in other cases,
    // don't forget to revoke the blobURI when you don't need it
    myMusic.onend = function (e) {
      URL.revokeObjectURL(this.src);
    }
  }
}
