"use strict";

// load the Cloudant library
var Cloudant = require("@cloudant/cloudant");
const cloudant = new Cloudant({
  url: "https://11105e2f-0f79-4c18-aa76-63f012893386-bluemix.cloudantnosqldb.appdomain.cloud/",
  plugins: {
    iamauth: { iamApiKey: "GkmBfFxDfmDKHTBanD9jexvpsTqtFxfzMg4mjfcYKkWs" },
  },
});
var hospital_db = cloudant.db.use("hospital-db");
const query = require("../db_query/query");

module.exports = {
  getAllHospitals: (callback) => {
    hospital_db.list({ include_docs: true }, function (err, data) {
      callback(err, data);
    });
  },

  updateBedCount: function (id, callback) {
    hospital_db
      .find(query.getHospitalData(id))
      .then((result) => {
        if (result.docs.length > 0 && result.docs[0].bedCount) {
          result.docs[0].bedCount = result.docs[0].bedCount - 1;
          hospital_db.insert(result.docs[0], function (err, data) {
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
