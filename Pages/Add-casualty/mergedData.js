function mergeVictimData() {
  const currentVictimID = localStorage.getItem("currentVictimID");

  if (!currentVictimID) {
    console.error("No currentVictimID found in localStorage.");
    return;
  }

  const existingMergedData = JSON.parse(localStorage.getItem("mergedData")) || [];
  const formDataArray = JSON.parse(localStorage.getItem("form-data")) || [];
  const victimInjuries = JSON.parse(localStorage.getItem("injuriesData")) || {};
  const medicineHistory = JSON.parse(localStorage.getItem("medicineHistory")) || [];

  // Filter form-data for the current victim
  const currentFormData = formDataArray.filter(
    (data) => data.victimID === currentVictimID
  );

  // Filter injuries and medicine history for the current victim
  const currentVictimInjuries = victimInjuries[currentVictimID] || {};
  const currentMedicineHistory = medicineHistory.filter(
    (med) => med.victimID === currentVictimID
  );

  let existingVictim = existingMergedData.find(
    (entry) => entry.victimNumber === `Victim #L${currentVictimID.toString().padStart(4, "0")}`
  );

  if (existingVictim) {
    // Update existing victim
    existingVictim.vitalsHistory.pulse.push(currentFormData[0]?.pulse || "Unknown");
    existingVictim.vitalsHistory.breathing.push(currentFormData[0]?.breathing || "Unknown");
    existingVictim.vitalsHistory.bloodPressure.push(currentFormData[0]?.["blood-pressure"] || "Unknown");
    existingVictim.vitalsHistory.consciousnessLevel.push(currentFormData[0]?.["consciousness-level"] || "Unknown");

    existingVictim.shockSignsHistory.push(...(currentFormData[0]?.shockSigns || []));
    existingVictim.injuryDetails.push(
      ...Object.entries(currentVictimInjuries || {}).flatMap(([location, mechanisms]) =>
        mechanisms.map((mechanism) => ({
          location,
          mechanism,
          time: new Date().toISOString(),
        }))
      )
    );

    existingVictim.blsTreatments.push(...(currentFormData[0]?.blsTreatments || []));
    existingVictim.alsTreatments.push(...(currentFormData[0]?.alsTreatments || []));
    existingVictim.medicationHistory.push(
      ...currentMedicineHistory.map((med) => ({
        medicineName: med.medicineName,
        dosage: med.dosage,
        unit: med.unit,
        timestamp: med.timestamp,
      }))
    );

    existingVictim.statusHistory.push(...(currentFormData[0]?.statusHistory || []));
  } else {
    // Create a new victim entry
    const newVictimEntry = {
      victimNumber: `Victim #L${currentVictimID.toString().padStart(4, "0")}`,
      identification: {
        name: currentFormData[0]?.name || "Unknown",
        id: currentFormData[0]?.id || "Unknown",
      },
      vitalsHistory: {
        pulse: [currentFormData[0]?.pulse || "Unknown"],
        breathing: [currentFormData[0]?.breathing || "Unknown"],
        bloodPressure: [currentFormData[0]?.["blood-pressure"] || "Unknown"],
        consciousnessLevel: [currentFormData[0]?.["consciousness-level"] || "Unknown"],
      },
      shockSignsHistory: currentFormData[0]?.shockSigns || [],
      injuryDetails: Object.entries(currentVictimInjuries || {}).flatMap(([location, mechanisms]) =>
        mechanisms.map((mechanism) => ({
          location,
          mechanism,
          time: new Date().toISOString(),
        }))
      ),
      blsTreatments: currentFormData[0]?.blsTreatments || [],
      alsTreatments: currentFormData[0]?.alsTreatments || [],
      medicationHistory: currentMedicineHistory.map((med) => ({
        medicineName: med.medicineName,
        dosage: med.dosage,
        unit: med.unit,
        timestamp: med.timestamp,
      })),
      statusHistory: currentFormData[0]?.statusHistory || [],
    };

    existingMergedData.push(newVictimEntry);
  }

  console.log("Updated Merged Data:", JSON.stringify(existingMergedData, null, 2));
  localStorage.setItem("mergedData", JSON.stringify(existingMergedData));
}
