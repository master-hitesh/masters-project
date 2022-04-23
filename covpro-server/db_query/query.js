"use strict";

module.exports = {
  getUserData: function (id) {
    return {
      selector: {
        _id: id,
      },
    };
  },

  getHighRiskUsers: function () {
    return {
      selector: {
        patientScore: {
          $gte: 60,
        },
      },
    };
  },

  getMediumRiskUsers: function () {
    return {
      selector: {
        patientScore: {
          $gte: 40,
          $lt: 60,
        },
      },
    };
  },

  getAllUsers: function () {
    return {
      selector: {
        patientScore: {
          $gte: 0,
        },
      },
    };
  },

  getHospitalData: function (id) {
    return {
      selector: {
        _id: id,
      },
    };
  },

  getSignIn: function (mobileno) {
    return {
      selector: {
        mobileno: mobileno,
      },
      fields: [
        "_id",
        "name",
        "specimenId",
        "profileStatus",
        "bedStatus",
        "hospital",
      ],
    };
  },
};
