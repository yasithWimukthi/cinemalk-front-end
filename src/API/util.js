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
      .get(`${BASE_URL}${uri}`, {
        params: {
          ID: id,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      })
      .then(function () {
        // always executed
      });
  });
};

export const postRequest = (uri, data) => {
  //data is an object
  return new Promise((resolve, reject) => {
    axios
      .post(`${BASE_URL}${uri}`, { data })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      });
  });
};

export const updateRequest = (uri, id, data) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${BASE_URL}${uri}`, {
        data, 
        params: {
          ID: id
        }
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
    })
  })
}

export const deleteRequest = (uri, id) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(`${BASE_URL}${uri}`, {
        params: {
          ID: id,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        reject(error);
      })
      .then(function () {
        // always executed
      });
  });
}
