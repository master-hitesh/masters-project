const express = require("express");

var router = express.Router();

const userController = require("./user.controller");

router.get("/getUsersByRisk/:riskId", userController.getUsersByRisk);
router.post("/signup", function (req, res, next) {
  userController.addUser(req, res, next);
});
router.post("/signin", function (req, res, next) {
  userController.signin(req, res, next);
});
router.post("/userid", function (req, res, next) {
  userController.getUserData(req, res, next);
});
router.post("/addSymptom", function (req, res, next) {
  userController.addSymptom(req, res, next);
});
router.post("/addComment", function (req, res, next) {
  userController.addComment(req, res, next);
});

router.post("/verifyUser", function (req, res, next) {
  userController.verifyUser(req, res, next);
});
router.post("/assignHospital", function (req, res, next) {
  userController.assignHospital(req, res, next);
});

module.exports = router;
