import { getRequest, deleteRequest } from "../util";

const BASE_URL = "http://localhost:4000";

/**
 * @description - Get all reservations
 * @param {string} id - Reservation id
 * @returns {object} - Reservation object
 */
export const getReservations = (uri) => getRequest(BASE_URL, uri);

/**
 * @description cancel reservation
 * @param {string} reservationId
 * @returns {object} reservation
 */
export const deleteReservation = (uri, id) => deleteRequest(BASE_URL, uri, id);
