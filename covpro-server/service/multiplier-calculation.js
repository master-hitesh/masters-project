module.exports = {
  getAgeMultiplier: function (data) {
    let multiplier = 0;

    multiplier =
      data.age <= 5
        ? 1.5
        : data.age > 5 && data.age <= 18
        ? 1.25
        : data.age > 18 && data.age <= 40
        ? 1
        : data.age > 40 && data.age <= 50
        ? 1.25
        : data.age > 50 && data.age <= 60
        ? 1.5
        : data.age > 60 && data.age <= 70
        ? 2
        : data.age > 70 && data.age <= 80
        ? 3
        : 4; // For Age > 80

    multiplier = multiplier * 4;
    return multiplier;
  },

  getGenderMultiplier: function (data) {
    let multiplier = 0;

    switch (data.gender) {
      case "Male":
        multiplier = 1.5;
        break;
      case "Female":
        multiplier = 1;
        break;
      default:
        multiplier = 0;
        break;
    }

    multiplier = multiplier * 2;
    return multiplier;
  },

  getTempMultiplier: function (data) {
    let multiplier = 0;

    multiplier =
      data.healthData.temp <= 100
        ? 1
        : data.healthData.temp > 100 && data.healthData.temp <= 102
        ? 1.5
        : 2; // For Temp > 102

    multiplier = multiplier * 3;
    return multiplier;
  },

  getHeartRateMultiplier: function (data) {
    let multiplier = 0;

    multiplier =
      data.healthData.heartRate <= 100
        ? 1
        : data.healthData.heartRate > 100 && data.healthData.heartRate <= 120
        ? 1.5
        : 2; // For heartRate > 120

    multiplier = multiplier * 3;
    return multiplier;
  },

  getSymptomMultiplier: function (data) {
    let multiplier = 0;
    let value = data.healthData.symptom
      ? data.healthData.symptom.trim().toLowerCase()
      : "";
    switch (value) {
      case "runny nose":
        multiplier = 1;
        break;
      case "dry cough":
        multiplier = 1;
        break;
      case "sore throat":
        multiplier = 1;
        break;
      case "body ache":
        multiplier = 1;
        break;
      case "loss of taste":
        multiplier = 1;
        break;
      case "excessive fatigue":
        multiplier = 2;
        break;
      case "diarrhea":
        multiplier = 2;
        break;
      case "mental confusion":
        multiplier = 3;
        break;
      case "breathlessness":
        multiplier = 3;
        break;
      case "severe chest pain":
        multiplier = 4;
        break;
      case "bluish discoloration":
        multiplier = 4;
        break;
      case "none":
      default:
        multiplier = 0;
        break;
    }
    multiplier = multiplier * 6;
    return multiplier;
  },

  getComorbidityMultiplier: function (data) {
    let multiplier = 0;
    let value = data.healthData.comorbidity
      ? data.healthData.comorbidity.trim().toLowerCase()
      : "";
    switch (value) {
      case "hypertension":
        multiplier = 3;
        break;
      case "diabetes":
        multiplier = 3;
        break;
      case "pulmonary disease":
        multiplier = 2;
        break;
      case "cardiovascular disease":
        multiplier = 1;
        break;
      case "none":
      default:
        multiplier = 0;
        break;
    }
    multiplier = multiplier * 5;
    return multiplier;
  },

  getOxygenLevelMultiplier: function (data) {
    let multiplier = 0;

    multiplier =
      data.healthData.oxygen < 93
        ? 3
        : data.healthData.oxygen >= 93 && data.healthData.oxygen < 95
        ? 2
        : 1; // For oxygen >= 95

    multiplier = multiplier * 10;
    return multiplier;
  },
};
