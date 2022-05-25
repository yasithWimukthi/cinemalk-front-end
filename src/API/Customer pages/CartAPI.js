import { getByIDRequest, getRequest, postRequest, updateRequest, deleteRequest } from "../util";

const BASE_URL = "http://localhost:4001";

export const getTheaters = (uri) => getRequest(BASE_URL, uri);

export const getCartByUserId = (uri, id) => getByIDRequest(BASE_URL, uri, id);

export const addToCart = (uri, data) => postRequest(BASE_URL, uri, data);

export const updateTheater = (uri, id, data) => updateRequest(BASE_URL, uri, id, data);

export const removeFromCart = (uri, id) => deleteRequest(BASE_URL, uri, id);
