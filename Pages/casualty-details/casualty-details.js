document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const victimID = urlParams.get("victimID");

    if (!victimID) {
        alert("No victim ID provided. Redirecting to the casualty list...");
        window.location.href = "../Casualty-list/casualty-card.html";
        return;
    }

    const mergedData = JSON.parse(localStorage.getItem("mergedData")) || [];
    const victimData = mergedData.find(
        (victim) => victim.victimNumber === `Victim #L${victimID.padStart(4, "0")}`
    );

    if (!victimData) {
        alert("Victim not found. Redirecting to the casualty list...");
        window.location.href = "../Casualty-list/casualty-card.html";
        return;
    }

    // Populate form fields
    document.getElementById("name").value = victimData.identification?.name || "";
    document.getElementById("id").value = victimData.identification?.id || "";
    document.getElementById("pulse").value =
        victimData.vitalsHistory?.pulse.at(-1) || "";
    document.getElementById("breathing").value =
        victimData.vitalsHistory?.breathing.at(-1) || "";
    document.getElementById("blood-pressure").value =
        victimData.vitalsHistory?.bloodPressure.at(-1) || "";
    document.getElementById("consciousness").value =
        victimData.vitalsHistory?.consciousnessLevel.at(-1) || "";

    // Save updated data on form submission
    document.getElementById("updateButton").addEventListener("click", () => {
        victimData.identification.name =
            document.getElementById("name").value || "Unknown";
        victimData.identification.id = document.getElementById("id").value || "Unknown";
        victimData.vitalsHistory.pulse.push(document.getElementById("pulse").value);
        victimData.vitalsHistory.breathing.push(
            document.getElementById("breathing").value
        );
        victimData.vitalsHistory.bloodPressure.push(
            document.getElementById("blood-pressure").value
        );
        victimData.vitalsHistory.consciousnessLevel.push(
            document.getElementById("consciousness").value
        );

        // Update localStorage
        localStorage.setItem("mergedData", JSON.stringify(mergedData));

        alert("Victim details updated successfully!");
    });
});
