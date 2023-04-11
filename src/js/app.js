import { initializer as visualizerInit } from "./visualizer";
import { initializer as volumeInit } from "./volume";
import Canvas from "./canvas";
import FileInput from "./fileInput";
import Media from "./media";
import Slider from "./slider";

function init() {
	let drawnCanvas = new Canvas();
	let slider = new Slider()
	let media = new Media(drawnCanvas, slider);

	new FileInput(media);
	visualizerInit(drawnCanvas);
	volumeInit();
}

init();