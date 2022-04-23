/**
 * @description Base url of API
 */
const BASE_URL = "http://localhost:3001/api/";

function getapi(endpoint) {
  const apiObj = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(BASE_URL + endpoint, apiObj)
    .then((response) => {
      JSON.stringify(response);
      return response.json();
    })
    .catch((err) => {
      return {
        responseCode: "ERROR",
        responseMessage: "Something went wrong.",
      };
    });
}

function postapi(endpoint, obj) {
  const apiObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  };
  return fetch(BASE_URL + endpoint, apiObj)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return {
        responseCode: "ERROR",
        responseMessage: "Something went wrong.",
      };
    });
}

export { getapi, postapi };
