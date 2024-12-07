document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const victimID = urlParams.get("victimID");
  
    if (!victimID) {
      alert("No victim ID provided. Redirecting...");
      window.location.href = "../Casualty-list/casualty-card.html";
      return;
    }
  
    const mergedData = JSON.parse(localStorage.getItem("mergedData")) || [];
    const victimData = mergedData.find(
      (victim) => victim.victimNumber === `Victim #L${victimID.padStart(4, "0")}`
    );
  
    if (!victimData) {
      alert("Victim not found. Redirecting...");
      window.location.href = "../Casualty-list/casualty-card.html";
      return;
    }
  
    // בדוק אם האלמנטים קיימים לפני קביעת ערכים
    const pulseElement = document.getElementById("pulse");
    if (pulseElement) {
      pulseElement.value = victimData.vitalsHistory.pulse.at(-1) || "normal";
    } else {
      console.error("Element with ID 'pulse' not found.");
    }
  
    const breathingElement = document.getElementById("breathing");
    if (breathingElement) {
      breathingElement.value =
        victimData.vitalsHistory.breathing.at(-1) || "normal";
    } else {
      console.error("Element with ID 'breathing' not found.");
    }
  
    const bloodPressureElement = document.getElementById("blood-pressure");
    if (bloodPressureElement) {
      bloodPressureElement.value =
        victimData.vitalsHistory.bloodPressure.at(-1) || "normal";
    } else {
      console.error("Element with ID 'blood-pressure' not found.");
    }
  
    const consciousnessElement = document.getElementById("consciousness-level");
    if (consciousnessElement) {
      consciousnessElement.value =
        victimData.vitalsHistory.consciousnessLevel.at(-1) || "alert";
    } else {
      console.error("Element with ID 'consciousness-level' not found.");
    }
  
    // Create chart only if victim data exists
    if (victimData) {
      // Map values to numbers for the graph
      const valueMapping = {
        "very low": 1,
        low: 2,
        normal: 3,
        high: 4,
        "very-high": 5,
        alert: 4,
        "Responds to voice": 3,
        "Responds to pain": 2,
        unresponsive: 1,
      };
  
      const mapValues = (history) =>
        history.map((val) => valueMapping[val] || 0);
  
      const pulseHistory = mapValues(victimData.vitalsHistory.pulse);
      const breathingHistory = mapValues(victimData.vitalsHistory.breathing);
      const bloodPressureHistory = mapValues(
        victimData.vitalsHistory.bloodPressure
      );
      const consciousnessHistory = mapValues(
        victimData.vitalsHistory.consciousnessLevel
      );
  
      const timestamps = Array.from(
        { length: pulseHistory.length },
        (_, i) => `T${i + 1}`
      );
  
      // Create the graph
      const ctx = document.getElementById("vitalsChart")?.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: timestamps,
            datasets: [
              {
                label: "Pulse",
                data: pulseHistory,
                borderColor: "red",
                tension: 0.1,
              },
              {
                label: "Breathing",
                data: breathingHistory,
                borderColor: "blue",
                tension: 0.1,
              },
              {
                label: "Blood Pressure",
                data: bloodPressureHistory,
                borderColor: "green",
                tension: 0.1,
              },
              {
                label: "Consciousness",
                data: consciousnessHistory,
                borderColor: "purple",
                tension: 0.1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
            scales: {
              y: {
                ticks: {
                  callback: function (value) {
                    const reverseMapping = {
                      1: "Very Low",
                      2: "Low",
                      3: "Normal",
                      4: "High",
                      5: "Very High",
                    };
                    return reverseMapping[value] || value;
                  },
                },
                beginAtZero: true,
              },
            },
          },
        });
      } else {
        console.error("Canvas context not found for chart.");
      }
    }
  });
  