const user = require("./user.model");

module.exports = {
  addUser: (request, response) => {
    var payloadData = {
      name: request.body.name,
      gender: request.body.gender,
      age: request.body.age,
      mobileno: request.body.mobileno,
      location: request.body.location,
      specimenId: request.body.specimenId,
    };
    user.createDocument(payloadData, function (err, data) {
      response.send(data);
    });
  },

  signin: (request, response, next) => {
    if (request.body.id != null && request.body.password != null) {
      var payloadData = {
        id: request.body.id,
        password: request.body.password,
      };
      user.authentication(payloadData, function (err, data) {
        response.send(data);
      });
    }
  },

  getUserData: (request, response, next) => {
    var payloadData = {
      id: request.body.id,
    };
    user.getUserData(payloadData, function (err, data) {
      response.send(data);
    });
  },

  addSymptom: (request, response, next) => {
    var payloadData = {
      temp: request.body.temp,
      heartRate: request.body.heartRate,
      symptom: request.body.symptom,
      comorbidity: request.body.comorbidity,
      oxygen: request.body.oxygen,
    };
    user.addSymptom(request.body.id, payloadData, function (err, data) {
      response.send(data);
    });
  },

  addComment: (request, response, next) => {
    var payloadData = {
      comment: request.body.comment,
      timestamp: Date.now(),
    };
    user.addComment(request.body.id, payloadData, function (err, data) {
      response.send(data);
    });
  },

  getUsersByRisk: (request, response, next) => {
    user.getUsersByRisk(request.params.riskId, function (err, data) {
      response.send(data);
    });
  },

  verifyUser: (request, response, next) => {
    user.verifyUser(request.body.id, function (err, data) {
      response.send(data);
    });
  },

  assignHospital: (request, response, next) => {
    user.assignHospital(request, function (err, data) {
      response.send(data);
    });
  },
};
