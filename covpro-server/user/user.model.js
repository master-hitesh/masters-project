"use strict";

// load the Cloudant library
var Cloudant = require("@cloudant/cloudant");
const cloudant = new Cloudant({
  url: "https://11105e2f-0f79-4c18-aa76-63f012893386-bluemix.cloudantnosqldb.appdomain.cloud/",
  plugins: {
    iamauth: { iamApiKey: "GkmBfFxDfmDKHTBanD9jexvpsTqtFxfzMg4mjfcYKkWs" },
  },
});
var db = cloudant.db.use("patient-db");
const patientScoreService = require("../service/service");
const query = require("../db_query/query");

module.exports = {
  // create a document
  createDocument: function (payloadData, callback) {
    var payloadData = {
      name: payloadData.name,
      gender: payloadData.gender,
      age: payloadData.age,
      mobileno: payloadData.mobileno,
      location: payloadData.location,
      specimenId: payloadData.specimenId,
      healthData: {
        temp: "0",
        heartRate: "0",
        symptom: "None",
        comorbidity: "None",
        oxygen: "0",
      },
      chat: [],
      profileStatus: "In-process",
      timestamp: Date.now(),
      hospital: "NA",
      patientScore: "0",
    };
    db.insert(payloadData, function (err, data) {
      var response = {};
      if (data) {
        response["success"] = true;
        response["userId"] = data.id;
        response["mobileNo"] = payloadData.mobileno;
      } else {
        response["success"] = false;
      }
      callback(err, response);
    });
  },

  authentication: function (payload, callback) {
    db.find(query.getSignIn(payload.id))
      .then((result) => {
        if (
          result.docs.length > 0 &&
          payload.password === result.docs[0].specimenId
        ) {
          callback("", {
            success: true,
            userId: result.docs[0]._id,
          });
        } else {
          callback(err, { userId: payload.id, success: false });
        }
      })
      .catch((err) => {
        callback(err, { userId: payload.id, success: false });
      });
  },

  getUserData: (payload, callback) => {
    db.find(query.getUserData(payload.id))
      .then((result) => {
        if (result.docs.length > 0) {
          callback("", {
            success: "true",
            userId: result.docs[0]._id,
            name: result.docs[0].name,
            specimenId: result.docs[0].specimenId,
            healthData: result.docs[0].healthData,
            profileStatus: result.docs[0].profileStatus,
            hospital: result.docs[0].hospital,
            chat: result.docs[0].chat,
          });
        } else {
          callback(err, { userId: payload.id, success: false });
        }
      })
      .catch((err) => {
        callback(err, { userId: payload.id, success: false });
      });
  },

  addComment: function (id, payload, callback) {
    db.find(query.getUserData(id))
      .then((result) => {
        if (result.docs.length > 0 && result.docs[0].chat) {
          result.docs[0].chat.push(payload);

          db.insert(result.docs[0], function (err, data) {
            if (data) {
              callback("", {
                success: "true",
                userId: result.docs[0]._id,
                name: result.docs[0].name,
                specimenId: result.docs[0].specimenId,
                healthData: result.docs[0].healthData,
                profileStatus: result.docs[0].profileStatus,
                hospital: result.docs[0].hospital,
                chat: result.docs[0].chat,
              });
            } else {
              callback(err, { userId: payload.id, success: false });
            }
          });
        }
      })
      .catch((err) => {
        callback(err, { userId: payload.id, success: false });
      });
  },

  addSymptom: function (id, payload, callback) {
    db.find(query.getUserData(id))
      .then(async (result) => {
        if (result.docs.length > 0 && result.docs[0].healthData) {
          result.docs[0].healthData.temp = payload.temp;
          result.docs[0].healthData.heartRate = payload.heartRate;
          result.docs[0].healthData.symptom = payload.symptom;
          result.docs[0].healthData.comorbidity = payload.comorbidity;
          result.docs[0].healthData.oxygen = payload.oxygen;
          console.log("Payload--> ", payload);
          if (result.docs[0].patientScore) {
            console.log("Update patient score");
            result.docs[0].patientScore =
              await patientScoreService.getPatientScore(result.docs[0]);
          }

          db.insert(result.docs[0], function (err, data) {
            if (data) {
              callback("", {
                success: "true",
                userId: result.docs[0]._id,
                name: result.docs[0].name,
                specimenId: result.docs[0].specimenId,
                healthData: result.docs[0].healthData,
                profileStatus: result.docs[0].profileStatus,
                hospital: result.docs[0].hospital,
                chat: result.docs[0].chat,
              });
            } else {
              callback(err, { userId: payload.id, success: false });
            }
          });
        }
      })
      .catch((err) => {
        callback(err, { userId: payload.id, success: false });
      });
  },

  getUsersByRisk: function (id, callback) {
    let dbquery = null;
    if (id == 101) {
      dbquery = query.getMediumRiskUsers();
    } else if (id == 102) {
      dbquery = query.getHighRiskUsers();
    } else {
      dbquery = query.getAllUsers();
    }
    db.find(dbquery, function (err, data) {
      callback(err, data);
    });
  },

  verifyUser: function (id, callback) {
    db.find(query.getUserData(id))
      .then((result) => {
        if (result.docs.length > 0 && result.docs[0].profileStatus) {
          result.docs[0].profileStatus = "Verified";
          db.insert(result.docs[0], function (err, data) {
            if (data) {
              callback("", {
                success: "true",
                userId: result.docs[0]._id,
              });
            } else {
              callback(err, { userId: id, success: false });
            }
          });
        }
      })
      .catch((err) => {
        callback(err, { userId: id, success: false });
      });
  },

  assignHospital: function (request, callback) {
    db.find(query.getUserData(request.body.id))
      .then((result) => {
        if (result.docs.length > 0 && result.docs[0].hospital) {
          result.docs[0].hospital = request.body.hospital;
          db.insert(result.docs[0], function (err, data) {
            if (data) {
              callback("", {
                success: "true",
                userId: result.docs[0]._id,
              });
            } else {
              callback(err, { userId: id, success: false });
            }
          });
        }
      })
      .catch((err) => {
        callback(err, { userId: id, success: false });
      });
  },
};
