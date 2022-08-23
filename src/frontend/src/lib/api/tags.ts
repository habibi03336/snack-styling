import client from "./client";
import address from "./address";

const baseURL = address["imgAPI"];

export const getTags = () => client.get(baseURL + "/api/tag/");
