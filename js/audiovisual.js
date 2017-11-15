/*
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 100, 100);
*/

/* * * * * * 
 * New code *
 * * * * * * 
 * Important !!! To run this you have to host via local server using python.
 * Command prompt instructions:
 * cd to your directory (equivalent of ls on bash is 'dir') then type the following:
 * $ python3 -m http.server
 * Then, on your browser paste this into the url bar: 
 * http://localhost:8000/
 */

var canvas = document.querySelector("canvas");
var musicButton = document.getElementById("playbtn"); 
var stopButton = document.getElementById("stopbtn"); 
var myMusic = document.getElementById("music");
var isPlaying = false; 


input.onchange = function(e){
  var sound = document.getElementById('music');
  sound.src = URL.createObjectURL(this.files[0]);
  // not really needed in this exact case, but since it is really important in other cases,
  // don't forget to revoke the blobURI when you don't need it
  sound.onend = function(e) {
    URL.revokeObjectURL(this.src);
  }
}

function toggleMusic() {
	musicButton.onclick = function() {
		if(!isPlaying) {
			myMusic.play(); 
			isPlaying = true; 
		}
		else {
			myMusic.pause(); 
			isPlaying = false; 
		} 
	}
	stopButton.onclick = function() {
		myMusic.pause(); 
		isPlaying = false; 
		myMusic.currentTime = 0; 
	}
}


/* 
 * Uncomment this code to increase the canvas size to the current browser size
 *
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
*/


var context = canvas.getContext('2d');

// Extract data from audio source with AnalyserNode
var audioCtx = new (window.AudioContext || window.webkitAudioContext)(); // AudioContext
var audiosrc = audioCtx.createMediaElementSource(myMusic); // Takes music
var analyser = audioCtx.createAnalyser(); 	// Create AnalyserNode
var distortion = audioCtx.createWaveShaper(); 
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();

// navigator.getUserMedia(constraints, successCallback, errorCallback)
navigator.getUserMedia (
	// constraints
	{audio: true},


	// successCallback
	function(stream) {

		/* Don't really need this part because it's for taking mic input */
		//source = audioCtx.createMediaStreamSource(stream); 
		//source.connect(analyser); 

		audiosrc.connect(analyser); 

		analyser.connect(audioCtx.destination); 
		visualize(stream); 
	},

	// errorCallback
	function(err) {
		console.log("The following error occurred: " + err.name);
	} 
);

/* 
 * Visualizer function for waveform
 *
function visualize(stream) {
	WIDTH = canvas.width; 
	HEIGHT = canvas.height; 

	analyser.fftSize = 2048; 
	var bufferLength = analyser.frequencyBinCount; 
	console.log(bufferLength); 
	var dataArray = new Uint8Array(bufferLength); 	// create an array to store data
	
	context.clearRect(0, 0, WIDTH, HEIGHT); 

	function draw() {

	drawVisual = requestAnimationFrame(draw); 

	analyser.getByteTimeDomainData(dataArray); // get waveform data and put into array

	// Set canvas properties
	context.fillStyle = 'rgb(200, 200, 200)'; 
	context.fillRect(0, 0, WIDTH, HEIGHT);

	// Set waveform properties
	context.lineWidth = 2;
	context.strokeStyle = 'rgb(0, 0, 0)';

	context.beginPath();

	var sliceWidth = WIDTH * 1.0 / bufferLength; 
	var x = 0; 

	for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }

        x += sliceWidth;
      }

	context.lineTo(canvas.width, canvas.height/2);
    context.stroke();

	}; 
	
	draw();
}
*/


/*
 * Visualizer for bars 
 */

function visualize(stream) {
	WIDTH = canvas.width; 
	HEIGHT = canvas.height; 

	var bufferLength = analyser.frequencyBinCount; 
	var dataArray = new Uint8Array(bufferLength); 
	console.log(bufferLength); 

	context.clearRect(0, 0, WIDTH, HEIGHT); 

	function draw() {
		var drawVisual = requestAnimationFrame(draw); 

		analyser.getByteFrequencyData(dataArray); 

		// Set canvas properties 
		context.fillStyle = '#002D3C'; 
		context.fillRect(0, 0, WIDTH, HEIGHT);

		var barWidth = (WIDTH / bufferLength) * 3.5; 
		var barHeight; 
	
		// Set bar color property
		context.fillStyle = '#00CCFF';

		// Render the bars 
		for (var i = 0; i <  bufferLength; i++) {
			x = i * 2;
			barHeight = dataArray[i]; 
			context.fillRect(x, HEIGHT - barHeight/2, barWidth, barHeight); 

			x += barWidth + 1; 			
		}
	}	
	draw(); 

}


toggleMusic(); 