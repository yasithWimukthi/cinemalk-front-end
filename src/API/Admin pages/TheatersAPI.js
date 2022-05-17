import { getByIDRequest, getRequest, postRequest, updateRequest, deleteRequest } from "../util";

export const getTheaters = (uri) => getRequest(uri);

export const getTheaterById = (uri, id) => getByIDRequest(uri, id);
