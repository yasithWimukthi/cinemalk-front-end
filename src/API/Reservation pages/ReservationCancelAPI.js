import { getRequest, deleteRequest } from "../util";

const BASE_URL = "http://localhost:4000";

export const getReservations = (uri) => getRequest(BASE_URL, uri);

export const deleteReservation = (uri, id) => deleteRequest(BASE_URL, uri, id);
