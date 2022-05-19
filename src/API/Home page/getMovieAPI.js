import { getRequest } from "../util";

const BASE_URL = "http://localhost:4000";

/**
 * @description - get all movies
 * @param {object} data - data to be sent to the server
 * @returns {object} - response from the server
 */
export const getMovies = (uri) => getRequest(BASE_URL, uri);

