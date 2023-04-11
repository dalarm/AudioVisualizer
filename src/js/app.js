import { initializer as visualizerInit } from "./visualizer";
import { initializer as volumeInit } from "./volume";
import Canvas from "./canvas";
import FileInput from "./fileInput";
import Media from "./media";

let myMusic = document.getElementById("music");
let mySlider = document.getElementById("songSlider");

// Slider will update time relative to the position of the slider thumb
mySlider.value = 0;

function seekSong() {
	seekTo = myMusic.duration * mySlider.value;
	myMusic.currentTime = seekTo;
}

let drawnCanvas = new Canvas(myMusic);
let media = new Media(drawnCanvas);
new FileInput(media);
visualizerInit(drawnCanvas);
volumeInit();
