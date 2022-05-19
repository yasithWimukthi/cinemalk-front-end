import { getByIDRequest, getRequest, postRequest, updateRequest, deleteRequest } from "../util";

const BASE_URL = "http://localhost:4000";

/**
 * @description - Get all the theaters
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
export const getTheaters = (uri) => getRequest(BASE_URL, uri);

/**
 * @description - Get a theater by id
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
export const getTheaterById = (uri, id) => getByIDRequest(BASE_URL, uri, id);

/**
 * @description - Create a new theater
 * @param uri
 * @param data
 * @returns {Promise | Promise<unknown>}
 */
export const addTheater = (uri, data) => postRequest(BASE_URL, uri, data);

/**
 * @description - Update a theater
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
export const updateTheater = (uri, id, data) => updateRequest(BASE_URL, uri, id, data);

/**
 * @description - Delete a theater
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - The response object
 */
export const deleteTheater = (uri, id) => deleteRequest(BASE_URL, uri, id);
