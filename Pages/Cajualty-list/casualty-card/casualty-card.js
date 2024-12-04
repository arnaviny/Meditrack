const victims = [
    {
      victimNumber: "Victim #L0001",
      name: "John Smith",
      id: "3740211234016",
      injuries: "Head, Left Arm, Chest",
      vitals: "Pulse: Stable",
      timeElapsed: { min: "00", sec: "00" },
      evacuationStatus: "✔ Evacuated",
      statusColor: "#57e772", // ירוק
    },
    {
      victimNumber: "Victim #L0002",
      name: "Jane Doe",
      id: "1234567890123",
      injuries: "Right Leg, Chest",
      vitals: "Pulse: Weak",
      timeElapsed: { min: "02", sec: "59" },
      evacuationStatus: "Waiting for evacuation",
      statusColor: "#ff6666", // אדום
    },
    {
      victimNumber: "Victim #L0003",
      name: "Michael Brown",
      id: "9876543210123",
      injuries: "No Injuries",
      vitals: "Pulse: Normal",
      timeElapsed: { min: "00", sec: "00" },
      evacuationStatus: "No Evacuation Priority",
      statusColor: "#000000", // שחור
    },
  ];
  

// פונקציה ליצירת קלף HTML דינמי
function createVictimCard(victim) {
    const card = document.createElement("div");
    card.classList.add("victim-card");
  
    // הוספת מחלקה מותאמת לפי סטטוס הפינוי
    if (victim.evacuationStatus === "✔ Evacuated") {
      card.classList.add("evacuated");
    } else if (victim.evacuationStatus === "Waiting for evacuation") {
      card.classList.add("waiting");
    } else {
      card.classList.add("no-priority");
    }
  
    card.innerHTML = `
      <div id="card-header">
          <div class="header" id="victim-number">${victim.victimNumber}</div>
          <div class="last-updated" id="last-updated">Updated just now</div>
      </div>
      <div class="Identificationanddetails">
          <div class="nameandid">
              <div class="name-section">
                  <div class="label">Name</div>
                  <div class="value" id="victim-name">${victim.name}</div>
              </div>
              <div class="id-section">
                  <div class="label">ID</div>
                  <div class="value" id="victim-id">${victim.id}</div>
              </div>
          </div>
          <div class="injuriesandvitals">
              <div class="injuries-section">
                  <div class="label">Injuries</div>
                  <div class="value" id="victim-injuries">${victim.injuries}</div>
              </div>
              <div class="vitals-section">
                  <div class="label">Vitals</div>
                  <div class="value" id="victim-vitals">${victim.vitals}</div>
              </div>  
          </div> 
          <div class="section time-container">
              <div class="ambulance-icon">🚑</div>
              <div class="time" id="time-min">${victim.timeElapsed.min} <small>min</small></div>
              <div class="time" id="time-sec">${victim.timeElapsed.sec} <small>sec</small></div>
          </div>
      </div>
      <div class="section">
          <button class="status-button">${victim.evacuationStatus}</button>
      </div>
      <div class="footer">
          <button class="more-button">▼</button>
      </div>
    `;
  
    return card;
  }
  
  // פונקציה להוספת הקלפים למכולה בדף
function renderVictimCards() {
    const container = document.getElementById("victim-cards-container"); // מזהה את המכולה
    victims.forEach((victim) => {
      const card = createVictimCard(victim); // יוצר קלף
      container.appendChild(card); // מוסיף את הקלף למכולה
    });
  }
  
  // קריאה לפונקציה
  renderVictimCards();
  