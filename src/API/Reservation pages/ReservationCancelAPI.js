import { getRequest, deleteRequest } from "../util";

export const getReservations = (uri) => getRequest(uri);

export const deleteReservation = (uri, id) => deleteRequest(uri, id);
