import client from "./client";
import address from "./address";

const baseURL = address["imgAPI"];

export interface ICodiData {
  top: number | null;
  bottom: number | null;
  footwear: number | null;
  cap: number | null;
  qid?: number;
  comments?: string;
}

export const GET_CODIS = (userId: number) =>
  client.get(baseURL + `/codi/user/${userId}/`);

export const POST_CODI = (userId: number, codiData: ICodiData) =>
  client.post(baseURL + `/codi/user/${userId}/`, codiData);
