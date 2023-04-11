function initializer() {
	const myAudioSlider = document.getElementById("audioSlider");
	myAudioSlider.value = 100;
	myAudioSlider.addEventListener('change', handleChange);
	myAudioSlider.addEventListener('dragStart', handleDrag);
}

function handleChange(e) {
	// todo
	// console.log('volume changing', e.target, e.target.value)
	const myMusic = document.getElementById("music");
	myMusic.volume = e.target.value;
}

function handleDrag() {
	// todo: I don't think I need this since we can get both click/drag changes natively through the range input's onchange event
	console.log('volume dragging')
}

export { initializer }