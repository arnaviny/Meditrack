document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the current victimID from localStorage
    const victimID = localStorage.getItem("currentVictimID");

    // Redirect if victimID is not found
    if (!victimID) {
        alert("No victimID found. Redirecting...");
        window.location.href = "../Add-casualty/Add-casualty.html";
        return;
    }

    // Display the victimID on the page (optional)
    const victimIDDisplay = document.getElementById("victimIDDisplay");
    if (victimIDDisplay) {
        victimIDDisplay.textContent = `Victim ID: ${victimID}`;
    }

    // Handle medication submission
    document.getElementById("mdn-submit-btn").addEventListener("click", () => {
        const medicineName = document.getElementById("mdn-input").value;
        const dosage = document.getElementById("amount-presentor").textContent;
        const unit = document.getElementById("unit-type").value;
        const timestamp = new Date().toLocaleString();

        // Validation for empty fields
        if (!medicineName || !dosage || !unit) {
            alert("Please fill in all fields.");
            return;
        }

        // Create medication data object
        const medicationData = {
            victimID: victimID, // Include victimID
            medicineName,
            dosage,
            unit,
            timestamp,
        };

        // Retrieve existing victim data from localStorage
        const allVictimData = JSON.parse(localStorage.getItem("victimData")) || {};

        // Ensure victim's medication history exists
        if (!allVictimData[victimID]) {
            allVictimData[victimID] = { medicineHistory: [] };
        }

        // Add new medication to the history
        allVictimData[victimID].medicineHistory.push(medicationData);

        // Save updated data back to localStorage
        localStorage.setItem("victimData", JSON.stringify(allVictimData));
        alert("Medication saved successfully!");

        // Optionally clear inputs for new entry
        document.getElementById("mdn-input").value = "";
        document.getElementById("amount-presentor").textContent = "0.00";
    });
});
