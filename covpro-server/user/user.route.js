const express = require("express");

var router = express.Router();

const userController = require("./user.controller");

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
router.post("/askQuestion", function (req, res, next) {
  userController.askQuestion(req, res, next);
});
module.exports = router;
