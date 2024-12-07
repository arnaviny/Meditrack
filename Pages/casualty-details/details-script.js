document.addEventListener("DOMContentLoaded", function() {
    const element = document.getElementById("someId");
    if (element) {
        element.addEventListener("click", function() {
            console.log("Clicked!");
        });
    } else {
        console.error("Element with ID 'someId' not found.");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const someElement = document.getElementById("someId");
    if (someElement) {
        someElement.addEventListener("click", () => {
            console.log("נלחץ על הכפתור!");
        });
    } else {
        console.error("לא נמצא אלמנט עם ID בשם 'someId'.");
    }
});
