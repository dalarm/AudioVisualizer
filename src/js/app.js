import { initializer as visualizerInit } from "./visualizer";

/**
 * NEW STUFF START
 */
let canvas = document.querySelector("canvas");
let myMusic = document.getElementById("music");
let mySlider = document.getElementById("songSlider");
let myAudioSlider = document.getElementById("audioSlider");
let isPlaying = false;
let seconds, minutes, diff, total, currentTime;

const playButton = document.getElementById('playbtn');
const stopButton = document.getElementById('stopbtn');

// Event listeners for functionality changes
playButton.addEventListener('click', toggleMusicPlay);
stopButton.addEventListener('click', toggleMusicStop);

function toggleMusicPlay() {
	// Toggle play button icon
	let playIcon = document.getElementById('play');
	playIcon.classList.toggle('fa-pause');

	// Resume the music
	audioCtx.resume().then(() => {
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

function toggleMusicStop() {
	// Reset play button icon
	let playIcon = document.getElementById('play');
	if (playIcon.classList.contains('fa-pause')) {
		playIcon.classList.remove('fa-pause');
		mySlider.value = 0;
	}

	// Stop the music
	audioCtx.suspend().then(() => {
		myMusic.pause();
		isPlaying = false;
		myMusic.currentTime = 0;
	})
}

/**
 * NEW STUFF END
*/

// Slider will update time relative to the position of the slider thumb
myAudioSlider.value = 100;
mySlider.value = 0;

function seekSong() {
	seekTo = myMusic.duration * mySlider.value;
	myMusic.currentTime = seekTo;
}

function convertTime(secs) {
	if (secs >= 60) {
		minutes = Math.floor(secs / 60);
		diff = minutes * 60;
		seconds = Math.floor(secs - diff);
		if (seconds == 0) {
			total = minutes + ":0" + seconds;
			return total;
		}
		else {
			if (seconds < 10) {
				return minutes + ":0" + seconds;
			}
			total = minutes + ":" + seconds;
			return total;
		}
	}

	else {
		seconds = Math.floor(secs)
		if (seconds < 10) {
			return "0" + ":0" + seconds;
		}
		total = "0" + ":" + seconds;
		return total;
	}
}

input.onchange = function (e) {
	var playButton = document.getElementById("play");
	if(($(playButton).hasClass("fa-pause")) == true){
		$(playButton).toggleClass('fa-pause');
		isPlaying = false;
	}
	myMusic.src = URL.createObjectURL(this.files[0]);
	var file = e.currentTarget.files[0];
	$("#songTitle").text((file.name.slice(0,-4)));
	// The duration function works only if we use the eventHandler loadedmetadata or else
	// it returns NaN when we use .duration.
	// .duration only returns total amount of seconds, so I calculated that using a function i made above.
	myMusic.addEventListener('loadedmetadata', function () {
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

function setCurrentTime(currentTime) {
	/*	var converted;
		currentTime += 1;
		converted = convertTime(currentTime);

	*/
	// Smh, turns out the audio api comes with a "currentTime" property.

	var current, timer, updateSliderTo;
	current = convertTime(myMusic.currentTime);
	timer = document.getElementById("currentTime");
	timer.innerHTML = current;
}


function updateSlider() {
	updateSliderTo = myMusic.currentTime / myMusic.duration;
	mySlider.value = updateSliderTo;
}

function adjustVolume() {
	myMusic.volume = document.getElementById("audioSlider").value;
}

/* * * * *
 * Canvas *
 * * * * *
 */

var context = canvas.getContext('2d');

// Extract data from audio source with AnalyserNode
var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // AudioContext
var audiosrc = audioCtx.createMediaElementSource(myMusic); // Takes music
var analyser = audioCtx.createAnalyser(); 	// Create AnalyserNode
// var distortion = audioCtx.createWaveShaper();
// var gainNode = audioCtx.createGain();
// var biquadFilter = audioCtx.createBiquadFilter();

//Setting up the array to store data from sound file.
WIDTH = canvas.width;
HEIGHT = canvas.height;

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

context.clearRect(0, 0, WIDTH, HEIGHT);
audiosrc.connect(analyser);
analyser.connect(audioCtx.destination);

visualizerInit(analyser, bufferLength, dataArray, context, canvas);
