function goBack() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", () => {
    const detailsContainer = document.getElementById("details-container");
    const casualtyId = new URLSearchParams(window.location.search).get("id"); // Get ID from URL

    if (!casualtyId) {
        detailsContainer.innerHTML = "<p>Error: No casualty ID provided.</p>";
        return;
    }

    const casualties = JSON.parse(localStorage.getItem("casualties")) || [];
    const casualty = casualties.find(c => c.victimNumber === casualtyId);

    if (!casualty) {
        detailsContainer.innerHTML = "<p>Error: Casualty not found.</p>";
        return;
    }

    // Generate HTML for casualty details
    const casualtyHTML = `
        <div class="casualty-card">
            <h2>${casualty.victimNumber}</h2>
            <p><strong>Name:</strong> ${casualty.victemIdentifiction?.name || "Unknown"}</p>
            <p><strong>ID:</strong> ${casualty.victemIdentifiction?.id || "Unknown"}</p>
            <p><strong>Status:</strong> ${casualty.status || "Unknown"}</p>
            
            <h3>Vitals</h3>
            <ul>
                <li><strong>Pulse:</strong> ${formatHistory(casualty.vitals?.pulse)}</li>
                <li><strong>Breathing:</strong> ${formatHistory(casualty.vitals?.breathing)}</li>
                <li><strong>Blood Pressure:</strong> ${formatHistory(casualty.vitals?.bloodPressure)}</li>
                <li><strong>Consciousness Level:</strong> ${formatHistory(casualty.vitals?.consciousnessLevel)}</li>
            </ul>

            <h3>Shock Signs</h3>
            ${formatShockSigns(casualty.vitals?.shockSigns)}

            <h3>Injury Details</h3>
            ${formatInjuryDetails(casualty.injuryDetails)}

            <h3>BLS Treatments</h3>
            ${formatTreatments(casualty.BLS)}

            <h3>ALS Treatments</h3>
            ${formatTreatments(casualty.ALS)}
        </div>
    `;

    detailsContainer.innerHTML = casualtyHTML;
});

// Helper function to format history arrays
function formatHistory(history = []) {
    return history.length
        ? history.map(entry => `${entry.value} at ${entry.time}`).join("<br>")
        : "No data available";
}

// Helper function to format shock signs
function formatShockSigns(shockSigns = {}) {
    return Object.entries(shockSigns)
        .map(
            ([key, entry]) =>
                `<li><strong>${key}:</strong> ${entry.isTrue ? "Yes" : "No"} (Last updated: ${entry.time || "N/A"})</li>`
        )
        .join("");
}

// Helper function to format injury details
function formatInjuryDetails(injuryDetails = {}) {
    return Object.entries(injuryDetails)
        .map(
            ([key, entry]) =>
                `<li><strong>${key}:</strong> ${entry.location || "Unknown"} (${entry.mechanism || "Unknown"} at ${
                    entry.time || "N/A"
                })</li>`
        )
        .join("");
}

// Helper function to format treatments
function formatTreatments(treatments = {}) {
    return Object.entries(treatments)
        .map(
            ([key, entry]) =>
                `<li><strong>${key}:</strong> ${entry.isTrue ? "Performed" : "Not Performed"} (Last updated: ${
                    entry.time || "N/A"
                })</li>`
        )
        .join("");
}
