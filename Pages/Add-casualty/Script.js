const shockButtons = document.querySelectorAll(".shock-item");
const submitButton = document.getElementById("submitButton");

// Toggle 'selected' class for shock signs
shockButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.toggle("selected");
  });
});
//select Treatment BLS
// Get references to DOM elements
const treatmentSelect = document.getElementById("treatment-select");
const addTreatmentBtn = document.getElementById("add-treatment-btn");
const selectedTreatmentsContainer = document.getElementById(
  "selected-treatments"
);

//select Treatment ALS
const treatmentSelectALS = document.getElementById("treatment-select-ALS");
const addTreatmentAtn = document.getElementById("add-treatment-atn");
const selectedTreatmentsContainerALS = document.getElementById(
  "selected-treatments-ALS"
);

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

  // References for BLS and ALS treatments
  const treatmentSelectBLS = document.getElementById("treatment-select");
  const selectedTreatmentsBLSContainer = document.getElementById(
    "selected-treatments"
  );
  const addTreatmentBLSButton = document.getElementById("add-treatment-btn");

  const treatmentSelectALS = document.getElementById("treatment-select-ALS");
  const selectedTreatmentsALSContainer = document.getElementById(
    "selected-treatments-ALS"
  );
  const addTreatmentALSButton = document.getElementById("add-treatment-atn");

  // Arrays to store selected treatments
  let selectedTreatmentsBLS = [];
  let selectedTreatmentsALS = [];

  // Add selected BLS treatments to the list
  addTreatmentBLSButton.addEventListener("click", () => {
    const selectedTreatment =
      treatmentSelectBLS[treatmentSelectBLS.selectedIndex].value;
    if (
      selectedTreatment &&
      !selectedTreatmentsBLS.includes(selectedTreatment)
    ) {
      selectedTreatmentsBLS.push(selectedTreatment);

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

      // Clear the dropdown selection
      treatmentSelectBLS.value = "";
    }
  });

  // Add selected ALS treatments to the list
  addTreatmentALSButton.addEventListener("click", () => {
    const selectedTreatment =
      treatmentSelectALS[treatmentSelectALS.selectedIndex].value;
    const selectedValueALS = treatmentSelectALS.value;

    if (
      selectedTreatment &&
      !selectedTreatmentsALS.includes(selectedTreatment)
    ) {
      selectedTreatmentsALS.push(selectedTreatment);
    }
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

    // Add selected BLS and ALS treatments to the object
    console.log(selectedTreatmentsALS);

    formData.blsTreatments = [...selectedTreatmentsBLS]; // Copy of BLS treatments
    formData.alsTreatments = [...selectedTreatmentsALS]; // Copy of ALS treatments
    // Log the object to the console
    console.log("Form Data:", formData);

    let victimID = localStorage.getItem("victimID");
    victimID = victimID && !isNaN(victimID) ? parseInt(victimID, 10) : 0; // Validate and parse as number, default to 0 if invalid

    // Increment the victimID
    victimID += 1;

    // Assign the incremented victimID to your formData object
    formData.victimID = victimID;
    // Save the updated victimID back to localStorage for future increments
    localStorage.setItem("victimID", victimID);
    const mainData = JSON.parse(localStorage.getItem("form-data"));
    mainData.push(formData);
    localStorage.setItem("form-data", JSON.stringify(mainData)); //push
    const data = JSON.parse(localStorage.getItem("form-data")); //pull

    // Optional: Perform further actions, such as sending the data to a server
  });
});
