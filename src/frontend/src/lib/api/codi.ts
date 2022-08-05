import client from "./client";
import address from "./address";

client.defaults.baseURL = address["imgAPI"];

export interface ICodiData {
  top?: number;
  bottom?: number;
}

export const getCodis = () => client.get("/api/codi/");

export const postCodi = (codiData: ICodiData) =>
  client.post("/api/codi/", codiData);
