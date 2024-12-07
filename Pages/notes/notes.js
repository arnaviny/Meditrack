// Function to load and display transcriptions
function displayTranscriptions() {
    const transcriptionsContainer = document.getElementById("transcriptions-list");

    if (!transcriptionsContainer) {
        console.error("Transcriptions container not found!");
        return;
    }

    // Retrieve transcriptions from localStorage
    const transcriptions = localStorage.getItem("transcriptions");
    const transcriptionsArray = transcriptions ? transcriptions.split("\n") : [];

    // Clear the container
    transcriptionsContainer.innerHTML = "";

    // Add each transcription as a list item
    transcriptionsArray.forEach((transcription) => {
        const listItem = document.createElement("li");
        listItem.textContent = transcription;
        transcriptionsContainer.appendChild(listItem);
    });
}

// Event listener for changes in localStorage
window.addEventListener("storage", (event) => {
    if (event.key === "transcriptions") {
        displayTranscriptions(); // Update the list if the transcriptions key changes
    }
});

// Load transcriptions on page load
document.addEventListener("DOMContentLoaded", displayTranscriptions);
