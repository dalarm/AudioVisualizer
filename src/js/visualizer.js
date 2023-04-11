// visualizer.js

export default class Visualizer {
	constructor(drawnCanvas) {
		let template = document.getElementById('template');
		let canvas = document.querySelector("canvas");
		// Run once to set the canvas's default visuals
		this.handleOnChange(drawnCanvas, canvas);

		// Bind for easy cleanup later
		this.handleOnChange = this.handleOnChange.bind(this, drawnCanvas, canvas);
		template.addEventListener('change', this.handleOnChange);
		}

	handleOnChange = (drawnCanvas, canvas) => {
		const { analyser, bufferLength, dataArray, context } = drawnCanvas
		console.log('onchange handler from visualizer')
		const designs = document.getElementById("template");
		const selectedDes = designs.options[designs.selectedIndex].value;

		if (selectedDes == 'wave') {
			this.wvisualize(analyser, bufferLength, dataArray, context, canvas);
		}
		else if (selectedDes == 'bars') {
			this.bvisualize(analyser, bufferLength, dataArray, context, canvas);
		}
	}

	// Visualizer function for waveform
	wvisualize(analyser, bufferLength, dataArray, context, canvas) {
		function draw() {
			const { width:WIDTH, height:HEIGHT } = canvas;
			let colors = document.getElementById("color");
			let selectedCol = colors.options[colors.selectedIndex].value;
			requestAnimationFrame(draw); // draw every frame

			analyser.getByteTimeDomainData(dataArray); // get waveform data and put into array

			// Set canvas properties
			context.fillStyle = 'rgb(200, 200, 200)';
			context.fillRect(0, 0, WIDTH, HEIGHT);
			// Set waveform properties
			context.lineWidth = 2;
			//context.strokeStyle = 'rgb(0, 0, 0)';
			context.strokeStyle = selectedCol;
			context.beginPath();

			let sliceWidth = WIDTH * 1.0 / bufferLength;
			let x = 0, v = 0, y = 0;
			for (let i = 0; i < bufferLength; i++) {
				v = dataArray[i] / 128.0;
				y = v * HEIGHT / 2;

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


	// Visualizer for bars
	bvisualize(analyser, bufferLength, dataArray, context, canvas) {
		function draw() {
			const { width:WIDTH, height:HEIGHT } = canvas;

			let colors = document.getElementById("color");
			let selectedCol = colors.options[colors.selectedIndex].value;
			requestAnimationFrame(draw); // draw every frame

			analyser.getByteFrequencyData(dataArray);

			// Set canvas properties
			context.fillStyle = '#002D3C';
			context.fillRect(0, 0, WIDTH, HEIGHT);

			let barWidth = (WIDTH / bufferLength) * 3.5;
			let barHeight;

			// Set bar color property
			//context.fillStyle = '#00CCFF';
			context.fillStyle = selectedCol;
			// Render the bars
			let x = 0
			for (let i = 0; i < bufferLength; i++) {
				x = i * 2;
				barHeight = dataArray[i];
				context.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

				x += barWidth + 1;
			}
		}
		draw();

	}

	cleanup() {
		template.removeEventListener('change', handleOnChange);
	}
}
