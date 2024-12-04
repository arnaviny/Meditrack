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

// Stop listening for speech and save to file
function stopListening() {
    recognition.stop();
    console.log("Stopped listening...");
    saveTranscriptionsToFile(); // Save automatically after stopping
}

// Handle recognition results
recognition.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
            const text = event.results[i][0].transcript.trim(); // Get transcribed text
            const textWithTimestamp = addTranscriptionWithTimestamp(text); // Add timestamp
            transcriptions += textWithTimestamp + "\n"; // Append to transcriptions
            console.log("Recognized text:", textWithTimestamp);
        }
    }
};

// Handle recognition errors
recognition.onerror = (event) => {
    console.error("Recognition error:", event.error);
    alert("Error during speech recognition: " + event.error);
};

// Save all transcriptions to a file automatically
function saveTranscriptionsToFile() {
    const fileName = `transcriptions.txt`; // Fixed file name
    const textBlob = new Blob([transcriptions], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(textBlob);
    downloadLink.download = fileName;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Attach events to PTT button
const pttButton = document.querySelector(".ptt");
if (pttButton) {
    pttButton.addEventListener("mousedown", startListening); // Start on press
    pttButton.addEventListener("mouseup", stopListening); // Stop on release
}
