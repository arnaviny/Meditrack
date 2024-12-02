const victimData = {
    name: "Jane Doe",
    id: "1234567890123",
    injuries: "Right Leg, Chest",
    vitals: "Pulse: Weak",
    timeElapsed: { min: "05", sec: "30" },
    evacuationStatus: "Pending Evacuation",
  };
  
  // עדכון הנתונים בקלף
  document.getElementById("victim-name").textContent = victimData.name;
  document.getElementById("victim-id").textContent = victimData.id;
  document.getElementById("victim-injuries").textContent = victimData.injuries;
  document.getElementById("victim-vitals").textContent = victimData.vitals;
  
  document.getElementById("time-min").textContent = `${victimData.timeElapsed.min} min`;
  document.getElementById("time-sec").textContent = `${victimData.timeElapsed.sec} sec`;
  
  const statusButton = document.getElementById("evacuation-status");
  statusButton.textContent = victimData.evacuationStatus;
  statusButton.style.backgroundColor =
    victimData.evacuationStatus === "✔ Evacuated" ? "#57e772" : "#ff6666";
  