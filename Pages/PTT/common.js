// Initialize Speech Recognition API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "he-IL"; // Set language to Hebrew
recognition.interimResults = false;

let transcriptions = ""; // String to store transcriptions

// Add timestamp to each transcription
function addTranscriptionWithTimestamp(text) {
    const timestamp = new Date().toLocaleString(); // Get readable timestamp
    return `${timestamp}: ${text}`;
}

// Start listening for speech
function startListening() {
    recognition.start();
    console.log("Listening...");
}

// Stop listening for speech
function stopListening() {
    recognition.stop();
    console.log("Stopped listening...");
}

// Handle recognition results
recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            const text = event.results[i][0].transcript.trim(); // Get transcribed text
            const textWithTimestamp = addTranscriptionWithTimestamp(text); // Add timestamp
            transcriptions += textWithTimestamp + "\n"; // Append to transcriptions

            // Save transcription to localStorage
            localStorage.setItem("transcriptions", transcriptions);

            // Log transcription
            console.log("Recognized text:", textWithTimestamp);

            // Log full transcription history
            console.log("Full transcription history:", localStorage.getItem("transcriptions"));
        }
    }
};

// Handle recognition errors
recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
    alert("Error during speech recognition: " + event.error);
};

// Attach events to PTT button
const pttButton = document.querySelector(".ptt");
if (pttButton) {
    pttButton.addEventListener("mousedown", startListening); // Start on press
    pttButton.addEventListener("mouseup", stopListening); // Stop on release
}
