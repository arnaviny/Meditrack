function displayVictimDetails(victimsArray) {
    victimsArray.forEach((victim, index) => {
      console.log(`=======================`);
      console.log(`Victim #${index + 1}: ${victim.fd.name}`);
      console.log(`=======================`);
  
      // Medical Details (MD)
      console.log("Medical Details (MD):");
      console.log(`  ID: ${victim.md.id}`);
      console.log(`  Dosage: ${Array.isArray(victim.md.dosage) ? victim.md.dosage.join(", ") : victim.md.dosage}`);
      console.log(`  Medication Name: ${Array.isArray(victim.md.medicationName) ? victim.md.medicationName.join(", ") : victim.md.medicationName}`);
      console.log(`  Timestamp: ${victim.md.timestamp}`);
      console.log(`  Unit: ${victim.md.unit}`);
      console.log();
  
      // First Response Details (FD)
      console.log("First Response Details (FD):");
      console.log(`  ID: ${victim.fd.id}`);
      console.log(`  ALS Treatment: ${Array.isArray(victim.fd.alsTreatment) ? victim.fd.alsTreatment.join(", ") : victim.fd.alsTreatment}`);
      console.log(`  Blood Pressure: ${victim.fd.bloodPressure}`);
      console.log(`  BLS Treatment: ${Array.isArray(victim.fd.blsTreatment) ? victim.fd.blsTreatment.join(", ") : victim.fd.blsTreatment}`);
      console.log(`  Breathing: ${victim.fd.breathing}`);
      console.log(`  Consciousness Level: ${victim.fd.consciousnessLevel}`);
      console.log(`  Pulse: ${victim.fd.pulse}`);
      console.log(`  Shock Signs: ${Array.isArray(victim.fd.shockSign) ? victim.fd.shockSign.join(", ") : victim.fd.shockSign}`);
      console.log();
  
      // Body Details (BD)
      console.log("Body Details (BD):");
      for (const [key, value] of Object.entries(victim.bd)) {
        console.log(`  ${key}: ${Array.isArray(value) ? value.join(", ") : value}`);
      }
      console.log();
    });
  }
  
  // קריאה לפונקציה
  displayVictimDetails(victims);
  


// נתוני ה-Victims
const victims = [
    {
      victimNumber: "Victim #1",
      md: {
        id: "12345",
        dosage: "50mg",
        medicationName: "Aspirin",
        timestamp: "2024-12-04T08:00:00Z",
        unit: "mg"
      },
      fd: {
        id: "54321",
        alsTreatment: "Intubation",
        bloodPressure: "Normal",
        blsTreatment: "Bandage",
        breathing: "Normal",
        consciousnessLevel: "Alert",
        name: "John Doe",
        pulse: "Normal",
        shockSign: "Sweating"
      },
      bd: {
        leftShoulder: "Burn",
        rightShoulder: "Blunt Trauma",
        leftArm: "Fracture",
        rightArm: "Bleeding",
        chest: "Bruising",
        stomach: "Contusion",
        leftLeg: "Fracture",
        rightLeg: "Bleeding",
        leftHand: "Laceration",
        rightHand: "Swelling",
        leftFoot: "Sprain",
        rightFoot: "Injury"
      }
    },
    {
      victimNumber: "Victim #2",
      md: {
        id: "67890",
        dosage: "25mg",
        medicationName: "Paracetamol",
        timestamp: "2024-12-04T09:00:00Z",
        unit: "mg"
      },
      fd: {
        id: "09876",
        alsTreatment: "Ventilation",
        bloodPressure: "Low",
        blsTreatment: "Splint",
        breathing: "Shallow",
        consciousnessLevel: "Drowsy",
        name: "Jane Smith",
        pulse: "Rapid",
        shockSign: "Paleness"
      },
      bd: {
        leftShoulder: "Dislocation",
        rightShoulder: "Fracture",
        leftArm: "Burn",
        rightArm: "Bleeding",
        chest: "Contusion",
        stomach: "Internal Bleeding",
        leftLeg: "Fracture",
        rightLeg: "Sprain",
        leftHand: "Laceration",
        rightHand: "Crushing Injury",
        leftFoot: "Swelling",
        rightFoot: "Sprain"
      }
    },
    {
      victimNumber: "Victim #3",
      md: {
        id: "11223",
        dosage: "10mg",
        medicationName: "Ibuprofen",
        timestamp: "2024-12-04T10:00:00Z",
        unit: "mg"
      },
      fd: {
        id: "33445",
        alsTreatment: "Injection",
        bloodPressure: "High",
        blsTreatment: "Tourniquet",
        breathing: "Normal",
        consciousnessLevel: "Fully Conscious",
        name: "Samuel Green",
        pulse: "Slow",
        shockSign: "None"
      },
      bd: {
        leftShoulder: "Bruising",
        rightShoulder: "None",
        leftArm: "Sprain",
        rightArm: "Contusion",
        chest: "Fracture",
        stomach: "None",
        leftLeg: "Sprain",
        rightLeg: "Fracture",
        leftHand: "None",
        rightHand: "Crushing Injury",
        leftFoot: "Burn",
        rightFoot: "Fracture"
      }
    }
  ];
  
  // שמירת אובייקטים נפרדים לפי קטגוריה ב-localStorage
  const mdData = victims.map((victim) => victim.md);
  const fdData = victims.map((victim) => victim.fd);
  const bdData = victims.map((victim) => victim.bd);
  
  localStorage.setItem("mdData", JSON.stringify(mdData));
  localStorage.setItem("fdData", JSON.stringify(fdData));
  localStorage.setItem("bdData", JSON.stringify(bdData));
  
  console.log("הנתונים נשמרו ב-localStorage בתצורה נפרדת:");
  console.log("mdData:", mdData);
  console.log("fdData:", fdData);
  console.log("bdData:", bdData);
  