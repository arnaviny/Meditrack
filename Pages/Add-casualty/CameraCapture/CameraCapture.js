const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const resultContainer = document.getElementById("result-container");
const recognizedName = document.getElementById("recognized-name");
const recognizedID = document.getElementById("recognized-id");
const captureButton = document.getElementById("capture-button");
const retryButton = document.getElementById("retry-button");
const saveButton = document.getElementById("save-button");
const cancelButton = document.getElementById("cancel-button");

// הפעלת מצלמה
navigator.mediaDevices
  .getUserMedia({ video: { facingMode: "environment" } })
  .then((stream) => {
    video.srcObject = stream;
  })
  .catch((err) => {
    console.error("Error accessing the camera:", err);
    alert("לא ניתן לגשת למצלמה. בדוק הרשאות.");
  });

// צילום תמונה
captureButton.addEventListener("click", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  canvas.style.display = "block";
  video.style.display = "none";
  resultContainer.style.display = "flex";

  Tesseract.recognize(canvas.toDataURL(), "heb", {
    logger: (info) => console.log(info),
  })
    .then(({ data: { text } }) => {
      console.log("Recognized Text:", text);

      const lines = text.split("\n").map((line) => line.trim());
      const name = lines.find((line) => line.includes("שם")) || "לא זוהה";
      const personalId = lines.find((line) => line.includes("מספר אישי")) || "לא זוהה";

      recognizedName.textContent = `שם: ${name.replace("שם", "").trim()}`;
      recognizedID.textContent = `מספר אישי: ${personalId.replace("מספר אישי", "").trim()}`;
    })
    .catch((err) => {
      console.error("Error during OCR:", err);
      alert("זיהוי נכשל. נסה שוב.");
    });
});

// צלם שוב
retryButton.addEventListener("click", () => {
  resultContainer.style.display = "none";
  canvas.style.display = "none";
  video.style.display = "block";
});

// ביטול
cancelButton.addEventListener("click", () => {
  history.back();
});

// שמירה
saveButton.addEventListener("click", () => {
  const name = recognizedName.textContent.replace("שם: ", "");
  const id = recognizedID.textContent.replace("מספר אישי: ", "");

  localStorage.setItem("scannedName", name);
  localStorage.setItem("scannedID", id);

  alert("המידע נשמר בהצלחה!");
  window.location.href = "../Add-casualty.html";
});
