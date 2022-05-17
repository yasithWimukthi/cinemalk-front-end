import { getByIDRequest, getRequest, postRequest, updateRequest, deleteRequest } from "../util";

export const getTheaters = (uri) => getRequest(uri);

export const getTheaterById = (uri, id) => getByIDRequest(uri, id);

export const addTheater = (uri, data) => postRequest(uri, data);

export const updateTheater = (uri, id, data) => updateRequest(uri, id, data);

export const deleteTheater = (uri, id) => deleteRequest(uri, id);
