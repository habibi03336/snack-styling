import client from "./client";
import address from "./address";

const baseURL = address["imgAPI"];

export interface ICodiData {
  top: number;
  bottom: number;
  qid?: number;
  comments?: string;
}

export const getCodis = (userId: number) =>
  client.get(baseURL + `/api/codi/user/${userId}/`);

export const postCodi = (userId: number, codiData: ICodiData) =>
  client.post(baseURL + `/api/codi/user/${userId}/`, codiData);
