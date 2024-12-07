document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  let victimID = urlParams.get("victimID");

  if (!victimID || isNaN(victimID)) {
    alert("No valid victim ID provided. Redirecting to the casualty list...");
    window.location.href = "../Casualty-list/casualty-card.html";
    return;
  }

  // Format victimID to match the expected format in mergedData
  victimID = victimID.padStart(4, "0");

  const mergedData = JSON.parse(localStorage.getItem("mergedData")) || [];
  const victimData = mergedData.find(
    (victim) => victim.victimNumber === `Victim #L${victimID}`
  );

  if (!victimData) {
    alert("Victim not found. Redirecting to the casualty list...");
    window.location.href = "../Casualty-list/casualty-card.html";
    return;
  }

  // Populate form fields
  document.getElementById("name").value = victimData.identification.name || "";
  document.getElementById("id").value = victimData.identification.id || "";
  document.getElementById("pulse").value =
    victimData.vitalsHistory.pulse.at(-1) || "";
  document.getElementById("breathing").value =
    victimData.vitalsHistory.breathing.at(-1) || "";
  document.getElementById("blood-pressure").value =
    victimData.vitalsHistory.bloodPressure.at(-1) || "";
  document.getElementById("consciousness").value =
    victimData.vitalsHistory.consciousnessLevel.at(-1) || "";

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

  // Add casualty button functionality
  const addCasualtyButton = document.getElementById("addCasualtyButton");
  addCasualtyButton?.addEventListener("click", () => {
    // Retrieve the current victimID from localStorage or initialize it
    let victimID = localStorage.getItem("victimID");
    victimID = victimID ? parseInt(victimID, 10) : 1;

    // Increment victimID for the new casualty
    const newVictimID = victimID + 1;
    localStorage.setItem("victimID", newVictimID);

    // Save the current victimID for the new casualty
    localStorage.setItem("currentVictimID", newVictimID);

    // Redirect to Add-casualty.html
    window.location.href = `../Add-casualty/Add-casualty.html?victimID=${newVictimID}`;
  });
});
