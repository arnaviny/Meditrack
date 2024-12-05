// יצירת המידע עבור 4 פצועים
const victims = [
    {
      victimNumber: "Victim #1",
      md: {
        id: "MD001",
        dosage: "50mg",
        medicationName: "Aspirin",
        timestamp: "2024-12-04T08:00:00Z",
        unit: "mg"
      },
      fd: {
        id: "FD001",
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
        id: "MD002",
        dosage: "25mg",
        medicationName: "Paracetamol",
        timestamp: "2024-12-04T09:00:00Z",
        unit: "mg"
      },
      fd: {
        id: "FD002",
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
        id: "MD003",
        dosage: "10mg",
        medicationName: "Ibuprofen",
        timestamp: "2024-12-04T10:00:00Z",
        unit: "mg"
      },
      fd: {
        id: "FD003",
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
    },
    {
      victimNumber: "Victim #4",
      md: {
        id: "MD004",
        dosage: "100mg",
        medicationName: "Morphine",
        timestamp: "2024-12-04T11:00:00Z",
        unit: "mg"
      },
      fd: {
        id: "FD004",
        alsTreatment: "CPR",
        bloodPressure: "Critical",
        blsTreatment: "First Aid",
        breathing: "None",
        consciousnessLevel: "Unconscious",
        name: "Mary White",
        pulse: "Very Low",
        shockSign: "Sweating"
      },
      bd: {
        leftShoulder: "Fracture",
        rightShoulder: "None",
        leftArm: "Crushing Injury",
        rightArm: "Burn",
        chest: "Collapsed",
        stomach: "None",
        leftLeg: "None",
        rightLeg: "Fracture",
        leftHand: "Sprain",
        rightHand: "Crushing Injury",
        leftFoot: "Burn",
        rightFoot: "Fracture"
      }
    }
  ];

  // שמירה ב-localStorage
  localStorage.setItem("victimsData", JSON.stringify(victims));

  console.log("המידע נשמר ב-localStorage!");
  console.log(victims);