import client from "./client";
import address from "./address";

const baseURL = address["api"] + "/notifications";

export interface IAlarm {
  nid: number;
  qid: number;
  type: number;
}

export const GET_NOTIFICATIONS = () => client.get(baseURL);

export const PATCH_NOTIFICATION = (id: number) =>
  client.patch(baseURL + `/${id}`);

export const PATCH_ALL_NOTIFICATIONS = () => client.patch(baseURL);
