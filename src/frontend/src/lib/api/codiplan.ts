import client from "./client";
import address from "./address";

const baseURL = address["imgAPI"];

export const GET_CODIPLANS = (year: number, month: number) =>
  client.get(baseURL + `/codiplan/user/?year=${year}&month=${month}`);

export const PATCH_CODIPLAN = (codi: number, date: string) =>
  client.patch(baseURL + "/codiplan/user/", { codi, plan_date: date });

export const POST_CODIPLAN = (codi: number, date: string) =>
  client.post(baseURL + "/codiplan/user/", { codi, plan_date: date });
