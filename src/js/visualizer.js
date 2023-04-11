// visualizer.js

/*
 * Template Designs
 */

let handleOnChange = (analyser, bufferLength, dataArray, context, canvas) => {
	console.log('onchange handler from visualizer')
	designs = document.getElementById("template");
	selectedDes = designs.options[designs.selectedIndex].value;

	if (selectedDes == 'wave') {
		wvisualize(analyser, bufferLength, dataArray, context, canvas);
	}
	else if (selectedDes == 'bars') {
		bvisualize(analyser, bufferLength, dataArray, context, canvas);
	}
}

let template = document.getElementById('template');
function initializer(analyser, bufferLength, dataArray, context, canvas) {
	// Run once to set the canvas's default visuals
	handleOnChange(analyser, bufferLength, dataArray, context, canvas);

	// Bind for easy cleanup later
  handleOnChange = handleOnChange.bind(this, analyser, bufferLength, dataArray, context, canvas);
  template.addEventListener('change', handleOnChange);
}

function cleanup() {
	template.removeEventListener('change', handleOnChange);
}

/*
 * Visualizer function for waveform
 */

function wvisualize(analyser, bufferLength, dataArray, context, canvas) {
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

function bvisualize(analyser, bufferLength, dataArray, context, canvas) {
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

export { initializer, cleanup }