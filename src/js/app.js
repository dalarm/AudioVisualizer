import { initializer as volumeInit } from "./volume";
import Canvas from "./canvas";
import FileInput from "./fileInput";
import Media from "./media";
import Slider from "./slider";
import Visualizer from './visualizer';

function init() {
	let drawnCanvas = new Canvas();
	let slider = new Slider()
	let media = new Media(drawnCanvas, slider);

	new FileInput(media);
	new Visualizer(drawnCanvas);
	volumeInit();
}

init();