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
      Status: "Stable",
    },
    {
        victimNumber: "Victim #L0002",
        name: "Jane Doe",
        id: "1234567890123",
        injuries: "Right Leg, Chest",
        vitals: "Pulse: Weak",
        timeElapsed: { min: "02", sec: "59" },
        evacuationStatus: "Urgent",
        Status: "Urgent",
    },
    {
      victimNumber: "Victim #L0003",
      name: "Jane Doe",
      id: "1234567890123",
      injuries: "Right Leg, Chest",
      vitals: "Pulse: Weak",
      timeElapsed: { min: "02", sec: "59" },
      evacuationStatus: "Waiting for evacuation",
      statusColor: "#ff6666", // אדום
      Status: "Critical",
    },
    {
      victimNumber: "Victim #L0004",
      name: "Michael Brown",
      id: "9876543210123",
      injuries: "No Injuries",
      vitals: "Pulse: Normal",
      timeElapsed: { min: "00", sec: "00" },
      evacuationStatus: "No Evacuation Priority",
      statusColor: "#000000", // שחור
      Status: "Deceased",
    },{
        victimNumber: "Victim #L0001",
        name: "John Smith",
        id: "3740211234016",
        injuries: "Head, Left Arm, Chest",
        vitals: "Pulse: Stable",
        timeElapsed: { min: "00", sec: "00" },
        evacuationStatus: "✔ Evacuated",
        statusColor: "#57e772", // ירוק
        Status: "Stable",
      },
  ];

  // פונקציה לסינון כרטיסים לפי קטגוריה
function filterVictimCards(filter) {
    const allCards = document.querySelectorAll(".victim-card");
    allCards.forEach((card) => {
        if (filter === "all") {
            card.style.display = "flex"; // מציג את כל הכרטיסים
        } else if (card.classList.contains(filter)) {
            card.style.display = "flex"; // מציג את הכרטיסים שתואמים לפילטר
        } else {
            card.style.display = "none"; // מסתיר כרטיסים אחרים
        }
    });
}

// מאזין לכפתורי הניווט העליון
document.querySelectorAll(".topNav button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const filter = event.target.getAttribute("data-filter");
        filterVictimCards(filter); // מסנן לפי הבחירה
    });
});

  
function createVictimCard(victim) {
    const card = document.createElement("div");
    card.classList.add("victim-card"); // מחלקה בסיסית
    
    // הוספת מחלקה לפי הסטטוס
    if (victim.Status === "Deceased") {
        card.classList.add("deceased");
    } else if (victim.Status === "Critical") {
        card.classList.add("critical");
    } else if (victim.Status === "Urgent") {
        card.classList.add("urgent");
    } else if (victim.Status === "Stable") {
        card.classList.add("stable");
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
                    <div class="value" id="victim-name" >${victim.name}</div>
                </div>
                <div class="id-section">
                    <div class="label">ID</div>
                    <div class="value" id="victim-id" class="text-content">${victim.id}</div>
                </div>
            </div>
            <div class="injuriesandvitals">
                <div class="injuries-section">
                    <div class="label">Injuries</div>
                    <div class="value" id="victim-injuries" class="text-content">${victim.injuries}</div>
                </div>
                <div class="vitals-section">
                    <div class="label">Vitals</div>
                    <div class="value" id="victim-vitals" class="text-content">${victim.vitals}</div>
                </div>
            </div>
            <div class="section time-container">
                <div class="ambulance-icon"><img src="../../../asets/svg's/ambulance-svgrepo-com.svg" alt="" class="ambulanceSVG"></div>
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
  