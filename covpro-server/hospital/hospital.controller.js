const hospital = require("./hospital.model");

module.exports = {
  updateBedCount: (request, response, next) => {
    hospital.updateBedCount(request.body.id, function (err, data) {
      response.send(data);
    });
  },

  getAllHospitals: (request, response, next) => {
    hospital.getAllHospitals(function (err, data) {
      response.send(data);
    });
  },
};
