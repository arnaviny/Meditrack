const video = document.getElementById('video');
        const captureButton = document.getElementById('capture-button');
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        const resultContainer = document.getElementById('result-container');
        const recognizedName = document.getElementById('recognized-name');
        const recognizedID = document.getElementById('recognized-id');
        const retryButton = document.getElementById('retry-button');
        const saveButton = document.getElementById('save-button');
        const cancelButton = document.getElementById('cancel-button');

        // הפעלת מצלמה
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
            .then(videoStream => {
                video.srcObject = videoStream;
            })
            .catch(err => {
                console.error("Error accessing the camera:", err);
                alert("לא ניתן לגשת למצלמה. בדוק הרשאות.");
            });

        // שיפור תמונה
        function enhanceImage(canvas) {
            const ctx = canvas.getContext('2d');
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
        
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
        
                // המרת צבע לגווני אפור
                const gray = 0.3 * r + 0.59 * g + 0.11 * b;
        
                // שיפור קונטרסט
                const enhancedGray = Math.min(255, Math.max(0, gray * 1.2));
        
                data[i] = data[i + 1] = data[i + 2] = enhancedGray; // עדכון פיקסל
            }
        
            ctx.putImageData(imageData, 0, 0);
        }
        

        captureButton.addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // עיבוד התמונה
    preprocessImage(canvas);

    Tesseract.recognize(canvas.toDataURL(), 'heb', { logger: info => console.log(info) })
        .then(({ data: { text } }) => {
            console.log("OCR Text:", text);

            // חילוץ שורות הטקסט
            const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

            // זיהוי שם
            const nameLine = lines.find(line => line.includes("שם"));
            const name = nameLine ? nameLine.replace(/.*שם\s*/, "").trim() : "Unknown Name";

            // זיהוי מספר אישי
            const idLine = lines.find(line => line.includes("מספר אישי"));
            const personalId = idLine ? idLine.replace(/.*מספר אישי\s*/, "").trim() : "Unknown ID";

            recognizedName.textContent = `שם: ${name}`;
            recognizedID.textContent = `מספר אישי: ${personalId}`;
            resultContainer.style.display = 'flex';
        })
        .catch(err => {
            console.error("Error during OCR:", err);
            alert("Failed to process the image.");
        });
});


        retryButton.addEventListener('click', () => {
            resultContainer.style.display = 'none';
            canvas.style.display = 'none';
            video.style.display = 'block';
        });

        cancelButton.addEventListener('click', () => {
            history.back();
        });

        saveButton.addEventListener('click', () => {
            const nameAndID = {
                name: recognizedName.textContent.replace("שם: ", ""),
                ID: recognizedID.textContent.replace("מספר אישי: ", ""),
            };

            const existingData = JSON.parse(localStorage.getItem('victims')) || [];
            existingData.push(nameAndID);
            localStorage.setItem('victims', JSON.stringify(existingData));
            alert("המידע נשמר בהצלחה!");
        });