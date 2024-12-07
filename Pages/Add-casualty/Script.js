document.addEventListener("DOMContentLoaded", () => {
  // Get references to the clear button and form elements
  const clearButton = document.getElementById("clearButton");
  const formInputs = document.querySelectorAll("input[type='text']");
  const dropdowns = document.querySelectorAll("select");
  const shockButtons = document.querySelectorAll(".shock-item");

  // clear button
  // Add event listener to the clear button
  clearButton.addEventListener("click", () => {
    // Clear all text inputs
    formInputs.forEach((input) => {
      input.value = "";
    });

    // Reset all dropdowns to their default option
    dropdowns.forEach((dropdown) => {
      dropdown.selectedIndex = 0;
    });

    // Deselect all shock buttons
    shockButtons.forEach((button) => {
      button.classList.remove("selected");
    });
    selectedTreatmentsContainerALS.forEach((button) => {
      button.classList.remove("selected");
    });

    console.log("Form cleared.");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  // Get references to relevant elements
  const submitButton = document.getElementById("submitButton");
  const formInputs = document.querySelectorAll("input[type='text']");
  const dropdowns = document.querySelectorAll("select");
  const shockButtons = document.querySelectorAll(".shock-item");
  const clearButton = document.getElementById("clearButton");

  // Treatment-related variables
  const selectedTreatmentsBLS = [];
  const selectedTreatmentsALS = [];

  const treatmentSelectBLS = document.getElementById("treatment-select");
  const selectedTreatmentsContainerBLS = document.getElementById("selected-treatments");
  const addTreatmentBLSButton = document.getElementById("add-treatment-btn");

  const treatmentSelectALS = document.getElementById("treatment-select-ALS");
  const selectedTreatmentsContainerALS = document.getElementById("selected-treatments-ALS");
  const addTreatmentALSButton = document.getElementById("add-treatment-atn");

  // Toggle selected class for shock signs
  shockButtons.forEach((button) => {
    button.addEventListener("click", () => button.classList.toggle("selected"));
  });

  // Add treatment (generic function for BLS and ALS)
  const addTreatment = (treatmentSelect, selectedList, container) => {
    const selectedValue = treatmentSelect.value;
    if (selectedValue && !selectedList.includes(selectedValue)) {
      selectedList.push(selectedValue);

      // Create a treatment icon
      const treatmentIcon = document.createElement("div");
      treatmentIcon.classList.add("treatment-icon");
      treatmentIcon.textContent = selectedValue;

      // Add a delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.innerHTML = "&times;";
      deleteBtn.addEventListener("click", () => {
        treatmentIcon.remove();
        const index = selectedList.indexOf(selectedValue);
        if (index > -1) selectedList.splice(index, 1);
      });

      treatmentIcon.appendChild(deleteBtn);
      container.appendChild(treatmentIcon);
      treatmentSelect.value = ""; // Reset dropdown
    }
  };

  // Add treatment event listeners
  addTreatmentBLSButton?.addEventListener("click", () =>
    addTreatment(treatmentSelectBLS, selectedTreatmentsBLS, selectedTreatmentsContainerBLS)
  );

  addTreatmentALSButton?.addEventListener("click", () =>
    addTreatment(treatmentSelectALS, selectedTreatmentsALS, selectedTreatmentsContainerALS)
  );

  // Clear form functionality
  clearButton?.addEventListener("click", () => {
    formInputs.forEach((input) => (input.value = ""));
    dropdowns.forEach((dropdown) => (dropdown.selectedIndex = 0));
    shockButtons.forEach((button) => button.classList.remove("selected"));
    selectedTreatmentsContainerBLS.innerHTML = "";
    selectedTreatmentsContainerALS.innerHTML = "";
    selectedTreatmentsBLS.length = 0;
    selectedTreatmentsALS.length = 0;
    console.log("Form cleared.");
  });

  // Submit form functionality
  submitButton?.addEventListener("click", (event) => {
    event.preventDefault();
  
    // Collect form data
    const formData = {};
    formInputs.forEach((input) => {
      formData[input.name] = input.value;
    });
    dropdowns.forEach((dropdown) => {
      formData[dropdown.name] = dropdown.value;
    });
  
    const selectedShockSigns = Array.from(shockButtons)
      .filter((button) => button.classList.contains("selected"))
      .map((button) => button.textContent);
  
    formData.shockSigns = selectedShockSigns;
    formData.blsTreatments = [...selectedTreatmentsBLS];
    formData.alsTreatments = [...selectedTreatmentsALS];
    formData.victimID = currentVictimID; // Use current victimID
  
    // Save the data in localStorage
    const mainData = JSON.parse(localStorage.getItem("form-data")) || [];
    mainData.push(formData);
    localStorage.setItem("form-data", JSON.stringify(mainData));
  
    // Retrieve existing data for merging
    const victimInjuries = JSON.parse(localStorage.getItem("injuriesData")) || {};
    const medicineHistory = JSON.parse(localStorage.getItem("medicineHistory")) || [];
  
    // Call the mergeVictimData function
    mergeVictimData(currentVictimID, mainData, victimInjuries[currentVictimID] || {}, medicineHistory);
  
    // Increment victimID for future entries
    const newVictimID = parseInt(currentVictimID, 10) + 1;
    localStorage.setItem("victimID", newVictimID);
    localStorage.removeItem("currentVictimID"); // Clear currentVictimID for next session
  
    alert("Casualty data saved successfully!");
  
    // Redirect to the casualty card page
    window.location.href = "../Casualty-list/casualty-card/casualty-card.html";
  });
  
});

// Add Medication button functionality
document.getElementById("addMedicationButton").addEventListener("click", () => {
  const victimIDField = document.getElementById("victimID");

  if (!victimIDField || !victimIDField.value) {
    alert("Victim ID is missing. Please add a casualty first.");
    return;
  }

  const victimID = victimIDField.value; // Get victimID from the input field
  localStorage.setItem("currentVictimID", victimID); // Save to localStorage
  window.location.href = "../medication/medication.html"; // Redirect to medication page
});
