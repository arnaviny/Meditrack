// Initialize Speech Recognition API
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "he-IL"; // Set language to Hebrew
recognition.interimResults = false;

// Retrieve existing transcriptions from localStorage or initialize an empty array
let transcriptions = localStorage.getItem("transcriptions");
transcriptions = transcriptions ? transcriptions.split("\n") : [];

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
            transcriptions.push(textWithTimestamp); // Add to transcriptions array

            // Save updated transcriptions to localStorage
            localStorage.setItem("transcriptions", transcriptions.join("\n"));

            // Log transcription
            console.log("Recognized text:", textWithTimestamp);

            // Log full transcription history
            console.log("Full transcription history:", transcriptions.join("\n"));
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


// Update localStorage and notify other tabs
localStorage.setItem("transcriptions", transcriptions.join("\n"));

// Notify the current tab to update the list
window.dispatchEvent(new Event("storage"));
