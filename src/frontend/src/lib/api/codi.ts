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

export const GET_CODIS = () => client.get(baseURL + `/codi/user/`);

export const POST_CODI = (codiData: ICodiData) =>
  client.post(baseURL + `/codi/user/`, codiData);
