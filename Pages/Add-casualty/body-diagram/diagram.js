// הגדרת אובייקט המכיל את האפשרויות לפציעות עבור כל חלק גוף
const injuryOptions = {
  Head: ["Concussion", "Skull Fracture", "Laceration", "Burn"],
  Chest: ["Rib Fracture", "Pneumothorax", "Blunt Trauma"],
  Stomach: ["Internal Bleeding", "Penetration", "Blunt Trauma"],
  Others: ["Fracture", "Amputation", "Burn", "Blunt Trauma", "Penetration"],
};

// מיפוי חלקי גוף לקבוצות של פציעות
const groupMapping = {
  head: "Head",
  "left-shoulder": "Others",
  "right-shoulder": "Others",
  "left-arm": "Others",
  "right-arm": "Others",
  chest: "Chest",
  stomach: "Stomach",
  "left-leg": "Others",
  "right-leg": "Others",
  "left-hand": "Others",
  "right-hand": "Others",
  "left-foot": "Others",
  "right-foot": "Others",
};

document.addEventListener("DOMContentLoaded", () => {
  const bodyParts = document.querySelectorAll(".part");
  const formContainer = document.getElementById("form-container");
  const bodyPartTitle = document.getElementById("selected-part");
  const optionsContainer = document.getElementById("options-container");
  const injuryForm = document.getElementById("injury-form");
  const closeButton = document.getElementById("close-button");
  const addInjuryButton = document.getElementById("add-injury-button");
  const submitButton = document.querySelector('button[type="submit"]');

  const injuriesData = {}; // אובייקט לאחסון פציעות לפי חלקי גוף
  let selectedPart = null;

  let currentVictimID = localStorage.getItem("currentVictimID");
  if (!currentVictimID) {
    currentVictimID = victimID; // Assign current victimID
    localStorage.setItem("currentVictimID", currentVictimID);
  }

  // Set the victimID in the form field
  const victimIDField = document.getElementById("victimID");
  if (victimIDField) {
    victimIDField.value = currentVictimID; // Display the currentVictimID in the form
  } else {
    console.error("The victimID field is missing in the HTML.");
  }
  // אירוע בחירת חלק גוף
  bodyParts.forEach((part) => {
    part.addEventListener("click", () => {
      const partName = part.dataset.position;
      const group = groupMapping[partName.toLowerCase()];
      if (!group) return;

      const options = injuryOptions[group];
      selectedPart = part;
      part.style.fill = "blue";

      bodyPartTitle.textContent =
        partName.charAt(0).toUpperCase() + partName.slice(1);
      optionsContainer.innerHTML = "";

      // יצירת תיבות סימון
      options.forEach((option) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "injury-options";
        checkbox.value = option;

        if (injuriesData[partName]?.includes(option)) {
          checkbox.checked = true;
        }

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
      });

      formContainer.style.display = "block";
    });
  });

  // אירוע סגירת הטופס
  closeButton.addEventListener("click", () => {
    formContainer.style.display = "none";
    injuryForm.reset();
    if (selectedPart) selectedPart.style.fill = "";
    selectedPart = null;
  });

  // אירוע הוספת פציעה
  addInjuryButton.addEventListener("click", () => {
    if (selectedPart) {
      const partName = selectedPart.dataset.position;
      const selectedOptions = Array.from(
        document.querySelectorAll('input[name="injury-options"]:checked')
      ).map((checkbox) => checkbox.value);

      injuriesData[partName] = selectedOptions;

      selectedPart.style.fill = "red";
      formContainer.style.display = "none";
      injuryForm.reset();
      selectedPart = null;
    }
  });

  // אירוע שליחת הפציעות
  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
  
    // Load existing injuries data from localStorage or initialize an empty object
    const allInjuriesData = JSON.parse(localStorage.getItem("injuriesData")) || {};
  
    // Add the current injuriesData under the current victimID
    allInjuriesData[currentVictimID] = {
      ...(allInjuriesData[currentVictimID] || {}), // Keep existing data for this victimID
      injuriesData, // Update with new injuries data
    };
  
    // Save updated data back to localStorage
    localStorage.setItem("injuriesData", JSON.stringify(allInjuriesData));
  
    // Log the result for debugging
    console.log("Updated injuries data:", allInjuriesData);
  
    alert("Injuries submitted successfully!");
  
    // Reset the form and visual indicators
    bodyParts.forEach((part) => (part.style.fill = ""));
    formContainer.style.display = "none";
    selectedPart = null;
  });
  
});