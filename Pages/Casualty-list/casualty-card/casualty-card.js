// Function to retrieve data from localStorage
function getVictimDataFromLocalStorage() {
    const data = localStorage.getItem("mergedData");
    return data ? JSON.parse(data) : [];
  }
  
  // Function to create a card for a single victim
  function createVictimCard(victim) {
    const card = document.createElement("div");
    card.classList.add("victim-card"); // Base class for the card
  
    // Add class based on status
    if (victim.Status === "Deceased") {
      card.classList.add("deceased");
    } else if (victim.Status === "Critical") {
      card.classList.add("critical");
    } else if (victim.Status === "Urgent") {
      card.classList.add("urgent");
    } else if (victim.Status === "Stable") {
      card.classList.add("stable");
    }
  
    // Populate the card content
    card.innerHTML = `
          <div id="card-header">
              <div class="header" id="victim-number">${victim.victimNumber}</div>
              <div class="last-updated" id="last-updated">Updated just now</div>
          </div>
          <div class="Identificationanddetails">
              <div class="nameandid">
                  <div class="name-section">
                      <div class="label">Name</div>
                      <div class="value" id="victim-name">${victim.identification.name}</div>
                  </div>
                  <div class="id-section">
                      <div class="label">ID</div>
                      <div class="value" id="victim-id">${victim.identification.id}</div>
                  </div>
              </div>
              <div class="injuriesandvitals">
                  <div class="injuries-section">
                      <div class="label">Injuries</div>
                      <div class="value" id="victim-injuries">${victim.injuryDetails.map(injury => injury.location).join(", ")}</div>
                  </div>
                  <div class="vitals-section">
                      <div class="label">Vitals</div>
                      <div class="value" id="victim-vitals">${victim.vitalsHistory.pulse.join(", ")}</div>
                  </div>
              </div>
              <div class="section time-container">
                  <div class="ambulance-icon"><img src="../../../asets/svg's/ambulance-svgrepo-com.svg" alt="" class="ambulanceSVG"></div>
                  <div class="time" id="time-min">${victim.timeElapsed?.min || "00"} <small>min</small></div>
                  <div class="time" id="time-sec">${victim.timeElapsed?.sec || "00"} <small>sec</small></div>
              </div>
          </div>
          <div class="section">
              <button class="status-button">${victim.evacuationStatus || "Pending"}</button>
          </div>
          <div class="footer">
              <button class="more-button">▼</button>
          </div>
      `;
  
    return card;
  }
  
  // Function to render victim cards
  function renderVictimCards() {
    const container = document.getElementById("victim-cards-container");
    container.innerHTML = ""; // Clear existing cards
    const victims = getVictimDataFromLocalStorage();
    victims.forEach((victim) => {
      const card = createVictimCard(victim);
      container.appendChild(card);
    });
  }
  
  // Event listener for DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    renderVictimCards(); // Render cards on page load
  });
  