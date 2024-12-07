document.addEventListener("DOMContentLoaded", () => {
    const startEventButton = document.getElementById("startEventButton");
  
    startEventButton.addEventListener("click", (event) => {
      event.preventDefault(); // מונע פעולות ברירת מחדל
      console.log("Clearing localStorage...");
  
      // Clear the localStorage
      localStorage.clear();
  
      // Log to confirm clearing
      console.log("localStorage cleared!");
  
      // Navigate to the new page
      window.location.href = "./Pages/Casualty-list/casualty-card/casualty-card.html";
    });
  });
  