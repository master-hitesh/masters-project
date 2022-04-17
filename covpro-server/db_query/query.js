"use strict";

module.exports = {
  getUserData: function (id) {
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
