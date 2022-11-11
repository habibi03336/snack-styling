import client from "./client";
import address from "./address";

const baseURL = address["imgAPI"];

export const GET_TAGS = () => client.get(baseURL + "/tag/");
