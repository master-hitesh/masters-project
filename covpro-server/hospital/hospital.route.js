const express = require("express");

var router = express.Router();

const hospitalController = require("./hospital.controller");

router.get("/getAllHospitals", hospitalController.getAllHospitals);

router.post("/updateBedCount", function (req, res, next) {
  hospitalController.updateBedCount(req, res, next);
});

module.exports = router;
