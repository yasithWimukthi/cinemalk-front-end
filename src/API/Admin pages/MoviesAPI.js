import { getByIDRequest, getRequest, postRequest, updateRequest, deleteRequest } from "../util";

const BASE_URL = "http://localhost:4000";

export const getMovies = (uri) => getRequest(BASE_URL, uri);

export const getMovieById = (uri, id) => getByIDRequest(BASE_URL, uri, id);

export const addMovie = (uri, data) => postRequest(BASE_URL, uri, data);

export const updateMovie = (uri, id, data) => updateRequest(BASE_URL, uri, id, data);

export const deleteMovie = (uri, id) => deleteRequest(BASE_URL, uri, id);
