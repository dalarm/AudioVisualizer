export default class Volume {
	constructor() {
		const myAudioSlider = document.getElementById("audioSlider");
		myAudioSlider.value = 100;
		myAudioSlider.addEventListener('change', this.handleChange);
		myAudioSlider.addEventListener('dragStart', this.handleDrag);
	}

	handleChange(e) {
		// todo: functionality
		console.log('volume changing', e.target, e.target.value)
		const myMusic = document.getElementById("music");
		myMusic.volume = e.target.value;
	}

	handleDrag() {
		// todo: I don't think I need this since we can get both click/drag changes natively through the range input's onchange event
		console.log('volume dragging')
	}
}