import client from "./client";
import address from "./address";

const baseURL = address["api"];

export interface ILoginInfo {
  email: string;
  pwd: string;
}

export const login = (loginInfo: ILoginInfo) =>
  client.post(baseURL + `/oauth/login`, loginInfo);

export interface ISigninInfo {
  email: string;
  pwd: string;
}

export const signin = (signinInfo: ISigninInfo) =>
  client.post(baseURL + `/oauth/register`, signinInfo);

export interface IMemberInfo {
  age: number | null;
  gender: 1 | 2 | null;
  height: number | null;
  id: number;
  nickname: string | null;
  weight: number | null;
}

export const registMemberDetail = (memberInfo: IMemberInfo) =>
  client.post(baseURL + `/user/information`, memberInfo);
