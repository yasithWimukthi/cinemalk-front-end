const axios = require("axios").default;

const BASE_URL = "http://localhost:4000";

export const getRequest = (uri) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}${uri}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      })
      .then(() => {
        //always get executed
      });
  });
};

export const getByIDRequest = (uri, id) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${BASE_URL}${uri}${id}`)
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log('errrrr', error);
        reject(error);
      })
      .then(function () {
        // always executed
      });
  });
};
