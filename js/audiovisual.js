/*
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);
*/

/* * * * * * 
 * New code *
 * * * * * * 
 */

$(document).ready(function(){
	$('.fa-play').click(function() {
		$(this).toggleClass('fa-pause'); 
	});
}); 

var canvas = document.querySelector("canvas");
var musicButton = document.getElementById("playbtn");
var stopButton = document.getElementById("stopbtn");
var myMusic = document.getElementById("music");
var mySlider = document.getElementById("songSlider"); 
var myAudioSlider = document.getElementById("audioSlider"); 
var isPlaying = false; 
var seconds, minutes, diff, total, currentTime;

// Slider will update time relative to the position of the slider thumb
myAudioSlider.value = 100; 
mySlider.value = 0; 
mySlider.addEventListener("change", function () {
	var seekTo = myMusic.duration * mySlider.value;
	myMusic.currentTime = seekTo;
});

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
	myMusic.src = URL.createObjectURL(this.files[0]);

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
	updateSliderTo = myMusic.currentTime / myMusic.duration;
	mySlider.value = updateSliderTo; 
}

function toggleMusic() {
	musicButton.onclick = function () {
		if (!isPlaying) {
			myMusic.play();
			isPlaying = true;
			setInterval(setCurrentTime, 250); 
		}
		else {
			myMusic.pause();
			musicButton
			isPlaying = false;
		}
	}

	stopButton.onclick = function () {
		myMusic.pause();
		isPlaying = false;
		myMusic.currentTime = 0;
	}
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
var distortion = audioCtx.createWaveShaper();
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();

//Get the template 
var designs = document.getElementById("template");
var selectedDes = designs.options[designs.selectedIndex].value;

//Setting up the array to store data from sound file.

WIDTH = canvas.width;
HEIGHT = canvas.height;

var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);
console.log(bufferLength);

context.clearRect(0, 0, WIDTH, HEIGHT);

audiosrc.connect(analyser);

analyser.connect(audioCtx.destination);
if (selectedDes == 'wave')
	wvisualize();
else if (selectedDes == 'bars')
	bvisualize();


/* 
 * Template Designs
 */

function templates() {

	designs = document.getElementById("template");
	selectedDes = designs.options[designs.selectedIndex].value;

	if (selectedDes == 'wave') {
		wvisualize();
	}
	else if (selectedDes == 'bars') {
		bvisualize();
	}
}


/* 
 * Visualizer function for waveform
 */

function wvisualize() {
	function draw() {
		var colors = document.getElementById("color");
		var selectedCol = colors.options[colors.selectedIndex].value;
		drawVisual = requestAnimationFrame(draw);

		analyser.getByteTimeDomainData(dataArray); // get waveform data and put into array

		// Set canvas properties
		context.fillStyle = 'rgb(200, 200, 200)';
		context.fillRect(0, 0, WIDTH, HEIGHT);
		// Set waveform properties
		context.lineWidth = 2;
		//context.strokeStyle = 'rgb(0, 0, 0)';
		context.strokeStyle = selectedCol;
		context.beginPath();

		var sliceWidth = WIDTH * 1.0 / bufferLength;
		var x = 0;

		for (var i = 0; i < bufferLength; i++) {

			var v = dataArray[i] / 128.0;
			var y = v * HEIGHT / 2;

			if (i === 0) {
				context.moveTo(x, y);
			} else {
				context.lineTo(x, y);
			}

			x += sliceWidth;
		}

		context.lineTo(canvas.width, canvas.height / 2);
		context.stroke();

	};

	draw();
}


/*
 * Visualizer for bars 
 */

function bvisualize() {
	function draw() {
		var colors = document.getElementById("color");
		var selectedCol = colors.options[colors.selectedIndex].value;
		var drawVisual = requestAnimationFrame(draw);

		analyser.getByteFrequencyData(dataArray);

		// Set canvas properties 
		context.fillStyle = '#002D3C';
		context.fillRect(0, 0, WIDTH, HEIGHT);

		var barWidth = (WIDTH / bufferLength) * 3.5;
		var barHeight;

		// Set bar color property
		//context.fillStyle = '#00CCFF';
		context.fillStyle = selectedCol;
		// Render the bars 
		for (var i = 0; i < bufferLength; i++) {
			x = i * 2;
			barHeight = dataArray[i];
			context.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

			x += barWidth + 1;
		}
	}
	draw();

}


toggleMusic(); 