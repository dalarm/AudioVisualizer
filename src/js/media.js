import { setCurrentTime } from "./time";

export default class Media {
	constructor({audioContext}) {
		this.isPlaying = false;
		this.toggleMusicPlay = this.toggleMusicPlay.bind(this, audioContext);
		this.toggleMusicStop = this.toggleMusicStop.bind(this, audioContext);

		// Media controls
		const playButton = document.getElementById('playbtn');
		const stopButton = document.getElementById('stopbtn');

		// Event listeners for functionality changes
		playButton.addEventListener('click', this.toggleMusicPlay);
		stopButton.addEventListener('click', this.toggleMusicStop);
	}

	updateSlider() {
		const myMusic = document.getElementById("music");
		const updateSliderTo = myMusic.currentTime / myMusic.duration;
		// todo: refactor mySlider and reference it here
		// mySlider.value = updateSliderTo;
	}

	toggleMusicPlay = (audioContext) => {
		const myMusic = document.getElementById("music");
		// console.log(audioContext)
		// Toggle play button icon
		let playIcon = document.getElementById('play');
		playIcon.classList.toggle('fa-pause');

		// Resume the music
		audioContext.resume().then(() => {
			if (!this.isPlaying) {
				myMusic.play();
				this.isPlaying = true;
				setInterval(this.updateSlider, 3000);
				setInterval(setCurrentTime, 250);
			} else {
				myMusic.pause();
				this.isPlaying = false;
			}
		})
	}

	toggleMusicStop = (audioContext) => {
		console.log('media calling toggleMusicStop');
		const myMusic = document.getElementById("music");
		// Reset play button icon
		let playIcon = document.getElementById('play');
		if (playIcon.classList.contains('fa-pause')) {
			playIcon.classList.remove('fa-pause');
			// todo: refactor mySlider and reference it here
			// mySlider.value = 0;
		}

		// Stop the music
		audioContext.suspend().then(() => {
			myMusic.pause();
			this.isPlaying = false;
			myMusic.currentTime = 0;
		})
	}
}
