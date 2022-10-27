import client from "./client";
import address from "./address";

const baseURL = address["imgAPI"];

export interface ICodiData {
  top?: number | null;
  bottom?: number | null;
  footwear?: number | null;
  cap?: number | null;
  qid?: number;
  comments?: string;
}

export const GET_CODIS = (page: number) =>
  client.get(baseURL + `/codi/user/?page=${page}`);

export const GET_CODI = (codiId: number) =>
  client.get(baseURL + `/codi/${codiId}/`);

export const POST_CODI = (codiData: ICodiData) =>
  client.post(baseURL + `/codi/user/`, codiData);

export const DELETE_CODI = (codiId: number) =>
  client.delete(baseURL + `/codi/${codiId}/`);

export const PATCH_CODI = (codiId: number, codiData: ICodiData) =>
  client.patch(baseURL + `/codi/${codiId}/`, codiData);
