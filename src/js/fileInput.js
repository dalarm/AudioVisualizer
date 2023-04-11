import { convertTime } from "./time";

export default class FileInput {
  fileInput;

  // Passed in media instance to access media class methods, namely to stop music
  constructor(media) {
    this.fileInput = document.getElementById('input');
    this.handleInputChange = this.handleInputChange.bind(this, media);
    this.fileInput.addEventListener('change', this.handleInputChange);
  }

  handleInputChange(media, e) {
    console.log(e);

    // Stop all media before manipulating input
    media.toggleMusicStop();

    const myMusic = document.getElementById("music");
    const file = e.currentTarget.files[0];
    myMusic.src = URL.createObjectURL(file);

    const songTitle = document.getElementById('songTitle');
    songTitle.textContent = file.name.slice(0,-4);

    // The duration function works only if we use the eventHandler loadedmetadata or else
    // it returns NaN when we use .duration.
    // .duration only returns total amount of seconds, so I calculated that using a function i made above.

    myMusic.addEventListener('loadedmetadata', () => {
      var time = myMusic.duration;
      var timer = document.getElementById("duration");
      time = convertTime(time);
      timer.innerHTML = time;
    });

    // not really needed in this exact case, but since it is really important in other cases,
    // don't forget to revoke the blobURI when you don't need it
    myMusic.onend = function (e) {
      URL.revokeObjectURL(this.src);
    }
  }
}
