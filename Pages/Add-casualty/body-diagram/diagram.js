// הגדרת אובייקט המכיל את האפשרויות לפציעות עבור כל חלק גוף
const injuryOptions = {
  Head: ["Concussion", "Skull Fracture", "Laceration", "Burn"], // פציעות הקשורות לראש
  Chest: ["Rib Fracture", "Pneumothorax", "Blunt Trauma"], // פציעות הקשורות לחזה
  Stomach: ["Internal Bleeding", "Penetration", "Blunt Trauma"], // פציעות הקשורות לבטן
  Others: ["Fracture", "Amputation", "Burn", "Blunt Trauma", "Penetration"], // פציעות כלליות שניתן להחיל על חלקי גוף שונים
};

// מיפוי חלקי גוף לקבוצות של פציעות
const groupMapping = {
  head: "Head", // ראש
  "left-shoulder": "Others", // כתף שמאל
  "right-shoulder": "Others", // כתף ימין
  "left-arm": "Others", // יד שמאל
  "right-arm": "Others", // יד ימין
  chest: "Chest", // חזה
  stomach: "Stomach", // בטן
  "left-leg": "Others", // רגל שמאל
  "right-leg": "Others", // רגל ימין
  "left-hand": "Others", // יד שמאל
  "right-hand": "Others", // יד ימין
  "left-foot": "Others", // רגל שמאל
  "right-foot": "Others", // רגל ימין
};

document.addEventListener("DOMContentLoaded", () => {
  const bodyParts = document.querySelectorAll(".part"); // בוחר את כל החלקים בגוף מה-SVG
  const formContainer = document.getElementById("form-container"); // קונטיינר לטופס הפציעות
  const bodyPartTitle = document.getElementById("selected-part"); // כותרת הטופס שמציגה את שם החלק שנבחר
  const optionsContainer = document.getElementById("options-container"); // קונטיינר שמכיל את אפשרויות הפציעות
  const injuryForm = document.getElementById("injury-form"); // הטופס עצמו
  const closeButton = document.getElementById("close-button"); // כפתור סגירה
  const addInjuryButton = document.getElementById("add-injury-button"); // כפתור הוספת פציעה
  const submitButton = document.querySelector('button[type="submit"]'); // כפתור שליחה

  const injuriesData = {}; // משתנה לאחסון פציעות עבור כל חלק גוף
  let selectedPart = null;
  let lastSelectedPart = null; // משתנה למעקב אחרי החלק שנבחר לאחרונה

  bodyParts.forEach((part) => {
    part.addEventListener("click", () => {
      const partName = part.dataset.position;
      const group = groupMapping[partName.toLowerCase()];
      if (!group) return;

      const options = injuryOptions[group];

      if (selectedPart !== part) {
        selectedPart = part;
        part.style.fill = "blue";
        lastSelectedPart = part;
      }

      bodyPartTitle.textContent =
        partName.charAt(0).toUpperCase() + partName.slice(1);
      optionsContainer.innerHTML = "";

      options.forEach((option) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "injury-options";
        checkbox.value = option;

        if (injuriesData[partName] && injuriesData[partName].includes(option)) {
          checkbox.checked = true;
        }

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(option));
        optionsContainer.appendChild(label);
      });

      formContainer.style.display = "block";
    });
  });

  closeButton.addEventListener("click", () => {
    formContainer.style.display = "none";
    injuryForm.reset();

    if (lastSelectedPart) {
      lastSelectedPart.style.fill = "";
      lastSelectedPart = null;
    }
  });

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

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (selectedPart && !injuriesData[selectedPart.dataset.position]) {
      const partName = selectedPart.dataset.position;
      const selectedOptions = Array.from(
        document.querySelectorAll('input[name="injury-options"]:checked')
      ).map((checkbox) => checkbox.value);

      injuriesData[partName] = selectedOptions;
    }

    // Save injuries data to localStorage
    localStorage.setItem("injuriesData", JSON.stringify(injuriesData));

    // Log for debugging
    console.log("Submitted injuries data:", injuriesData);
    console.log(
      "Saved in localStorage:",
      JSON.parse(localStorage.getItem("injuriesData"))
    );

    alert("Injuries submitted successfully! Check the console for details.");

    bodyParts.forEach((part) => {
      part.style.fill = "";
    });

    Object.keys(injuriesData).forEach((key) => delete injuriesData[key]);

    formContainer.style.display = "none";
    injuryForm.reset();
    selectedPart = null;
  });
});
