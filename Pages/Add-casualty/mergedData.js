function mergeVictimData(victimID, formDataArray, victimInjuries, medicineHistory) {
  if (!victimID) {
    console.error("victimID is undefined or null. Ensure it is set correctly.");
    return;
  }

  const existingMergedData = JSON.parse(localStorage.getItem("mergedData")) || [];

  let existingVictim = existingMergedData.find(
    (entry) => entry.victimNumber === `Victim #L${victimID.toString().padStart(4, "0")}`
  );

  if (existingVictim) {
    existingVictim.vitalsHistory.pulse.push(formDataArray[0].pulse || "Unknown");
    existingVictim.vitalsHistory.breathing.push(formDataArray[0].breathing || "Unknown");
    existingVictim.vitalsHistory.bloodPressure.push(formDataArray[0]["blood-pressure"] || "Unknown");
    existingVictim.vitalsHistory.consciousnessLevel.push(formDataArray[0]["consciousness-level"] || "Unknown");

    existingVictim.shockSignsHistory.push(...(formDataArray[0].shockSigns || []));
    existingVictim.injuryDetails.push(
      ...Object.entries(victimInjuries || {}).flatMap(([location, mechanisms]) =>
        mechanisms.map((mechanism) => ({
          location,
          mechanism,
          time: new Date().toISOString(),
        }))
      )
    );

    existingVictim.blsTreatments.push(...(formDataArray[0].blsTreatments || []));
    existingVictim.alsTreatments.push(...(formDataArray[0].alsTreatments || []));
    existingVictim.medicationHistory.push(
      ...medicineHistory.map((med) => ({
        medicineName: med.medicineName,
        dosage: med.dosage,
        unit: med.unit,
        timestamp: med.timestamp,
      }))
    );

    existingVictim.statusHistory.push(...(formDataArray[0].statusHistory || []));
  } else {
    const newVictimEntry = {
      victimNumber: `Victim #L${victimID.toString().padStart(4, "0")}`,
      identification: {
        name: formDataArray[0].name || "Unknown",
        id: formDataArray[0].id || "Unknown",
      },
      vitalsHistory: {
        pulse: [formDataArray[0].pulse || "Unknown"],
        breathing: [formDataArray[0].breathing || "Unknown"],
        bloodPressure: [formDataArray[0]["blood-pressure"] || "Unknown"],
        consciousnessLevel: [formDataArray[0]["consciousness-level"] || "Unknown"],
      },
      shockSignsHistory: formDataArray[0].shockSigns || [],
      injuryDetails: Object.entries(victimInjuries || {}).flatMap(([location, mechanisms]) =>
        mechanisms.map((mechanism) => ({
          location,
          mechanism,
          time: new Date().toISOString(),
        }))
      ),
      blsTreatments: formDataArray[0].blsTreatments || [],
      alsTreatments: formDataArray[0].alsTreatments || [],
      medicationHistory: medicineHistory.map((med) => ({
        medicineName: med.medicineName,
        dosage: med.dosage,
        unit: med.unit,
        timestamp: med.timestamp,
      })),
      statusHistory: formDataArray[0].statusHistory || [],
    };

    existingMergedData.push(newVictimEntry);
  }

  console.log("Updated Merged Data:", JSON.stringify(existingMergedData, null, 2));
  localStorage.setItem("mergedData", JSON.stringify(existingMergedData));
}
