import { initializer as visualizerInit } from "./visualizer";
import { setCurrentTime } from "./time";
import { initializer as volumeInit } from "./volume";
import Canvas from "./canvas";
import FileInput from "./fileInput";

let canvas = document.querySelector("canvas");
let myMusic = document.getElementById("music");
let mySlider = document.getElementById("songSlider");
let isPlaying = false;

// Slider will update time relative to the position of the slider thumb
mySlider.value = 0;

function seekSong() {
	seekTo = myMusic.duration * mySlider.value;
	myMusic.currentTime = seekTo;
}

function updateSlider() {
	updateSliderTo = myMusic.currentTime / myMusic.duration;
	mySlider.value = updateSliderTo;
}

let drawnCanvas = new Canvas(canvas, myMusic);
new FileInput();
visualizerInit(drawnCanvas, canvas);
volumeInit();

// Media controls
const playButton = document.getElementById('playbtn');
const stopButton = document.getElementById('stopbtn');
let toggleMusicPlay = (audioContext) => {
	console.log(audioContext)
	// Toggle play button icon
	let playIcon = document.getElementById('play');
	playIcon.classList.toggle('fa-pause');

	// Resume the music
	audioContext.resume().then(() => {
		if (!isPlaying) {
			myMusic.play();
			isPlaying = true;
			setInterval(updateSlider, 3000);
			setInterval(setCurrentTime, 250);
		} else {
			myMusic.pause();
			isPlaying = false;
		}
	})
}
let toggleMusicStop = (audioContext) => {
	// Reset play button icon
	let playIcon = document.getElementById('play');
	if (playIcon.classList.contains('fa-pause')) {
		playIcon.classList.remove('fa-pause');
		mySlider.value = 0;
	}

	// Stop the music
	audioContext.suspend().then(() => {
		myMusic.pause();
		isPlaying = false;
		myMusic.currentTime = 0;
	})
}

toggleMusicPlay = toggleMusicPlay.bind(this, drawnCanvas.audioContext);
toggleMusicStop = toggleMusicStop.bind(this, drawnCanvas.audioContext);

// Event listeners for functionality changes
playButton.addEventListener('click', toggleMusicPlay);
stopButton.addEventListener('click', toggleMusicStop);