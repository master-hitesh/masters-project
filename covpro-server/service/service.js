const MultiplierService = require("./multiplier-calculation");

var SERVICE = {
  getPatientScore: function (patientData) {
    try {
      const patientScore = SERVICE.getScore(patientData);
      console.log(
        'Updated record for PatientId-"%s" successfully! \n',
        patientData._id
      );
      return patientScore;
    } catch (err) {
      console.error(
        'ERROR: Something went wrong during updating Patient with id-"%s"',
        patientData._id,
        err
      );
      console.log("\n");
      return null;
    }
  },

  getScore: function (patientData) {
    let multiplier = {};

    // Calculating multiplier based on data
    multiplier.ageMultiplier = MultiplierService.getAgeMultiplier(patientData);
    multiplier.genderMultiplier =
      MultiplierService.getGenderMultiplier(patientData);
    multiplier.temperatureMultiplier =
      MultiplierService.getTempMultiplier(patientData);
    multiplier.heartRateMultiplier =
      MultiplierService.getHeartRateMultiplier(patientData);
    multiplier.symptomMultiplier =
      MultiplierService.getSymptomMultiplier(patientData);
    multiplier.comorbidityMultiplier =
      MultiplierService.getComorbidityMultiplier(patientData);
    multiplier.oxygenMultiplier =
      MultiplierService.getOxygenLevelMultiplier(patientData);

    // Calculating total score
    const score =
      multiplier.ageMultiplier +
      multiplier.genderMultiplier +
      multiplier.temperatureMultiplier +
      multiplier.heartRateMultiplier +
      multiplier.symptomMultiplier +
      multiplier.comorbidityMultiplier +
      multiplier.oxygenMultiplier;
    return score;
  },
};

module.exports = SERVICE;
