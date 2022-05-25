import { postRequest } from "../util";

const BASE_URL = "http://localhost:4002";

export const Pay = (uri, data) => postRequest(BASE_URL, uri, data);

export const PayMobile = (uri, data) => postRequest(BASE_URL, uri, data);
