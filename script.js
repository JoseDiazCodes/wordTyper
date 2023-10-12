let startTime;
const phrases = [
	"The quick brown fox jumps over the lazy dog.",
	"Pack my box with five dozen liquor jugs.",
	"How vexingly quick daft zebras jump!",
	"Bright vixens jump; dozy fowl quack.",
];
const textInput = document.getElementById("textInput");
const textDisplay = document.getElementById("textDisplay");
const resetButton = document.getElementById("resetButton");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");

function newPhrase() {
	const randomIndex = Math.floor(Math.random() * phrases.length);
	textDisplay.textContent = phrases[randomIndex];
}

function endTypingTest() {
	textInput.disabled = true;
	alert("Typing test complete!");
}

function calculateAccuracy(typedText, displayedText) {
	let correctCharacters = 0;

	for (let i = 0; i < typedText.length; i++) {
		if (typedText[i] === displayedText[i]) {
			correctCharacters++;
		}
	}

	return Math.round((correctCharacters / displayedText.length) * 100);
}

textInput.oninput = () => {
	const typedText = textInput.value.toLowerCase();
	const displayedText = textDisplay.textContent
		.trim()
		.substring(0, typedText.length)
		.toLowerCase();

	if (textInput.value.length === 1 && !startTime) {
		startTime = new Date();
	}

	if (typedText === displayedText) {
		textInput.style.color = "green"; // Correct input

		const endTime = new Date();
		const timeDiff = endTime - startTime;
		const timeDiffInMinutes = timeDiff / 60000;
		const numberOfWords = typedText.length / 5;
		const wpm = Math.round(numberOfWords / timeDiffInMinutes);
		wpmDisplay.textContent = `${wpm} WPM`;

		const accuracy = calculateAccuracy(
			typedText,
			textDisplay.textContent.trim().toLowerCase()
		);
		accuracyDisplay.textContent = `${accuracy}% Accuracy`;

		if (typedText === textDisplay.textContent.trim().toLowerCase()) {
			endTypingTest();
		}
	} else {
		textInput.style.color = "red"; // Incorrect input
	}
};

resetButton.onclick = () => {
	textInput.value = "";
	textInput.style.color = "black";
	textInput.disabled = false;
	startTime = undefined;
	wpmDisplay.textContent = "0 WPM";
	accuracyDisplay.textContent = "0% Accuracy";
	newPhrase(); // Set a new phrase for the next test
};

document.addEventListener("keyup", function (event) {
	if (event.key === "Tab" || event.key === "Enter") {
		resetButton.click(); // Trigger the reset button click event
	}
});

newPhrase(); // Set a phrase when the page loads
