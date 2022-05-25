import { getByIDRequest, deleteRequest } from "../util";

const BASE_URL = "http://localhost:4001";

export const getReservationsByUserId = (uri, id) => getByIDRequest(BASE_URL, uri, id);

export const deleteReservation = (uri, id) => deleteRequest(BASE_URL, uri, id);

