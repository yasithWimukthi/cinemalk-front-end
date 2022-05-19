import { getRequest } from "../util";

const BASE_URL = "http://localhost:4000";

export const getMovies = (uri) => getRequest(BASE_URL, uri);

