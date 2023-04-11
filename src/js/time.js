function convertTime(secs) {
  let seconds, minutes, diff, total, currentTime;
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

function setCurrentTime(currentTime) {
  /*	var converted;
  currentTime += 1;
  converted = convertTime(currentTime);

	*/
	// Smh, turns out the audio api comes with a "currentTime" property.
  const myMusic = document.getElementById("music");
	let current, timer, updateSliderTo;
	current = convertTime(myMusic.currentTime);
	timer = document.getElementById("currentTime");
	timer.innerHTML = current;
}

export { convertTime, setCurrentTime }