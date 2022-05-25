// import { getRequest, deleteRequest } from "../util";

// const BASE_URL = "http://localhost:4000";

// /**
//  * @description - Get all reservations
//  * @param {string} id - Reservation id
//  * @returns {object} - Reservation object
//  */
// export const getReservations = (uri) => getRequest(BASE_URL, uri);

// /**
//  * @description cancel reservation
//  * @param {string} reservationId
//  * @returns {object} reservation
//  */
// export const deleteReservation = (uri, id) => deleteRequest(BASE_URL, uri, id);

import { getByIDRequest, getRequest, postRequest, updateRequest, deleteRequest } from "../util";

const BASE_URL = "http://localhost:4001";

export const getReservationsByUserId = (uri, id) => getByIDRequest(BASE_URL, uri, id);

export const addToCart = (uri, data) => postRequest(BASE_URL, uri, data);

export const deleteReservation = (uri, id) => deleteRequest(BASE_URL, uri, id);

