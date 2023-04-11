export default class Canvas {
  context;
  audioContext;
  analyser;
  audiosrc;
  bufferLength;
  dataArray;

  constructor(music) {
    let canvas = document.querySelector("canvas");

    this.context = canvas.getContext('2d');

    // Extract data from audio source with AnalyserNode
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)(); // AudioContext
    this.audiosrc = this.audioContext.createMediaElementSource(music); // Takes music
    this.analyser = this.audioContext.createAnalyser(); 	// Create AnalyserNode
    // this.distortion = audioContext.createWaveShaper();
    // this.gainNode = audioContext.createGain();
    // this.biquadFilter = audioContext.createBiquadFilter();

    //Setting up the array to store data from sound file.
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.context.clearRect(0, 0, WIDTH, HEIGHT);
    this.audiosrc.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);
  }
}
