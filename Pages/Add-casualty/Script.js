//selc on shock sign  

const shockButtons = document.querySelectorAll(".shock-item");
const submitButton = document.getElementById("submitButton");

// Toggle 'selected' class for shock signs
shockButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("selected");
  });
});
//send data to the backend
// Submit form data to backend
submitButton.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;
  const pulse = document.getElementById("pulse").value;
  const breathing = document.getElementById("breathing").value;
  const bloodPressure = document.getElementById("blood-pressure").value;
  const consciousnessLevel = document.getElementById(
    "consciousness-level"
  ).value;

  const selectedShockSigns = Array.from(shockButtons)
    .filter((button) => button.classList.contains("selected"))
    .map((button) => button.textContent);

  const formData = {
    name,
    id,
    vitalSigns: { pulse, breathing, bloodPressure, consciousnessLevel },
    shockSigns: selectedShockSigns,
  };

  try {
    const response = await fetch("http://localhost:3000/api/save-data", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Data submitted successfully!");
    } else {
      alert("Error submitting data.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Unable to connect to the server.");
  }
});
//select Treatment BLS
// Get references to DOM elements
const treatmentSelect = document.getElementById("treatment-select");
const addTreatmentBtn = document.getElementById("add-treatment-btn");
const selectedTreatmentsContainer = document.getElementById(
  "selected-treatments"
);

// Event listener for the Add button
addTreatmentBtn.addEventListener("click", () => {
  const selectedValue = treatmentSelect.value;

  if (selectedValue) {
    // Create a new treatment icon
    const treatmentIcon = document.createElement("div");
    treatmentIcon.classList.add("treatment-icon");
    treatmentIcon.textContent = selectedValue;

    // Create a delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = "&times;";
    deleteBtn.addEventListener("click", () => {
      treatmentIcon.remove();
    });

    // Append delete button to the treatment icon
    treatmentIcon.appendChild(deleteBtn);

    // Add the treatment icon to the container
    selectedTreatmentsContainer.appendChild(treatmentIcon);

    // Reset the dropdown menu
    treatmentSelect.value = "";
  }
});

//select Treatment ALS
const treatmentSelectALS = document.getElementById("treatment-select-ALS");
const addTreatmentAtn = document.getElementById("add-treatment-atn");
const selectedTreatmentsContainerALS = document.getElementById(
  "selected-treatments-ALS"
);

// Event listener for the Add button
addTreatmentAtn.addEventListener("click", () => {
  const selectedValueALS = treatmentSelectALS.value;

  if (selectedValueALS) {
    // Create a new treatment icon
    const treatmentIconALS = document.createElement("div");
    treatmentIconALS.classList.add("treatment-icon");
    treatmentIconALS.textContent = selectedValueALS;

    // Create a delete button
    const deleteAtn = document.createElement("button");
    deleteAtn.classList.add("delete-Atn");
    deleteAtn.innerHTML = "&times;";
    deleteAtn.addEventListener("click", () => {
      treatmentIconALS.remove();
    });

    // Append delete button to the treatment icon
    treatmentIconALS.appendChild(deleteAtn);

    // Add the treatment icon to the container
    selectedTreatmentsContainerALS.appendChild(treatmentIconALS);

    // Reset the dropdown menu
    treatmentSelectALS.value = "";
  }
});

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

    // Optionally, log the action
    console.log("Form cleared.");
  });
});
//print deatils
// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get references to the submit button and all input elements
  const submitButton = document.getElementById("submitButton");
  const formInputs = document.querySelectorAll("input[type='text']");
  const dropdowns = document.querySelectorAll("select");
  const shockButtons = document.querySelectorAll(".shock-item");

  // Add event listener to the submit button
  submitButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Create an object to hold all form data
    const formData = {};

    // Add text input values to the object
    formInputs.forEach((input) => {
      formData[input.name] = input.value;
    });

    // Add dropdown values to the object
    dropdowns.forEach((dropdown) => {
      formData[dropdown.name] = dropdown.value;
    });

    // Add selected shock signs to the object
    const selectedShockSigns = Array.from(shockButtons)
      .filter((button) => button.classList.contains("selected"))
      .map((button) => button.textContent);

    formData.shockSigns = selectedShockSigns;

    // Log the object to the console
    console.log("Form Data:", formData);
    localStorage.setItem('form-data', JSON.stringify(formData)) //push
    const data = JSON.parse(localStorage.getItem('form-data')) //pull
    window.location.href = 'nextPage.html';
    // Optional: Perform further actions, such as sending the data to a server
  });
});
