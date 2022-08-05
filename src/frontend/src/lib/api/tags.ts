import client from "./client";
import address from "./address";

client.defaults.baseURL = address["imgAPI"];

export const getTags = () => client.get("/api/tag/");
