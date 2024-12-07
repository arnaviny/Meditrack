function mergeVictimData() {
  const formData = JSON.parse(localStorage.getItem("form-data")) || [];
  const victimData = JSON.parse(localStorage.getItem("victimData")) || {};
  let mergedData = JSON.parse(localStorage.getItem("mergedData")) || [];

  formData.forEach((entry) => {
      const victimID = entry.victimID;

      // מצא את הפצוע ב-mergedData אם הוא כבר קיים
      let existingVictim = mergedData.find(
          (victim) => victim.victimNumber === `Victim #L${victimID.toString().padStart(4, "0")}`
      );

      if (!existingVictim) {
          // אם הפצוע לא קיים, צור רשומה חדשה
          existingVictim = {
              victimNumber: `Victim #L${victimID.toString().padStart(4, "0")}`,
              identification: {
                  name: entry.name || "Unknown",
                  id: entry.id || "Unknown",
              },
              vitalsHistory: {
                  pulse: [],
                  breathing: [],
                  bloodPressure: [],
                  consciousnessLevel: [],
              },
              shockSignsHistory: [],
              injuryDetails: [],
              blsTreatments: [],
              alsTreatments: [],
              medicationHistory: [],
              statusHistory: [],
          };
          mergedData.push(existingVictim);
      }

      // עדכון מידע קיים
      if (entry.pulse) existingVictim.vitalsHistory.pulse.push(entry.pulse);
      if (entry.breathing) existingVictim.vitalsHistory.breathing.push(entry.breathing);
      if (entry["blood-pressure"])
          existingVictim.vitalsHistory.bloodPressure.push(entry["blood-pressure"]);
      if (entry["consciousness-level"])
          existingVictim.vitalsHistory.consciousnessLevel.push(entry["consciousness-level"]);

      if (entry.shockSigns && entry.shockSigns.length > 0) {
          existingVictim.shockSignsHistory = [
              ...new Set([...existingVictim.shockSignsHistory, ...entry.shockSigns]),
          ];
      }

      if (entry.blsTreatments && entry.blsTreatments.length > 0) {
          existingVictim.blsTreatments = [
              ...new Set([...existingVictim.blsTreatments, ...entry.blsTreatments]),
          ];
      }

      if (entry.alsTreatments && entry.alsTreatments.length > 0) {
          existingVictim.alsTreatments = [
              ...new Set([...existingVictim.alsTreatments, ...entry.alsTreatments]),
          ];
      }

      // עדכון פציעות
      if (victimData[victimID]?.injuriesData) {
          const injuryDetails = victimData[victimID].injuriesData;
          for (const [location, mechanisms] of Object.entries(injuryDetails)) {
              mechanisms.forEach((mechanism) => {
                  const isDuplicate = existingVictim.injuryDetails.some(
                      (existingInjury) =>
                          existingInjury.location === location &&
                          existingInjury.mechanism === mechanism
                  );
                  if (!isDuplicate) {
                      existingVictim.injuryDetails.push({
                          location,
                          mechanism,
                          time: new Date().toISOString(),
                      });
                  }
              });
          }
      }

      // עדכון היסטוריית תרופות
      if (victimData[victimID]?.medicineHistory) {
          const newMedications = victimData[victimID].medicineHistory;
          newMedications.forEach((newMed) => {
              const isDuplicate = existingVictim.medicationHistory.some(
                  (existingMed) =>
                      existingMed.medicineName === newMed.medicineName &&
                      existingMed.dosage === newMed.dosage &&
                      existingMed.unit === newMed.unit &&
                      existingMed.timestamp === newMed.timestamp
              );
              if (!isDuplicate) {
                  existingVictim.medicationHistory.push(newMed);
              }
          });
      }
  });

  // שמור ל-localStorage
  console.log("Updated Merged Data:", JSON.stringify(mergedData, null, 2));
  localStorage.setItem("mergedData", JSON.stringify(mergedData));
}
