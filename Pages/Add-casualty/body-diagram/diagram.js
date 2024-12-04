// הגדרת אובייקט המכיל את האפשרויות לפציעות עבור כל חלק גוף
const injuryOptions = {
    Head: ["Concussion", "Skull Fracture", "Laceration", "Burn"], // פציעות הקשורות לראש
    Chest: ["Rib Fracture", "Pneumothorax", "Blunt Trauma"], // פציעות הקשורות לחזה
    Stomach: ["Internal Bleeding", "Penetration", "Blunt Trauma"], // פציעות הקשורות לבטן
    Others: ["Fracture", "Amputation", "Burn", "Blunt Trauma", "Penetration"] // פציעות כלליות שניתן להחיל על חלקי גוף שונים
};

// מיפוי חלקי גוף לקבוצות של פציעות
const groupMapping = {
    "head": "Head", // ראש
    "left-shoulder": "Others", // כתף שמאל
    "right-shoulder": "Others", // כתף ימין
    "left-arm": "Others", // יד שמאל
    "right-arm": "Others", // יד ימין
    "chest": "Chest", // חזה
    "stomach": "Stomach", // בטן
    "left-leg": "Others", // רגל שמאל
    "right-leg": "Others", // רגל ימין
    "left-hand": "Others", // יד שמאל
    "right-hand": "Others", // יד ימין
    "left-foot": "Others", // רגל שמאל
    "right-foot": "Others" // רגל ימין
};

// מאזינים לאירועים כאשר הדף נטען (DOMContentLoaded)
document.addEventListener('DOMContentLoaded', () => {
    // משתנים שמהם נשאב המידע לאלמנטים שונים בדף
    const bodyParts = document.querySelectorAll('.part'); // בוחר את כל החלקים בגוף מה-SVG
    const formContainer = document.getElementById('form-container'); // קונטיינר לטופס הפציעות
    const bodyPartTitle = document.getElementById('selected-part'); // כותרת הטופס שמציגה את שם החלק שנבחר
    const optionsContainer = document.getElementById('options-container'); // קונטיינר שמכיל את אפשרויות הפציעות
    const injuryForm = document.getElementById('injury-form'); // הטופס עצמו
    const closeButton = document.getElementById('close-button'); // כפתור סגירה
    const addInjuryButton = document.getElementById('add-injury-button'); // כפתור הוספת פציעה
    const submitButton = document.querySelector('button[type="submit"]'); // כפתור שליחה

    // משתנה לאחסון פציעות עבור כל חלק גוף
    const injuriesData = {};

    // משתנים למעקב אחרי החלק שנבחר
    let selectedPart = null;
    let lastSelectedPart = null; // משתנה למעקב אחרי החלק שנבחר לאחרונה

    // מאזין לאירועים כאשר לוחצים על חלק גוף (הזמנה של הפורם עבור פציעות)
    bodyParts.forEach(part => {
        part.addEventListener('click', () => {
            const partName = part.dataset.position; // שמו של החלק הנבחר מתוך הנתון שנמצא ב-data-position

            // מוודאים שהחלק שנבחר קיים במיפוי
            const group = groupMapping[partName.toLowerCase()];
            if (!group) return; // אם לא קיים כזה, לא לעשות כלום

            const options = injuryOptions[group]; // שולפים את האפשרויות לפציעות עבור הקבוצה של החלק

            // מדגישים את החלק הנבחר בצבע אדום
            if (selectedPart !== part) {
                selectedPart = part;
                part.style.fill = 'blue'; // מדגישים את החלק בצבע כחול
                lastSelectedPart = part; // שומרים את החלק האחרון שנבחר
            }

            // עדכון כותרת הטופס והאפשרויות
            bodyPartTitle.textContent = partName.charAt(0).toUpperCase() + partName.slice(1); // עדכון שם החלק בפורם
            optionsContainer.innerHTML = ''; // ניקוי האפשרויות הקודמות

            // הצגת האפשרויות לפציעות
            options.forEach(option => {
                const label = document.createElement('label'); // יצירת תגית label
                const checkbox = document.createElement('input'); // יצירת תיבת סימון
                checkbox.type = 'checkbox'; // הגדרת סוג התיבה כ-checkbox
                checkbox.name = 'injury-options'; // שם תיבת הסימון
                checkbox.value = option; // ערך של תיבת הסימון

                // בדיקת אם הפציעה כבר נבחרה
                if (injuriesData[partName] && injuriesData[partName].includes(option)) {
                    checkbox.checked = true; // מסמנים את תיבת הסימון אם הייתה נבחרת קודם
                }

                label.appendChild(checkbox); // מצרפים את תיבת הסימון לתגית label
                label.appendChild(document.createTextNode(option)); // מצרפים את שם הפציעה
                optionsContainer.appendChild(label); // מוסיפים את התגית לתוך הקונטיינר
            });

            formContainer.style.display = 'block'; // מציגים את הטופס
        });
    });

    // כפתור סגירה - הסתרת הטופס והחזרת המצב לקדמותו
    closeButton.addEventListener('click', () => {
        formContainer.style.display = 'none'; // הסתרת הטופס
        injuryForm.reset(); // איפוס הטופס

        // הסרת הדגשת צבע מהחלק שנבחר
        if (lastSelectedPart) {
            lastSelectedPart.style.fill = ''; // מחזירים את צבע ברירת המחדל
            lastSelectedPart = null; // מאפסים את החלק שנבחר לאחרונה
        }
    });

    // כפתור הוספת פציעה
    addInjuryButton.addEventListener('click', () => {
        if (selectedPart) {
            const partName = selectedPart.dataset.position; // מקבלים את שם החלק שנבחר
            const selectedOptions = Array.from(
                document.querySelectorAll('input[name="injury-options"]:checked') // בוחרים את כל תיבות הסימון שנבחרו
            ).map(checkbox => checkbox.value); // שולפים את הערכים של תיבות הסימון

            // שומרים את הפציעות עבור החלק הנבחר
            injuriesData[partName] = selectedOptions;

            // שומרים את החלק בצבע כחול
            selectedPart.style.fill = 'red'; // מצביע על כך שהחלק התעדכן

            // מסתירים את הטופס ושומרים את החלק בצבע כחול
            formContainer.style.display = 'none';
            injuryForm.reset(); // איפוס הטופס
            selectedPart = null; // מאפשרים לבחור חלק חדש
        }
    });

    // טיפול בכפתור שליחה
    submitButton.addEventListener('click', (e) => {
        // מונע את פעולת ברירת המחדל של כפתור ה-submit (שליחת טופס)
        e.preventDefault();
    
        // אם יש איבר שנבחר ולא הוספת לו פציעה, הוסף אותו למילון
        if (selectedPart && !injuriesData[selectedPart.dataset.position]) {
            // מקבל את שם החלק שנבחר מתוך ה-data-position של האיבר שנבחר
            const partName = selectedPart.dataset.position;
    
            // בודק את כל תיבות הסימון שנבחרו וממיר את הערכים שלהן לארray
            const selectedOptions = Array.from(
                document.querySelectorAll('input[name="injury-options"]:checked')
            ).map(checkbox => checkbox.value);
    
            // הוסף את הפציעות שנבחרו לאיבר שנבחר במילון injuriesData
            injuriesData[partName] = selectedOptions;
        }
    
        // הצגת הנתונים שנבחרו בקונסול לצורכי debugging
        console.log('Submitted injuries data:', injuriesData);
    
        // מציג הודעת התראה למשתמש שהנתונים נשלחו בהצלחה
        alert('Injuries submitted successfully! Check the console for details.');
    
        // איפוס הצבעים של כל חלקי הגוף בתצוגה
        bodyParts.forEach(part => {
            part.style.fill = ''; // מחזיר את הצבעים לברירת המחדל של החלקים
        });
    
        // מנקה את נתוני הפציעות במילון injuriesData
        Object.keys(injuriesData).forEach(key => delete injuriesData[key]);
    
        // איפוס הטופס ומסתירים אותו
        formContainer.style.display = 'none'; // מסתיר את טופס הפציעות
        injuryForm.reset(); // מאפס את תוכן הטופס
        selectedPart = null; // מאפס את המשתנה של החלק שנבחר, מאפשר לבחור חלק חדש
    });
});
